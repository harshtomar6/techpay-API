let mongoose = require('mongoose');
const schema = require('./../models/schema');
const { ObjectId } = require('mongodb');

//Models
let Job = mongoose.model('Job', schema.jobSchema);

// Common Data Opertaion Functions for Job
let addJob = (data, ownerId, callback) => {
  let job = new Job(data);
  job.jobOwner = ownerId;
  job.save((err, success) => callback(err, success));
}

// Get a particular job
let getJobById = (id, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Job Id', 400, null);

  Job.findOne({_id: id}, (err, success) => {
    if(err)
      return callback(err, 500, null);
    else if(!success)
      return callback('No Job Found', 404, null);
    else 
      return callback(null, 200, success);
  });
}

// Get All Jobs
let getAllJobs = (callback) => {
  Job.find({}, (err, success) => {
    return callback(err, success);
  });
}

// Modify A Job
let modifyJob = (id, ownerKey, data, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Job ID', 400, null);
  
  Job.findOne({_id: id}, (err, job) => {
    if(err)
      return callback(err, 500, null);
    else if(!job)
      return callback('No Job Found', 404, null);
    else{
      if(job.jobOwner == ownerKey)
        Job.update({_id: id}, data, (err, success) => {
          if(err)
            return callback(err, 500, null);
          else
            return callback(null, 200, success);
        });
      else
        return callback('Not Authorised', 401, null);
    }
  });
}

// Delete A Job
let deleteJob = (id, data, callback) => {
  Job.remove({_id:id }, (err, success) => callback(err, success));
}

// Miscellaneous Functions for Job
let submitBid = (id, ownerKey, data, callback) => {
  if(!ObjectId.isValid(id))
    return callback('Invalid Job Id', 400, null);
  
  Job.findOne({_id: id}, (err, job) => {
    if(err)
      return callback(err, 500, null);
    else if(!job)
      return callback('No Job Found', 404, null);
    else{
      if(job.status == 'APPROVED'){
        data.ownerId = ownerKey;
        data.date = Date.now();
        job.bids.push(data);
        job.save((err, success) => {
          if(err)
            return callback(err, 500, null);
          else
            return callback(null, 200, success);
        })
      }
      else
        return callback('Job is not available for bidding', 400, null);
    }
  })
}

// Update Job Status
let updateJobStatus = (jobId, status, callback) => {
  if(!ObjectId.isValid(jobId))
    return callback('Invalid job Id', 400, null);
  
  Job.findOne({_id: jobId}, (err, job) => {
    if(err)
      return callback(err, 500, null);
    else if(!job)
      return callback("No Job Found", 404, null);
    else{
      job.status = status;
      job.save((err, success) => {
        if(err)
          return callback(err, 500, null);
        else
          return callback(null, 200, success);
      });
    }
  });
}

// Allot a Job
let allotJob = (id, doerId, callback) => {
  if(!ObjectId.isValid(id) || !ObjectId.isValid(doerId))
    return callback("Invalid Job Or Doer Id", 400, null);
  
  Job.findOne({_id: id}, (err, job) => {
    if(err)
      return callback(err, 500, null);
    else if(!job)
      return callback('No Job Found', 404, null);
    else{
      if(job.status == 'APPROVED'){
        job.doer = doerId;
        job.status = 'BIDS_CLOSED';

        job.save((err, success) => {
          if(err)
            return callback(err, 500, null);
          else
            return callback(null, 200, success);
        })
      }else
        return callback('Job Already Alloted', 400, null);
    }
  });
}

module.exports = {
  addJob, 
  getJobById, 
  getAllJobs,
  modifyJob, 
  deleteJob,
  submitBid,
  updateJobStatus,
  allotJob
}