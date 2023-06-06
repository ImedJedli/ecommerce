const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APISearch = require("../utils/apiSearch");
const Category = require("../models/category");

const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = `./backend/public/products`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).array("images", 5);

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        return next(new ErrorHandler("Error uploading avatar", 400));
      } else {
        return next(new ErrorHandler("Error uploading avatar", 400));
      }
    }

    const { name, price, stock, seller, category, description } = req.body;

    const categoryObj = await Category.findOne({ name: category });

    if (!categoryObj) {
      return next(new ErrorHandler("Invalid category", 400));
    }

    const product = await Product.create({
      name,
      price,
      stock,
      seller,
      category,
      description,

      images: req.files ? req.files.map((file) => file.filename) : [],
    });

    categoryObj.products.push(product._id);
    await categoryObj.save();

    res.status(201).json({
      success: true,
      product,
    });
  });
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const productsCount = await Product.countDocuments();

  const resPerPage = 12;
  const apiSearch = new APISearch(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage)
    .sort({ createdAt: -1 });

  const products = await apiSearch.query;
  //
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  res.status(200).json({
    sucess: true,

    productsCount: productsCount,
    resPerPage: resPerPage,
    message: "All the products",
    products,
  });
});



exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const relatedCriteria = {
    category: product.category,
  };

  const relatedProducts = await Product.find(relatedCriteria)
    .where("_id")
    .ne(product._id)
    .limit(4); 

  res.status(200).json({
    success: true,
    product,
    relatedProducts,
  });
});



exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        return next(new ErrorHandler("Error uploading images", 400));
      } else {
        return next(new ErrorHandler("Error uploading images", 400));
      }
    }

    const { name, price, stock, seller, category, description } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found"));
    }

    let images = product.images; 

    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.filename);

      product.images.forEach((image) => {
        if (image !== "default.jpg" && !images.includes(image)) {
          fs.unlink(`./backend/public/products/${image}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    }

    const updateData = {
      name,
      price,
      stock,
      seller,
      description,
      images,
    };

    if (category) {
      const categoryObj = await Category.findOne({ name: category });

      if (!categoryObj) {
        return next(new ErrorHandler("Invalid category", 400));
      }

      if (
        product.category &&
        product.category.toString() !== categoryObj.name.toString()
      ) {
        const oldCategory = await Category.findOne({ name: product.category });

        if (oldCategory) {
          oldCategory.products.pull(product._id);
          await oldCategory.save();
        }
      }

      updateData.category = categoryObj.name;
      categoryObj.products.push(product._id);
      await categoryObj.save();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated",
      product: updatedProduct,
    });
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found"));
  }

  product.images.forEach((image) => {
    if (image !== "default-avatar.jpg") {
      fs.unlink(`./backend/public/products/${image}`, (err) => {
        if (err) {
        }
      });
    }
  });

  await product.remove();
  res.status(200).json({
    success: true,
    message: "product removed",
  });
}); 



exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    commentedAt: Date.now(),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
        review.commentedAt = Date.now();
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});



exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});



exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    sucess: true,
    products,
  });
});
