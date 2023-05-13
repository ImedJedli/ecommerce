const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// new order 

exports.newOrder =  catchAsyncErrors(async(req,res,next)=>{

      const {
            orderItems,
            shippingInfo,
            
            itemsPrice,
            shippingPrice,
            totalPrice,
            paymentInfo
      
      } = req.body;
      console.log(totalPrice);


      const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
      })

      res.status(200).json({
            success :true,
            order
      })
})

/*
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
      const {
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        discountCode
      } = req.body;
    
      let discount = null;
      if (discountCode) {
        discount = await Discount.findOne({ code: discountCode });
        if (!discount) {
          return res.status(400).json({ error: 'Invalid discount code' });
        }
      }
    
      let discountedTotalPrice = totalPrice;
      if (discount) {
        const discountAmount = (discount.percentage / 100) * totalPrice;
        discountedTotalPrice = totalPrice - discountAmount;
      }
    
      const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice: discountedTotalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
      });
    
      res.status(200).json({
        success: true,
        order
      });
    });
*/

// one order

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{

      const order = await Order.findById(req.params.id).populate('user', 'name email')
      if(!order){
            return next(new ErrorHandler('no order found with this ID',404))
      }

      res.status(200).json({
            success:true,
            order
      })
})

// my order

exports.getMyOrders = catchAsyncErrors(async(req,res,next)=>{

      const orders = await Order.find({ user: req.user.id })

      res.status(200).json({
            success:true,
            orders
      })
})

// admin : all orders

exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{

      const orders = await Order.find()
      console.log(`Number of orders: ${orders.length}`);

      let totalAmount = 0;
      orders.forEach(order => {
           
            console.log(`Total price for order ${order._id}: ${order.totalPrice}`);
            totalAmount += order.paymentInfo.totalPrice
           
      })

      res.status(200).json({
            success:true,
            totalAmount,
            orders
      })
})

//update status

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
     
      const order = await Order.findById(req.params.id);

    
      if (!order) {
       
        return next(new ErrorHandler('Order not found', 404));
      }
    
      if (order.paymentInfo.orderStatus === "Delivered") {
           
        console.log(`Order with ID ${req.params.id} has already been delivered`);
        return next(new ErrorHandler('Already delivered this order', 404))
      }
     
      /*const validStatuses = ['Processing', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled'];
      if (!validStatuses.includes(req.body.orderStatus)) {
        return next(new ErrorHandler('Invalid order status', 400));
      }*/
    
      order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
      })
    
     
      order.paymentInfo.orderStatus = req.body.orderStatus;
      
      order.paymentInfo.deliveredAt = Date.now();

      await order.save();
      
      res.status(200).json({
        success: true,
        order
      })
    });
    
    async function updateStock(id, quantity) {
      const product = await Product.findById(id);
      product.stock = product.stock - quantity;
      await product.save({ validateBeforeSave: false });
    }
    
    // delete order

    exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{

      const order = await Order.findById(req.params.id);
      if(!order){
            return next(new ErrorHandler('no order found with this ID',404))
      }

      await order.remove();
      res.status(200).json({
            success:true
      })


      
})











