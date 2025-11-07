const express = require("express");
const { getAllJobs, getSingleJob, createSingleJob, updateJob, deleteJob, getJobsPostedBySpecificUser } = require("../controllers/jobs.controller");
const verifyToken = require("../middleware/verifyToken");
const JobsCollections = require("../models/job.model");
const jobsRoutes = express.Router();

// get all jobs
jobsRoutes.get("/jobs", getAllJobs);

// get all jobs posted by a specific user
jobsRoutes.get("/jobs/:email", verifyToken, getJobsPostedBySpecificUser);

// get a single job
jobsRoutes.get("/job/:id", getSingleJob);

// create a job data
jobsRoutes.post("/job", createSingleJob);

// update a job data
jobsRoutes.put("/job/:id", updateJob);

// delete a job data
jobsRoutes.delete("/job/:id", deleteJob);

module.exports = jobsRoutes;