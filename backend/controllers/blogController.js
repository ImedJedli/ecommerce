const Blog = require("../models/blog");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APISearch = require("../utils/apiSearch");

const fs = require("fs");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = "./backend/public/blogs";
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

exports.createBlog = catchAsyncErrors(async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        return next(new ErrorHandler("Error uploading avatar", 400));
      } else {
        return next(new ErrorHandler("Error uploading avatar", 400));
      }
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return next(
        new ErrorHandler("Please provide both title and description", 400)
      );
    }

    const blog = await Blog.create({
      title,
      description,
      user: req.user._id,
      images: req.files ? req.files.map((file) => file.filename) : [],
    });

    res.status(201).json({
      success: true,
      blog,
    });
  });
});



exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogsCount = await Blog.countDocuments();

  const resPerPage = 2;
  const apiSearch = new APISearch(Blog.find(), req.query)
  .pagination(resPerPage)
  .sort ({ createdAt: -1});

  const blogs = await apiSearch.query;

  res.status(200).json({
    sucess: true,

    blogsCount: blogsCount,
    resPerPage: resPerPage,
    message: "All the blogs",
    blogs,
  });
});

exports.getAdminAllBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    blogsCount: blogs.length,
    message: "All blogs",
    blogs,
  });
});

exports.getSingleBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate("user", "name");
  if (!blog) {
    return next(new ErrorHandler("no blog found"));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      if (err instanceof multer.MulterError) {
        return next(new ErrorHandler("Error uploading images", 400));
      } else {
        return next(new ErrorHandler("Error uploading images", 400));
      }
    }

    const { title, description } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new ErrorHandler("Blog not found"));
    }

    // remove existing images
    if (req.files) {
      blog.images.forEach((image) => {
        if (image !== "default-avatar.jpg") {
          fs.unlink(`./backend/public/blogs/${image}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    }

    // add new images
    const images = req.files
      ? req.files.map((file) => file.filename)
      : blog.images;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        images,
      },
      {
        new: true,
        runValidators: true,
        blogFindAndModify: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "updated",
      blog: updatedBlog,
    });
  });
});

exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHandler("Blog not found"));
  }

  blog.images.forEach((image) => {
    if (image !== "default-avatar.jpg") {
      fs.unlink(`./backend/public/blogs/${image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });

  await blog.remove();
  res.status(200).json({
    success: true,
    message: "blog removed",
    blog,
  });
});
