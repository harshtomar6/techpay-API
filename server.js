// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const jobRoute = require('./api/routes/jobRoute');
const buyerRoute = require('./api/routes/buyerRoute');
const homeRoute = require('./api/routes/homeRoute');
const sellerRoute = require('./api/routes/sellerRoute');
const adminRoute = require('./api/routes/adminRoute');

// Load dotenv variables
dotenv.load();

// Define PORT
const PORT = process.env.PORT || 3000;

// Connect to Database
mongoose.connect(process.env.DATABASE_URI);

// Use body parser to parse post requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Logger middleware
app.use(logger('dev'));

// Use Routes
app.use('/', homeRoute);
app.use('/admin', adminRoute);
app.use('/buyer', buyerRoute);
app.use('/seller', sellerRoute);
app.use('/job', jobRoute);

// Listen for HTTP Requests
app.listen(PORT, () => {
  console.log(`Server is live at :${PORT}`);
})
