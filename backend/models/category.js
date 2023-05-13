
const mongoose = require('mongoose')
const categorySchema =new mongoose.mongoose.Schema({
      name:{
          type: String,
          required: [true, 'Please enter product name'],
          trim: true,
      },
      description:{
            type: String,
            required: [true, 'Please enter the description of the category'],
            trim: true,
        },
      
      });

module.exports = mongoose.model('Category', categorySchema);
