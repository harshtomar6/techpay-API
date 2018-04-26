const mongoose = require('mongoose');
const schema = require('./../models/schema');
const { ObjectId } = require('mongodb');
const auth = require('./../../auth');

// Models
let Seller = mongoose.model('Seller', schema.sellerSchema);

// Get All Sellers
let getSellers = (callback) => {
  Seller.find({}, (err, sellers) => {
    return callback(err, sellers);
  });
}

// Get a particular Seller
let getSellerById = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Seller Id', 400, null);
  
  Seller.findOne({_id: id}, (err, seller) => {
    if(err)
      return callback(err, 500, null);
    else if(!seller)
      return callback('No Seller Found', 404, null);
    else
      return callback(null, 200, seller);
  })
}

// Add new Seller
let addSeller = (data, callback) => {
  Seller.findOne({email: data.email}, (err, seller) => {
    if(err)
      return callback(err, 500, null);
    else if(seller)
      return callback('Email Already Registerd! Please Login', 400, null);
    else{
      let seller = new Seller(data);
      seller.password = seller.generateHash(data.password);
      seller.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, auth.generateToken(success));
      });
    }
  });  
}

let authenticateSeller = (data, callback) => {
  Seller.findOne({email: data.email}, (err, seller) => {
    if(err)
      return callback(err, 500, null);
    else if(!data)
      return callback('No User Found', 404, null);
    else{
      if(seller.validatePassword(data.password)){
        return callback(null, 200, auth.generateToken(seller));
      }else
        return callback('Wrong Password!', 401, null);
    }
  });
}

module.exports = {
  getSellers,
  getSellerById,
  addSeller,
  authenticateSeller
}