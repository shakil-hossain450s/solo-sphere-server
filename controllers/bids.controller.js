const BidsCollection = require("../models/bid.model");

const createBid = async (req, res) => {
  try {
    const bidData = req.body;

    const query = {
      jobId: bidData.jobId,
      email: bidData.email
    }

    const isAlreadyApplied = await BidsCollection.findOne(query).lean();
    if (isAlreadyApplied) {
      return res.status(404).json({ success: false, message: "Already applied in this job" });
    }

    const result = await BidsCollection.create(bidData);
    res.status(201).json({
      success: true,
      message: "Bid placed successfully.",
      result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = { createBid };