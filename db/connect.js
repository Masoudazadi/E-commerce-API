const mongoose = require("mongoose")

const connectDB = (user, password, host, port, dbName) => {
  const url = `mongodb://${user}:${password}@${host}:${port}/${dbName}`
  return mongoose.connect(url)
}

module.exports = connectDB