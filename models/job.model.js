const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
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
  buyer_info: {
    buyer_email: {
      type: String,
      required: true,
      trim: true
    },
    buyer_name: {
      type: String,
      required: true,
    },
    buyer_photo: {
      type: String,
      required: true
    }
  }

}, { timestamps: true });

const JobsCollections = mongoose.model("Jobs", JobsSchema);
module.exports = JobsCollections;