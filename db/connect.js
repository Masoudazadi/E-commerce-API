const { MongoClient } = require('mongodb')

const connectDB = async (mongoURI) => {
  try {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // اتصال به دیتابیس
    await client.connect()
    console.log("MongoDB connected")

    // انتخاب دیتابیس
    const db = client.db(process.env.MONGO_DB)
    return db
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

module.exports = connectDB
