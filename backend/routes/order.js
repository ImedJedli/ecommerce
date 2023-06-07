const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  deliverAffect,
  
} = require("../controllers/orderController");
const {
  isAuthentificationUser,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/order/new").post(isAuthentificationUser, newOrder);
router.route("/order/:id").get(isAuthentificationUser, getSingleOrder);
router.route("/orders/me").get(isAuthentificationUser, getMyOrders);

router
  .route("/admin/orders")
  .get(isAuthentificationUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthentificationUser, authorizeRoles("admin"), updateOrderStatus);
router
  .route("/admin/order/:id")
  .delete(isAuthentificationUser, authorizeRoles("admin"), deleteOrder);

  router.route('/affect/deliver/:orderId').put(isAuthentificationUser,authorizeRoles("admin"),deliverAffect);

  router
  .route("/deliver/orders")
  .get(getAllOrders);

  router.route('/deliver/order/:id').put(updateOrderStatus)
  router.route("/deliver/order/:id").get( getSingleOrder);
module.exports = router;
