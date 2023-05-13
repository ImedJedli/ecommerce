
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
          },
        });


module.exports = mongoose.model('Coupon', couponSchema);
