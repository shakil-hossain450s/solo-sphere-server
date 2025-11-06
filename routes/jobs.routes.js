const express = require("express");
const JobsCollections = require("../models/jobs.model");
const jobsRoutes = express.Router();

// get all jobs
jobsRoutes.get("/jobs", async (req, res) => {
  try {
    const jobs = await JobsCollections.find().lean();
    res.status(200).json({
      success: true,
      jobs
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err
    })
  }
})

// get a single job
jobsRoutes.get("/job/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const job = await JobsCollections.findOne({ _id });
    res.status(200).json({
      success: true,
      job
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err
    })
  }
})

module.exports = jobsRoutes;