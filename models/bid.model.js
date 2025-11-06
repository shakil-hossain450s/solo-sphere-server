const mongoose = require("mongoose");

const BidsSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
    required: true
  },
  job_title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Web Development", "Graphics Design", "Digital Marketing"]
  },
  deadline: {
    type: Date,
    required: true
  },
  buyer_email: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const BidsCollection = mongoose.model("Bids", BidsSchema);
module.exports = BidsCollection;