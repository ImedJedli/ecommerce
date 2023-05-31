const Coupon = require("../models/coupon");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const { code, discount, usageLimit } = req.body;

    const existingDiscount = await Coupon.findOne({ code });
    if (existingDiscount) {
      return next(new ErrorHandler("coupon already exists", 404));
    }

    const coupon = new Coupon({
      code,
      discount,
      usageLimit,
    });

    await coupon.save();

    res.status(201).json({ message: "Discount created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create discount" });
  }
});

exports.getAllCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    sucess: true,
    count: coupons.length,
    message: "All the categories",
    coupons,
  });
});

exports.getCouponByCode = catchAsyncErrors(async (req, res, next) => {
  const { code } = req.query;

  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: "Coupon code not found.",
    });
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    return res.status(400).json({
      success: false,
      message: "Coupon has reached its usage limit.",
    });
  }

  coupon.usedCount += 1;
  await coupon.save();

  res.status(200).json({
    success: true,
    coupon,
  });
});

exports.getSingleCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    return next(new ErrorHandler("no coupon found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    coupon,
  });
});

exports.updateCoupon = catchAsyncErrors(async (req, res, next) => {
  const newCouponDate = {
    code: req.body.code,
    discount: req.body.discount,
    usageLimit: req.body.usageLimit,
  };
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, newCouponDate, {
    new: true,
    runValidators: true,
    couponindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    return next(new ErrorHandler(`Coupon does not found : ${req.params.id}`));
  }
  await coupon.remove();
  res.status(200).json({
    success: true,
    msg: "coupon deleted",
    coupon,
  });
});
