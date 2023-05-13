
const express = require('express')
const router = express.Router();
const {isAuthentificationUser,authorizeRoles } = require('../middlewares/auth')
const { getAdminProducts,getProducts, newProduct , getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteProductReview} = require('../controllers/productController');

router.route('/products').get(getProducts);

router.route('/product/:id').get(getSingleProduct);
//router.route('/admin/product/:id').put(updateProduct)
router.route('/admin/product/:id').delete(isAuthentificationUser,deleteProduct);

router.route('/admin/product/new').post(isAuthentificationUser,newProduct);


router.route('/admin/products').get(isAuthentificationUser,getAdminProducts);
router.route('/admin/product/:id').put(isAuthentificationUser,updateProduct)

//router.route('/admin/product/:id').delete(deleteProduct);
                                  

/*router.use((err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      err.message = err.message || 'Internal Server Error';
    
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }
    
      res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    });*/

    router.route('/review').put(isAuthentificationUser,createProductReview);
    router.route('/admin/reviews').get(getProductReviews);
    router.route('/admin/reviews').delete(deleteProductReview);

module.exports = router;