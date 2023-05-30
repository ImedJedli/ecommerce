
const mongoose = require('mongoose')
const categorySchema =new mongoose.mongoose.Schema({
      name:{
          type: String,
          required: [true, 'Please enter product name'],
          trim: true,
      },

      
      });

module.exports = mongoose.model('Category', categorySchema);
