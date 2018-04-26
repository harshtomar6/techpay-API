// Dependencies
const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/adminController');
const config = require('./../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// POST '/admin' route to add or authenticate admin
router.post('/', (req, res, next) => {
  adminController.addOrAuthenticateAdmin(req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

module.exports = router;