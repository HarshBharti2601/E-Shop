const app = require('./app')
const connectDatabase = require('./config/database')
require('dotenv').config({path: "backend/config/config.env"})
connectDatabase(); //connect to database

//Handling Uncaught Exception -> console.log(undefined Variable)
process.on("uncaughtException" , (err)=>{
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)

} )


const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})



//Unhandled Promise Rejection (eg:- Wrong MongoString)

process.on("unhandledRejection" , (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)


    server.close(()=>{
        process.exit(1);
    })



})