
// authentification check 
const http = require('http');

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");



exports.isAuthentificationUser = catchAsyncErrors( async(req,res,next)=>{

      const { token } =req.cookies

      if(!token){
            return next(new ErrorHandler('you must login first',401))
      }
      try{

      
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      
      req.user = await User.findById(decoded.id);
      const user = req.user;
    
    console.log('user:', user);
      if (!user) {
        return next(new ErrorHandler('User not found', 404));
      }
  
      req.user = user;
      
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return next(new ErrorHandler('Token has expired', 401));
      }
      return next(new ErrorHandler('Invalid token', 401));
    }
})





exports.authorizeRoles = ( ...roles ) =>{
      return(req, res, next) => {
          if( !roles.includes(req.user.role)){
            console.log(user);
            return next(
            new ErrorHandler(`Role(${req.user.role}) is not allowed`,401)
          );
      }
          next(); 
      }
}


    