
const mongoose = require('mongoose')

const productSchema = new mongoose.mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
    },
    price:{
        type: Number,
        required: [true, 'Please enter the price'],
    },
    description:{
        type: String,
        required: [true, 'Please enter the description of the product'],
        trim: true,
    },
   
    images: [{
        type: String,
        required: true
  }],


    ratings: {
        type: Number,
        default: 0
    },
     category:{
        type: mongoose.Schema.Types.String, ref: 'Category',
        required: [true]
    }, 
    seller:{
        type: String,
        required: [true,'Please enter product seller']
    },

    stock: {
        type: Number,
        required: [true,'Please enter product stock'],
        default:0
    },

    numOfReviews: {
        type : Number,
        default: 0
    },

    reviews: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref:'User',
                required:true
            },
            name: {
                type : String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment:{
                type : String,
                required: true
            },
            commentedAt:{
                type : Date,
                default: Date.now
          }
        }
    ],

   createdAt: {
        type: Date,
        default: Date.now
    }
 

});

module.exports = mongoose.model('Product',productSchema); 