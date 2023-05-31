
const mongoose = require('mongoose')

const couponSchema  = new mongoose.mongoose.Schema({
      code: {
            type: String,
            required: true,
            unique: true,
          },
          discount: {
            type: Number,
            required: true,
          },
          isActive: {
            type: Boolean,
            default: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            
          },usageLimit: {
            type: Number,
            default: 1,
          },
          usedCount: {
            type: Number,
            default: 0,
          },
        });


module.exports = mongoose.model('Coupon', couponSchema);
