
const mongoose = require('mongoose')

const couponSchema  = new mongoose.mongoose.Schema({
      code: {
            type: String,
            required: [true, 'Please enter coupon code'],
            unique: true,
          },
          discount: {
            type: Number,
            required: [true, 'Please enter coupon discount'],
          },
          isActive: {
            type: Boolean,
            
          },
          createdAt: {
            type: Date,
            default: Date.now,
            
          },usageLimit: {
            type: Number,
            required: [true, 'Please enter usage limit'],
          },
          usedCount: {
            type: Number,
            default: 0,
          },
        });


module.exports = mongoose.model('Coupon', couponSchema);
