// Dependencies
const mongoose = require('mongoose');
const schema = require('./../models/schema');
const auth = require('./../../auth');
const { ObjectId } = require('mongodb');

// Models
let Admin = mongoose.model('Admin', schema.adminSchema);
let Job = mongoose.model('Job', schema.jobSchema);

// Add admin
let addOrAuthenticateAdmin = (data, callback) => {
  Admin.find({}, (err, admins) => {
    if(err)
      return callback(err, 500, null);
    else if(admins.length >= 2)
      return callback('No More Admins Can be Added', 400, null);
    else{
      Admin.findOne({email: data.email}, (err, admin) => {
        if(err)
          return callback(err, 500, null);
        else if(admin){
          if(admin.validatePassword(data.password))
            return callback(null, 200, auth.generateToken(admin));
          else
            return callback('Wrong Password', 401, null);  
        }else{
          let admin = new Admin(data);
          admin.password = admin.generateHash(data.password);
          admin.save((err, success) => {
            if(err)
              return callback(err, 500, null);
            else
              return callback(null, 200, auth.generateToken(success));
          });
        }
      })
    }
  })
}

// Get admin by id
let getAdminById = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Object ID', 400, null);
  
  Admin.findOne({_id: id}, (err, admin) => {
    if(err)
      return callback(err, 500, null);
    else if(!admin)
      return callback('Invalid Key For Admin', 404, null);
    else
      return callback(null, 200, admin);
  })
}


module.exports = {
  addOrAuthenticateAdmin,
  getAdminById
}
