 
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APISearch = require('../utils/apiSearch');
const Category = require('../models/category')


const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
     destination : function (req,file,cb){
      const directory = `./backend/public/products`;
      if(!fs.existsSync(directory)){
            fs.mkdirSync(directory, {recursive :true});
      }
      cb(null,directory)
     },

     filename: function(req,file,cb){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.originalname.split('.').pop();
      cb(null,file.fieldname + '-' + uniqueSuffix + '.' + ext)
     }
});

const upload = multer({
      storage : storage,
      limits :{
            fileSize : 1024 * 1024 * 5
      }
}).array('images', 5);



exports.newProduct = catchAsyncErrors(async(req,res,next) =>{

    upload(req,res,async function(err){
        if(err){

              if (err instanceof multer.MulterError) {
                    return next(new ErrorHandler('Error uploading avatar', 400));
                  } else {
                    return next(new ErrorHandler('Error uploading avatar', 400));
                  }
        }

        const {name,price,stock,seller,category, description} = req.body;

        // Get the category from the database
  

            
            const product = await Product.create({
                  name,
                  price,
                  stock,
                  seller,
                  category,
                  //category: categoryObj._id, // Use the category object's ID
                  description,
                  images: req.files ? req.files.map(file => file.filename) : []
            });

            res.status(201).json({
                  success : true,
                  product
              })
      });

})


// Afficher tout les produits du BD
 exports.getProducts =catchAsyncErrors(async(req, res,next) => {

    //return next(new ErrorHandler('my Eroor',400));
    
    const productsCount = await Product.countDocuments();
   
    const resPerPage= 8;
    const apiSearch = new APISearch(Product.find(), req.query)
    .search() 
    .filter()
    .pagination(resPerPage)

                                            
    const products = await apiSearch.query;
    //
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

        res.status(200).json({
            sucess: true,
            
            productsCount:productsCount,
            resPerPage:resPerPage,
            message : 'All the products',
            products
         }) 

         console.log('productsCount:', productsCount);
         console.log('resPerpage:', resPerPage);
     
 })

 // Afficher un produit du BD par ID

 exports.getSingleProduct =catchAsyncErrors(async(req, res,next) => {
    const product = await Product.findById(req.params.id);
  
    if(!product){
       return next(new ErrorHandler('Product not found',404));
    } 
     res.status(200).json({
        sucess: true,
        product
     })
    })

    exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{

        upload(req, res, async function (err){
            if (err) {
              console.log(err);
              if (err instanceof multer.MulterError) {
                return next(new ErrorHandler('Error uploading images', 400));
              } else {
                return next(new ErrorHandler('Error uploading images', 400));
              }
            }

            const {name,price,stock,seller,category, description} = req.body;
            const product = await Product.findById(req.params.id)

            if(!product){
                return next (new ErrorHandler('Product not found'));
            }

            if(req.files){
                product.images.forEach(image =>{
                    if(image !== 'default.jpg'){
                        fs.unlink(`./backend/public/products/${image}`, (err) =>{
                            if(err){
                                console.log(err)
                            }
                        })
                    }
                })
            }

            const images = req.files ? req.files.map(file => file.filename) : product.images;
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
                 name,
                  price,
                  stock,
                  seller,
                  category,
                  description,
                  images
            }, {
                new : true,
                runValidators : true,
                productFindAndModify : true
            });

            res.status(200).json({
                success : true,
                message : 'updated',
                product: updateProduct
              });

        })

            
    })

// Modifier un produit du BD
/*exports.updateProduct =catchAsyncErrors(async(req, res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
       
    return res.status(404).json({
        sucess: false,
        message : 'Product not found'
     }) 
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        sucess: true,
        product
     }) 
} )*/


exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next (new ErrorHandler ('Product not found'));
    }

    product.images.forEach(image => {
        if(image!== 'default-avatar.jpg'){
            fs.unlink(`./backend/public/products/${image}`,(err) =>{
                if(err){
                    console.log(err)
                }
            });
        }
    })

    await product.remove();
    res.status(200).json({
        success : true,
        message: 'product removed'
    })
})


exports.createProductReview = catchAsyncErrors( async(req,res,next)=>{
    const { rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating : Number(rating),
        commentedAt : Date.now(),
        comment
    }

    const product = await Product.findById(productId);

    
    console.log(productId);
    const isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()

    )

    if(isReviewed){

        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
            review.comment = comment;
            review.rating = rating;
            review.commentedAt = Date.now();
           
        }
        })

    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc,0) / product.reviews.length
    
    await product.save( { validateBeforeSave : false});

    res.status(200).json({
        success : true

    })
})

// get reviews 

exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews :product.reviews
    })
})

// delete review

exports.deleteProductReview = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review =>review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc,0) /reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },
    {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })
    res.status(200).json({
        success: true,
      
    })
})


// admin

exports.getAdminProducts =catchAsyncErrors(async(req, res,next) => {

    
    const products = await Product.find();
                                             
        res.status(200).json({
            sucess: true,
            products
         }) 
     
 })

