// Dependencies
const express = require('express');
const router = express.Router();
const sellerController = require('./../controllers/sellerController');
const config = require('./../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/seller' to get all sellers
router.get('/', config.validateAdmin, (req, res, next) => {
  sellerController.getSellers((err, success) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: success});
  })
});

// POST '/seller' to add a new seller
router.post('/', (req, res, next) => {
  sellerController.addSeller(req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  })
})

// POST '/seller/login' to authenticate a seller
router.post('/login', (req, res, next) => {
  sellerController.authenticateSeller(req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
})

module.exports = router;