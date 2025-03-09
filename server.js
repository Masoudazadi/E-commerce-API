require("dotenv").config() // برای بارگذاری متغیرهای محیطی
require("express-async-errors")
const cors = require('cors')

const express = require("express")
const app = express()
app.use(cors())

// سایر پکیج‌ها
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
// اتصال به دیتابیس
const connectDB = require("./db/connect")
// روت‌ها
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const orderRouter = require("./routes/orderRoutes")
// میانه‌افزارها
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// استفاده از سایر میانه‌افزارها
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static("./public"))
app.use(fileUpload())

// روت‌های اصلی
app.get("/", (req, res) => {
  res.send("<h1> E-Commerce API</h1>")
})

app.get("/api/v1/", (req, res) => {
  res.send("E-commerce API")
})

// روت‌ها
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/orders", orderRouter) 

// میانه‌افزارهای خطا
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

// اتصال به دیتابیس و راه‌اندازی سرور
const start = async () => {
  try {
    // اتصال به MongoDB Atlas با استفاده از URI موجود در .env
    const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    await connectDB(mongoURI)

    app.listen(port, () => {
      console.log(`🚀 Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
