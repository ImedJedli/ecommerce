const express = require("express");
const router = express.Router();
const {
  isAuthentificationUser,
  authorizeRoles,
} = require("../middlewares/auth");
const {
  getAdminProducts,
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
} = require("../controllers/productController");

router.route("/products").get(getProducts);

router.route("/product/:id").get(getSingleProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthentificationUser, deleteProduct);

router.route("/admin/product/new").post(isAuthentificationUser, newProduct);

router.route("/admin/products").get(isAuthentificationUser, getAdminProducts);
router.route("/admin/product/:id").put(isAuthentificationUser, updateProduct);

router.route("/review").put(isAuthentificationUser, createProductReview);
router.route("/admin/reviews").get(getProductReviews);
router.route("/admin/reviews").delete(deleteProductReview);

module.exports = router;
