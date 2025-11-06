const express = require("express");
const { getJobs, getSingleJob, createSingleJob, updateJob, deleteJob } = require("../controllers/jobs.controllers");
const jobsRoutes = express.Router();

// get all jobs
jobsRoutes.get("/jobs", getJobs);

// get a single job
jobsRoutes.get("/job/:id", getSingleJob);

// create a job data
jobsRoutes.post("/job", createSingleJob);

// update a job data
jobsRoutes.put("/job/:id", updateJob);

// delete a job data
jobsRoutes.delete("/job/:id", deleteJob);

module.exports = jobsRoutes;