

const express = require('express')
const router = express.Router();
const { isAuthentificationUser, authorizeRoles} = require('../middlewares/auth');

const { createCoupon, getAllCoupon,getCouponByCode} = require('../controllers/couponController');

router.route('/coupon/new' ).post(isAuthentificationUser,authorizeRoles('admin'),createCoupon);
router.route('/coupon' ).get(isAuthentificationUser,getAllCoupon);
router.route('/coupon/:code').get(isAuthentificationUser, getCouponByCode);

module.exports = router;

