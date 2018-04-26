const express = require('express');
const router = express.Router();
const jobController = require('./../controllers/jobController');
const config = require('./../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// **  JOBS RESOURCE ** //
// GET '/job' to get all jobs
router.get('/', config.validateAdmin, (req, res, next) => {
  jobController.getAllJobs((err, success) => {
    if(err)
      res.status(500).send({err: err, data: null});
    else
      res.status(200).send({err: null, data: success});
  })
});

// GET '/job/:id' to get a specific Job
router.get('/:id', config.validateRequest, (req, res, next) => {
  jobController.getJobById(req.params.id, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// POST '/job' to add a new job
router.post('/', config.validateBuyer, (req, res, next) => {
  console.log(req.body);
  jobController.addJob(req.body, req.headers['x-key'], (err, success) => {
    if(err)
      res.status(500).send({err: err, data: null});
    else
      res.status(200).send({err: null, data: success});
  });
});

// PUT '/job' to update an existing job
router.put('/:id', config.validateBuyer, (req, res, next) => {
  console.log(req.body);
  jobController.modifyJob(req.params.id, req.headers['x-key'], req.body, 
    (err, status, success) => {
      res.status(status).json({err: err, data: success});
  });
});

// DELETE '/job/:id' to delete a Job
router.delete('/:id', (req, res, next) => {

});

// PATCH '/job/:id' to submit a Bid
router.patch('/:id/bid', config.validateSeller, (req, res, next) => {
  console.log(req.body);
  jobController.submitBid(req.params.id, req.headers['x-key'], req.body, 
    (err, status, success) => {
      res.status(status).json({err: err, data: success});
  });
});

// PATCH '/job/:id/status' to update status of a bid
router.patch('/:id/status', config.validateAdmin, (req, res, next) => {
  jobController.updateJobStatus(req.params.id, req.body.status, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

module.exports = router;