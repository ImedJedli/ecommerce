const express = require("express");
const router = express.Router();
const {
  isAuthentificationUser,
  authorizeRoles,
} = require("../middlewares/auth");

const {
  createCoupon,
  getAllCoupon,
  getCouponByCode,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

router
  .route("/admin/coupon/new")
  .post(isAuthentificationUser, authorizeRoles("admin"), createCoupon);
router.route("/admin/coupons").get(isAuthentificationUser, getAllCoupon);
router.route("/coupon/:code").get(isAuthentificationUser, getCouponByCode);
router.route("/admin/coupon/:id").get(isAuthentificationUser, getSingleCoupon);
router.route("/admin/coupon/:id").put(isAuthentificationUser, updateCoupon);
router.route("/admin/coupon/:id").delete(isAuthentificationUser, deleteCoupon);

module.exports = router;
