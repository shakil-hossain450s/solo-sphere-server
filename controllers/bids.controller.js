const BidsCollection = require("../models/bid.model");

const createBid = async (req, res) => {
  try {
    const bidData = req.body;
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

module.exports = {createBid};