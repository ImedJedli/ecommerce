
const express = require('express');
const router = express.Router();

const {newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder,sendInvoice } = require('../controllers/orderController');
const { isAuthentificationUser, authorizeRoles} = require('../middlewares/auth');


router.route('/order/new').post(isAuthentificationUser,newOrder);
router.route('/order/:id').get(isAuthentificationUser,getSingleOrder);
router.route('/orders/me').get(isAuthentificationUser,getMyOrders);


router.route('/admin/orders').get(isAuthentificationUser,authorizeRoles('admin'),getAllOrders);
router.route('/admin/order/:id').put(isAuthentificationUser,authorizeRoles('admin'),updateOrderStatus)
router.route('/admin/order/:id').delete(isAuthentificationUser,authorizeRoles('admin'),deleteOrder);


module.exports = router;