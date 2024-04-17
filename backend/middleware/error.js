const ErrorHandler = require("../utils/errorHandler");

module.exports = (err , req , res , next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    //Wrong MongoDb Object Id Error

    if(err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message , 400)
    }

    //Mongoose duplicate key error, ie: trying to register with same email

    if(err.code === 11000) {
        const duplicateKeys = Object.keys(err.keyValue).join(', ');
        const message = `Duplicate ${duplicateKeys} Entered`
        err = new ErrorHandler(message , 400)
    }


    //Wrong JWT error

    if(err.name === 'JsonWebTokenError') {
        const message = `JSON Web Token is invalid , try again`;
        err = new ErrorHandler(message , 400)
    }

    //JWT expire error 
    if(err.name === "TokenExpiredError" ) {
        const message = `JSON Web Token has expired`

        err = new ErrorHandler(message , 400)
    }


    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}