const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const Order = require('../models/order')

const fs = require('fs');

const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const directory = './backend/public/avatars';
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
        }
        cb(null, directory);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    });

const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5 // 5MB file size limit
      }
    });

// Saving user 

exports.registerUser = catchAsyncErrors(async(req,res,next) =>{

      upload.single('avatar')(req, res, async function (err) {
            if (err) {
                  if (err instanceof multer.MulterError) {
                    return next(new ErrorHandler('Error uploading avatar', 400));
                  } else {
                    return next(new ErrorHandler('Error uploading avatar', 400));
                  }
                }    
            const {name ,email,password}=req.body;
            const userExists = await User.findOne({ email });
            if (userExists) {
              return next(new ErrorHandler('User already exists', 400));
            }

            const user = await User.create ({
                  name,     
                  email,
                  password,        
                  avatar: req.file ? req.file.filename : 'default-avatar.jpg'
            });
            sendToken(user,200,res)
        });
    });

 

exports.loginUser= catchAsyncErrors(async(req,res,next)=>{

      const { email,password } = req.body;

      if(!email || !password){
            return next(new ErrorHandler('Please enter email and password',400))
      }

      const user= await User.findOne({email}).select('+password')
      if(!user){
            return next(new ErrorHandler('Invalid email and password',400))
  
      }

      const isPassword = await user.comparePassword(password)
      if(!isPassword){
            return next(new ErrorHandler('Invalid email and password',400))
      }
      
      sendToken(user,200,res)
})




// forgot password

exports.forgotPassword = catchAsyncErrors( async( req,res,next)=>{
      
      const user =await User.findOne({ email: req.body.email });
      
      if(!user){
            return next(new ErrorHandler('User not found with this email',404));    
      }
      
      
      const resetToken = user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });
      
      const resetUrl = `${process.env.FRONTEND_URL}/api/v3/password/reset/${resetToken}`;
      const message = `Your password reset url is:\n\n${resetUrl}\n\n`

      try {
            await sendEmail({
                  email: user.email,
                  subject: 'Password recovery', 
                  message
                  
            })
            
            res.status(200).json({
                  success: true,
                  message :`Email sent to : ${user.email}`
              });

      }catch (error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({ success: false, error: error.message });
      }
      

});


exports.resetPassword = catchAsyncErrors( async( req,res,next)=>{
      
      const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
      const user = await User.findOne({
            resetPasswordToken, 
            resetPasswordExpire: { $gt: Date.now() }
      }) 

      if(!user){
            return next(new ErrorHandler('password reset token is invalid or has been expired',400))

      }
      if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler('Password does not match',400))
      }

      user.password = req.body.password;
      user.resetPasswordToken= undefined;
      user.resetPasswordExpire= undefined;

      await user.save();
      sendToken(user,200,res)
})


//profile

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
      
  const user = await User.findById(req.user._id);
    res.status(200).json({
    success: true,
    user: user,
  });
});


// upade pwd

exports.updatePassword = catchAsyncErrors(async (req,res,next) =>{
      const user = await User.findById(req.user.id).select('+password');

      const isMatched = await user.comparePassword(req.body.oldPassword)
      if(!isMatched){
            return next( new ErrorHandler ('Old password is incorrect',400));
      }

      user.password = req.body.password;
      await user.save();
      sendToken(user,200,res);
})


// update user profile 
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{
      
      upload.single('avatar')(req, res, async function (err) {
            if (err) {
              console.log(err);
              if (err instanceof multer.MulterError) {
                return next(new ErrorHandler('Error uploading avatar', 400));
              } else {
                return next(new ErrorHandler('Error uploading avatar', 400));
              }
            }
        
            // Update user document with new data
            const newData = {
              name: req.body.name,
              email: req.body.email,
              avatar: req.file ? req.file.filename : req.user.avatar,
            };
        
            const user = await User.findByIdAndUpdate(req.user.id, newData, {
                  new: true,
              runValidators: true,
              userFindAndModify: false,
            });
        
            res.status(200).json({
              success: true,
              user,
            });
          });
})


// logout

exports.logout = catchAsyncErrors(async(req,res,next)=>{
      res.cookie('token',null, 
      {
           expires: new Date(Date.now()),
           httpOnly:true 
      })

      res.status(200).json({
            success:true,
            message: ('Logged out')
      })
}) 


exports.getAllUsers= catchAsyncErrors(async(req,res,next)=>{
      const users = await User.find();

      res.status(200).json({
            success : true,
            users
      })

})

// user details

exports.getUserDetails = catchAsyncErrors (async(req,res,next)=>{

      const user = await User.findById(req.params.id);

      if(!user){
            return next (new ErrorHandler (`User does not found : ${req.params.id}`));
      
      }

      res.status(200).json({
            success : true,
            user
      })
})

// admin 

exports.updateUser = catchAsyncErrors(async (req,res,next)=>{
      const newUserDate={
            name: req.body.name,
            firstname: req.body.firstname,
            email:req.body.email,
            role: req.body.role
      }
      const user = await User.findByIdAndUpdate(req.params.id, newUserDate, {
            new : true,
            runValidators: true,
            userFindAndModify: false
      })

      res.status(200).json({
            success:true
      })
})


// delete 

exports.deleteUser = catchAsyncErrors (async(req,res,next)=>{

      const user = await User.findById(req.params.id);

      if(!user){
            return next (new ErrorHandler (`User does not found : ${req.params.id}`));
      
      }

      //const orderIds = user.orderItems.map(orderItem => orderItem._id);
      const deletedUser = await User.findByIdAndDelete(user);
      await Order.deleteMany({ user: user });

      if (user.avatar !== 'default-avatar.jpg') {
            fs.unlink(`public/avatars/${user.avatar}`, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }

      //await user.remove();

      res.status(200).json({
            success : true,
            msg: "user deleted",
            deletedUser,
            user
      })
})

