const mongoose = require('mongoose');
const schema = require('./../models/schema');
const { ObjectId } = require('mongodb');
const auth = require('./../../auth');

// Models
let Buyer = mongoose.model('Buyer', schema.buyerSchema);

// Get All Buyers
let getBuyers = (callback) => {
  Buyer.find({}, (err, buyers) => {
    return callback(err, buyers);
  });
}

// Get a particular buyer
let getBuyerById = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Buyer Id', 400, null);
  
  Buyer.findOne({_id: id}, (err, buyer) => {
    if(err)
      return callback(err, 500, null);
    else if(!buyer)
      return callback('No Buyer Found', 404, null);
    else
      return callback(null, 200, buyer);
  })
}

// Get Buyer Jobs
let getBuyerJobs = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback("Invalid Buyer Id", 400, null);
  
  Buyer.findOne({_id, id}, 'jobs', (err, jobs) => {
    if(err)
      return callback(err, 500, null);
    else
      return callback(null, 200, jobs);
  })
}

// Add new buyer
let addBuyer = (data, callback) => {
  Buyer.findOne({email: data.email.toLowerCase()}, (err, buyer) => {
    if(err)
      return callback(err, 500, null);
    else if(buyer)
      return callback('Email Already Registerd! Please Login', 400, null);
    else{
      let buyer = new Buyer(data);
      buyer.email = data.email.toLowerCase();
      buyer.password = buyer.generateHash(data.password);
      buyer.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, auth.generateToken(success));
      });
    }
  });  
}

// Authenticate Buyer
let authenticateBuyer = (data, callback) => {
  Buyer.findOne({email: data.email.toLowerCase()}, (err, buyer) => {
    if(err)
      return callback(err, 500, null);
    else if(!buyer)
      return callback('No User Found', 404, null);
    else{
      if(buyer.validatePassword(data.password)){
        return callback(null, 200, auth.generateToken(buyer));
      }else
        return callback('Wrong Password!', 401, null);
    }
  });
}

module.exports = {
  getBuyers,
  getBuyerById,
  addBuyer,
  getBuyerJobs,
  authenticateBuyer
}