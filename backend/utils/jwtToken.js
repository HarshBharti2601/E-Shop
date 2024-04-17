const sendToken = (user , statusCode , res)=>{
    const token = user.getJWTToken();
  
    //options for cokkies
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*1000
        ),
        httpOnly : true
    }
     //res.cookie is a method provided by cookie-parser, not express
    res.status(statusCode).cookie("token" , token , options).json({
        success : true,
        user, 
        token
    })
}

module.exports = sendToken;