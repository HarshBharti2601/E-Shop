const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require('../models/userModel');
const Product = require('../models/productModel')
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto')



//Register user
exports.reginterUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password, avatar: {
            public_id: "sample",
            url: "sample"
        }
    })

    sendToken(user, 201, res);
})


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password") //as we have given select: false in password , now if it will find id then it will also include password in user object

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res);


})

exports.logout = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token", {
        httpOnly: true
    }); //clearCookie is provided by express.

    // res.cookie("token" , null , {
    //     expires : new Date(Date.now()),
    //     httpOnly : true
    // })  This can also be used


    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
})

//forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const email = req.body.email
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404))

    }
    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    //this saves the reset password token and expireDate in the database


    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`


    const message = `Your password reset url is :- \n\n ${resetPasswordUrl} \n\n if you have not requested for the email , your account might be in danger`;

    try {
        //function to send mail
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Website By AVS`,
            message

        })

        res.status(200).json({
            success: true,
            message: `Reset Password Email sent to ${user.email}`
        })

    }

    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(err.message, 500))
    }

})


//reset Password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    //hash reset Password token from Email

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid ot has been expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
})

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})


//update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("old password is incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        next(new ErrorHandler("new password and confirm password do not match" , 400))
    }

    user.password = req.body.newPassword;

    await user.save({ validateBeforeSave: false })

    sendToken(user, 200, res)
})


//update user profile


exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // what is user does not include email?

    //I think we need to ask for password in this feature

    //feature of changing dp will be added later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData)

    res.status(200).json({
        success: true,
        user
    })
})


// Get all users(admin)

exports.getAllUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find({});

    res.status(200).json({
        success: true,
        users
    })


})


//Get User by ID(admin)

exports.getSingleUser = catchAsyncError(async (req, res, next) => {

    const UserId = req.params.id;

    const user = await User.findById(UserId)

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID : ${UserId}` , 404))
    }

    res.status(200).json({
        success: true,
        user
    })


})


//update User Role (admin)

exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name, //don't need
        email: req.body.name, //don't need
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData)

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}` , 404))
    }



    res.status(200).json({
        success: true
    })

})

//Delete User (Admin)

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    //will be deleted from cloud later

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}` , 404))
    }


    await User.deleteOne({ _id: req.params.id }); 

    res.status(200).json({
        success: true,
        message: "user deleted"

    })
})


//Create New Review or  Update the review
//(if a user has already created review , the review will be updated , else addedd)

exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }


    const product = await Product.findById(productId);
   

    let isReviewed = false; // Initialize isReviewed to false

    product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
            isReviewed = true; // Set isReviewed to true if a matching review is found
            return; // Exit the loop early once a matching review is found;
            //this will make us exit from callback of forEach , not the main function
        }
    });
   
    if (isReviewed) {

        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating
                rev.comment = comment
            }
        })

    }

    else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length
    }


    //calculating Rating

    let sum = 0;
    product.reviews.forEach((rev) => {
        sum += rev.rating
    })

    product.ratings = sum / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
}) 

//get all reviews

exports.getAllReviews = catchAsyncError(async (req , res , next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product) {
        return next(new ErrorHandler("Product not found" , 404))
    }

    res.status(200).json({
        success : true,
        review : product.reviews
    })
})

//delete Reviews

exports.deleteReviews = catchAsyncError(async (req , res , next)=>{
    const product = await Product.findById(req.query.productId);
    
    if(!product) {
        return next(new ErrorHandler("Product not found" , 404))
    }

    const filteredReviews = product.reviews.filter((rev)=>{
      return rev._id.toString() !== req.query.id.toString()
    })

    //saves all the review that we dont want to delete


    //calculate the rating of the left reviews

    let sum = 0;
    filteredReviews.forEach((rev) => {
        sum += rev.rating
    })

   

   const ratings = sum / filteredReviews.length;

   

   //number of Reviews after deleting 

   const numberOfReviews = filteredReviews.length;

   await Product.findByIdAndUpdate( req.query.productId , {
    reviews : filteredReviews,
    ratings,
    numberOfReviews

   })

   //problem :- Any user can delete any review



    res.status(200).json({
        success : true,
        review : product.reviews
    })
})



