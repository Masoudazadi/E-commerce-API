const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Your routes and middleware
app.use('/api/v1/products', require('./routes/productRoutes'));

// Export the serverless app
module.exports = app;
module.exports.handler = serverless(app);