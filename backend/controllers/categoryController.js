const Category = require("../models/category");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/product");

exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    return next(new ErrorHandler("category already exists", 404));
  }

  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    category,
  });
});

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    sucess: true,
    count: categories.length,
    message: "All the categories",
    categories,
  });
});

exports.getSingleCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate(
    "products",
    "name images"
  );
  if (!category) {
    return next(new ErrorHandler("no category found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const newCategoryDate = {
    name: req.body.name,
    /* description: req.body.description, */
  };
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    newCategoryDate,
    {
      new: true,
      runValidators: true,
      categoryFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler(`Category does not found : ${req.params.id}`));
  }

  const productIds = category.products;

  const deletedCategory = await Category.findByIdAndDelete(category);
  await Product.deleteMany({ _id: { $in: productIds } });


  res.status(200).json({
    success: true,
    msg: "category deleted",
    category,
  });
});
