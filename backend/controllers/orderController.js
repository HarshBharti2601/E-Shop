const Order = require("../models/orderModel")
// const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const updateStock = require("../utils/updateStock")


//created new order

exports.newOrder = catchAsyncError(async (req , res, next)=>{
    const {
        shippingInfo , orderItems , paymentInfo , itemsPrice , taxPrice , shippingPrice , totalPrice

    } = req.body

    const order = await Order.create({
        shippingInfo , orderItems , paymentInfo , itemsPrice , taxPrice , shippingPrice , totalPrice , padiAt : Date.now() , user : req.user._id,
    })

    res.status(201).json({
        success : true , 
        order,
    })
})

//get Single Order
exports.getSingleOrder = catchAsyncError(async (req , res , next)=>{
    const order = await Order.findById(req.params.id).populate("user" , "name email")
    // It will look for the user property in schema and add name and email using reference
    res.status(200).json({
        success : true,
        order
    })
})


//get logged in user order

exports.myOrders = catchAsyncError(async (req , res , next)=>{

    const order = await Order.find({
        user : req.user._id
    })

    

    res.status(200).json({
        success : true,
        order 
    })
})


//get All Orders -- Admin

exports.getAllOrders = catchAsyncError(async (req , res , next)=>{

    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice
    })
    
    res.status(200).json({
        success : true,
        totalAmount ,
        orders
       
    })
})


// update Order Status -- Admin


exports.updateOrder = catchAsyncError(async (req , res , next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order not found with the id ${req.params.id}`))
    }
   
    if(order.orderStatus === "Delivered") {
        return next( new ErrorHandler("You have already delivered this order" , 400));
    } //it is not a multi seller platform , so one user order will be dispached at once
    
   
    order.orderItems.forEach(async (order)=>{
    await updateStock(order.product  , order.quantity) //sending product id and quantity in function
    })

    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave: false})

    res.status(200).json({
        success : true,
    })
})


//delete Order -- Admin

exports.deleteOrder = catchAsyncError(async (req , res , next)=>{
    const orderToDelete = await Order.findById(req.params.id);
    
    if(!orderToDelete){
        return next(new ErrorHandler(`Order not found with the id ${req.params.id}`))
    }

    await Order.deleteOne({ _id: req.params.id }); 

    res.status(200).json({
        success: true
    })
})


