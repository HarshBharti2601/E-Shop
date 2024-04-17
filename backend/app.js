const express = require("express")
const cookie_parser = require("cookie-parser")
const cors = require('cors')
const app = express();

const errorMiddleware = require('./middleware/error')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cookie_parser())

app.use("/api/v1" , require('./routes/productRoute'))
app.use("/api/v1" , require('./routes/userRour'))
app.use("/api/v1" , require("./routes/orderRoute"))

app.use(errorMiddleware);


module.exports = app