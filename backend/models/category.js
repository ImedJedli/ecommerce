
const mongoose = require('mongoose')
const categorySchema =new mongoose.mongoose.Schema({
      name:{
          type: String,
          required: [true, 'Please enter category name'],
          trim: true,
          unique: true,
      },
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],  
      });

module.exports = mongoose.model('Category', categorySchema);
