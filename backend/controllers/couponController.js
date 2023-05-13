
const Coupon = require('../models/coupon')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.createCoupon = catchAsyncErrors(async(req,res,next)=>{

      try {
            const { code, discount } = req.body;
        
            // Check if the discount code already exists
            const existingDiscount = await Coupon.findOne({ code });
            if (existingDiscount) {
              return res.status(400).json({ error: 'Discount code already exists' });
            }
        
            // Create a new discount
            const coupon = new Coupon({
              code,
              discount,
            });
        
            // Save the discount to the database
            await coupon.save();
        
            res.status(201).json({ message: 'Discount created successfully' });
          } catch (error) {
            res.status(500).json({ error: 'Failed to create discount' });
          }
        }

)

exports.getAllCoupon =catchAsyncErrors(async(req, res,next) => {

      const coupons = await Coupon.find();
  
      res.status(200).json({
          sucess: true,
          count: coupons.length,
          message : 'All the categories',
          coupons
       }) 
       
   })

   exports.getCouponByCode = catchAsyncErrors(async (req, res, next) => {
      const { code } = req.query;
    
      const coupon = await Coupon.findOne({ code });
    
      if (!coupon) {
        return res.status(404).json({
          success: false,
          message: "Coupon code not found.",
        });
      }
    
      res.status(200).json({
        success: true,
        coupon,
      });
    });
    
  