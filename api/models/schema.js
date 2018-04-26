const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let jobSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  budget: {type: Number, required: true},
  jobOwner: {type: String, required: true},
  jobDoer: {type: String, required: true, default: 'none'},
  bids: {type: Array, required: true, default: []}, // Array of seller Id's and Bid Amount with date
  status: {type: String, required: true, default: 'APPROVAL_PENDING'}, 
  // APPROVAL_PENDING | APPROVED | REJECTED | BIDS_CLOSED | JOB_FINISHED | REVISION_REQUESTED |  
  remarks: {type: String, required: true, default: 'none'},
  postedOn: {type: Date, required: true, default: Date.now}
});

let buyerSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  password: {type: String, required: true}, 
  photoUrl: {type: String, required: true, default: 'none'},
  providerData: {type: String, default: 'email'},
  phone: {type: String, required: true, default: 'none'},
  jobs: {type: Array, default: []}, // Array of Job id's
  registeredOn: {type: Date, default: Date.now}
});

let sellerSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  phone: {type: String, required: true, default: 'none'},
  photoUrl: {type: String, required: true, default: 'none'},
  providerData: {type: String, default: 'email'},
  category: {type: Array, required: true, default: []}, // Array of services provided by freelancer
  favourites: {type: Array, default: []}, // Array of Favourites Jobs of Freelancer
  jobs: {type: Array, default: []}, // Array of Job id's
  registeredOn: {type: Date, default: Date.now},
  subscribe: {
    status: {type: Boolean, default: false},
    plan: {type: String, default: 'MONTHLY'}, // Plan Type 'monthly', 'Half Yearly' or 'yearly'
    cycle: {type: String, default: ''}
  }
});

let adminSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

buyerSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

buyerSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

sellerSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

sellerSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

adminSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

adminSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

module.exports = {
  jobSchema,
  buyerSchema,
  sellerSchema,
  adminSchema
}