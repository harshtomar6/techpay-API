// Dependencies
const buyerController = require('./api/controllers/buyerController');
const sellerController = require('./api/controllers/sellerController');
const adminController = require('./api/controllers/adminController');
const jwt = require('jwt-simple');

// Request Validator Middleware
let validateRequest = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key){
    try{
      let decoded = jwt.decode(token, process.env.SECRET);

      if(decoded.exp <= Date.now()){
        res.status(400).json({err: 'Token Expired! Login Again', data: null});
        return;
      }

      adminController.getAdminById(key, (err, status, admin) => {
        if(err){
          buyerController.getBuyerById(key, (err, status, buyer) => {
            if(err){
              sellerController.getSellerById(key, (err, status, seller) => {
                if(err)
                  res.status(status).json({err: err, data: seller});
                else if(status == 200)
                  next();
              })
            }else if(status == 200)
              next();
          })
        }
        else if(status == 200)
          next();
      })
    }catch(err){
      res.status(500).json({err: 'Cannot Authenticate Token', data: null});
    }
  }else
    res.status(401).json({err: 'Token or Key not Found', data: null});
}

// Validate Buyer Middleware
let validateBuyer = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key){
    try{
      let decoded = jwt.decode(token, process.env.SECRET);

      if(decoded.exp <= Date.now()){
        res.status(400).json({err: 'Token Expired! Login Again', data: null});
        return;
      }

      buyerController.getBuyerById(key, (err, status, buyer) => {
        if(err){
          res.status(status).json({err: err, data: buyer});
        }else if(status == 200)
          next();
      })

    }catch(err){
      console.log(err);
      res.status(500).json({err: 'Cannot Authenticate Token', data: null});
    }
  }else
    res.status(401).json({err: 'Token or Key not Found', data: null});
}

// Validate Seller Middleware
let validateSeller = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key){
    try{
      let decoded = jwt.decode(token, process.env.SECRET);

      if(decoded.exp <= Date.now()){
        res.status(400).json({err: 'Token Expired! Login Again', data: null});
        return;
      }

      sellerController.getSellerById(key, (err, status, seller) => {
        if(err){
          res.status(status).json({err: err, data: seller});
        }else if(status == 200)
          next();
      })

    }catch(err){
      res.status(500).json({err: 'Cannot Authenticate Token', data: null});
    }
  }else
    res.status(401).json({err: 'Token or Key not Found', data: null});
}

// Validate Admin Middleware
let validateAdmin = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key){
    try{
      let decoded = jwt.decode(token, process.env.SECRET);

      if(decoded.exp <= Date.now()){
        res.status(400).json({err: 'Token Expired! Login Again', data: null});
        return;
      }

      adminController.getAdminById(key, (err, status, admin) => {
        if(err){
          res.status(status).json({err: err, data: admin});
        }else if(status == 200)
          next();
      })

    }catch(err){
      res.status(500).json({err: 'Cannot Authenticate Token', data: null});
    }
  }else
    res.status(401).json({err: 'Token or Key not Found', data: null});
}

module.exports = {
  validateRequest,
  validateSeller,
  validateBuyer,
  validateAdmin
}