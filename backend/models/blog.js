
const mongoose = require('mongoose')

const blogSchema = new mongoose.mongoose.Schema({
      title: {
            type : String,
            required : true,
            trim : true
      },

      description:{
            type : String,
            required  : true,
            trim : true
      },

      images: [{
            type: String,
            required: true
      }],
})

module.exports= mongoose.mongoose.model('Blog',blogSchema);