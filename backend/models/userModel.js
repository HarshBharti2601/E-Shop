const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require("crypto") //build in


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require: [true , "Please Enter Your Name"],
        maxLength : [30 , "Name cannot exceed 30 characters"],
        minLength : [4 , "Name should have more than 4 characters"]

    },

    email : {
        type : String,
        required : true,
        unique : true,
        validate : [validator.isEmail , "Please Enter valid Email"]
    },
    password : {
        type : String ,
        require : true ,
        minLength : [8 , "Password should be greater than 8 character"],
        select : false

    },

    avatar : {
        public_id : {
            type : String
        } , 
        url : {
            type : String ,
            require : true
        }

    },

    role : {
        type : String,
        default : "user"
    },

    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

 userSchema.pre("save" , async function(next) {

    if(!this.isModified("password")) {
        next()
    } //if we are only updaing fields like username , email , phone number etc.
    this.password = await bcrypt.hash(this.password , 10)

 })

 // JWT function(to create JWT with unique information)

 userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id : this._id} , process.env.JWT_SECREAT , {
        expiresIn : process.env.JWT_EXPIRE
    })
 }

// Compare Password 

 userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password);
 }


 //Generate Password Reset Token

 userSchema.methods.getResetPasswordToken = function () {
    //Generate Token
    const resetToken = crypto.randomBytes(20).toString("hex")
    
    //Hashing token before adding to database
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
 }







module.exports = mongoose.model('User' , userSchema);