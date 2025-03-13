const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if not connected
    });
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
