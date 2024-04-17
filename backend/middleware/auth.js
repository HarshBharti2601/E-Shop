const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


exports.isAuthenticatedUser = catchAsyncError(async(req , res, next)=>{
    const {token} = req.cookies;  //provided by cookie-parser, not express, It represents an object containing all the cookies sent by the client in the request.

    if(!token) {
        return next(new ErrorHandler("Please Login to access this resource" , 401));
    }

    const decodedData = jwt.verify(token , process.env.JWT_SECREAT) //if failed , it will throw error , which will be handled by error handler
  
    
    req.user = await User.findById(decodedData.id);

    
    next() //save logged in user 
})

exports.authorizeRoles = (...role)=> {
    return (req , res , next)=>{
        if(!role.includes(req.user.role)) {
            next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`))
        } 

        next();
    }
   
}