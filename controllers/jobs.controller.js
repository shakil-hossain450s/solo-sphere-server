const JobsCollections = require("../models/job.model");

// get all jobs
const getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const filter = req.query.filter;
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sort === 'asc' ? 1 : -1;
    const search = req.query.search || "";

    let query = {};
    if (filter) {
      query = { category: filter }
    }

    if (search) {
      query.job_title = { $regex: search, $options: "i" }
    }

    
    const jobs = await JobsCollections.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await JobsCollections.countDocuments(query);

    res.status(200).json({
      success: true,
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// get jobs post data by specific user
const getJobsPostBySpecificUser = async (req, res) => {
  try {
    const { email: tokenEmail } = req.user;
    const email = req.params.email;

    console.log('tokenEmail', tokenEmail);
    console.log(email);

    if (email !== tokenEmail) {
      return res.status(403).send({ message: 'forbidden access' });
    }

    const query = { 'buyer_info.buyer_email': email };

    const jobs = await JobsCollections.find(query).lean();
    res.status(200).json({
      success: true,
      jobs
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    })
  }
}

// get a single job data
const getSingleJob = async (req, res) => {
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
      message: err.message
    })
  }
}

// create a job data
const createSingleJob = async (req, res) => {
  try {
    const jobData = req.body;
    console.log(jobData);
    const result = await JobsCollections.create(jobData);
    res.status(201).json({
      success: true,
      result
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// update a job data
const updateJob = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedJobData = req.body;

    const result = await JobsCollections.findByIdAndUpdate(
      _id,
      { $set: updatedJobData },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Job not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Data updated successfully!",
      result
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// delete a job data
const deleteJob = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await JobsCollections.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: "Job Data deleted successfully!",
      result
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { getJobs, getJobsPostBySpecificUser, getSingleJob, createSingleJob, updateJob, deleteJob };