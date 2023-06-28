const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const nodemailer = require('nodemailer');

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,

    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
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
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("no order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});


exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});


/* exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    if (order.paymentInfo.orderStatus === "Delivered") {
    totalAmount += order.paymentInfo.totalPrice;
    }
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
}); */

exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{

  const deliverUserId = req.query.deliverUserId;

let filter = {};
if (deliverUserId) {
filter = { deliverUserId: deliverUserId };
}

const orders = await Order.find(filter);

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



exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user');

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.paymentInfo.orderStatus === "Delivered") {
    console.log(`Order with ID ${req.params.id} has already been delivered`);
    return next(new ErrorHandler("Already delivered this order", 404));
  }

  if (req.body.orderStatus === "Delivered") {
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });
}

  order.paymentInfo.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === "Shipped") {
    console.log('Sending email...');

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: 'dropsell@gmail.com',
      to: order.user.email, // Use the user's order email
      subject: 'Order Shippement',


      text: `Dear ${order.user.name},
We hope this email finds you well. We are excited to inform you that your order with the ID ${order._id} has been shipped on ${new Date().toLocaleString()}! 
Please check your oders in the application for more details.




Thank you once again for choosing our company. We look forward to serving you in the future.

Best regards,
DropSell

`
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('Email sending failed:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


    


  }

  if (req.body.orderStatus === "Delivered") {

  order.paymentInfo.deliveredAt = Date.now();
  }
  
  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}



exports.deliverAffect = catchAsyncErrors(async(req,res,next)=>{
  try {
        const {  deliverUserId } = req.body;
        const { orderId } = req.params;
    
        const order = await Order.findById(orderId);
    
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
    
        // Update the deliverUserId of the order
        order.deliverUserId = deliverUserId;
    
        // Save the updated order
        await order.save();
    
        res.status(200).json({ message: 'Deliver user assigned to order successfully' });
      } catch (error) {
        console.error('Error assigning deliver user to order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
})


exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("no order found with this ID", 404));
  }

  await order.remove();
  res.status(200).json({
    success: true,
  });
});



