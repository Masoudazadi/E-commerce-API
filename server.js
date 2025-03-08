require("dotenv").config()
require("express-async-errors")
const cors = require('cors');

const express = require("express")
const app = express()
const corsOptions = {
  origin: 'https://exclusive-omega-woad.vercel.app', 
  credentials: true, 
};
app.use(cors(corsOptions))
// Rest of the packages
const morgan = require("morgan") //HTTP request logger middleware
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
// Require Database
const connectDB = require("./db/connect")
// Require Routers
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const orderRouter = require("./routes/orderRoutes")
// Require Middleware
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// Invoke Extra packages
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static("./public"))
app.use(fileUpload())

// Home get
app.get("/", (req, res) => {
  res.send("<h1> E-Commerce API</h1>")
})

// Testing route
app.get("/api/v1/", (req, res) => {
  // console.log(req.cookies)
  // console.log(req.signedCookies)
  res.send("E-commerce API")
})

// Invoke Routers
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/orders", orderRouter) 
// Invoke Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    // Connect database
    await connectDB(process.env.MONGO_USER, process.env.MONGO_PASSWORD, process.env.MONGO_HOST, process.env.MONGO_PORT, process.env.MONGO_DB)
    app.listen(port, () =>
      console.log(`🚀 Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
