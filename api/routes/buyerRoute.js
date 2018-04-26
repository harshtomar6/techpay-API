// Dependencies
const express = require('express');
const router = express.Router();
const buyerController = require('./../controllers/buyerController');
const config = require('./../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/buyer' to get all buyers
router.get('/', config.validateAdmin, (req, res, next) => {
  buyerController.getBuyers((err, success) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: success});
  })
});

// POST '/buyer' to add a new buyer
router.post('/', (req, res, next) => {
  buyerController.addBuyer(req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  })
})

// POST '/buyer/login' to authenticate a buyer
router.post('/login', (req, res, next) => {
  buyerController.authenticateBuyer(req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
})

module.exports = router;