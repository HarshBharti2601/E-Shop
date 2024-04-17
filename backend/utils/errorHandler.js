class ErrorHandler extends Error {
    constructor(message , statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this , this.constructor) //trace the path of error
    }
}

module.exports = ErrorHandler;

//here we are extending the Error class and not creating our own because the error creted by us by using this class will act like JS errors the will make them compatbale will existing errors and we can use built in methods of error class like captureStackTrace

