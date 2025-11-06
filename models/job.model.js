const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Web Development", "Graphics Desing", "Digital Marketing"]
  },
  deadline: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  min_price: {
    type: Number,
    required: true,
    min: 0
  },
  max_price: {
    type: Number,
    required: true,
    min: 0
  },
  buyer_email: {
    type: String,
    required: true,
    trim: true
  },
  buyer_name: {
    type: String,
    required: true,
  }
});

const JobsCollections = mongoose.model("Jobs", JobsSchema);
module.exports = JobsCollections;