const express = require("express");
const { createBid } = require("../controllers/bids.controller");
const BidsCollection = require("../models/bid.model");
const bidsRoutes = express.Router();

bidsRoutes.post("/bid", createBid);

// get bids for my bids 
bidsRoutes.get("/bids", async (req, res) => {
  try {
    const email = req.query.email;
    let query = {};
    if (email) {
      query = { 'email': email }
    }
    const bids = await BidsCollection.find(query).lean();
    res.status(200).json({
      success: true,
      bids
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// get bids data for bids owner
bidsRoutes.get("/bids-requests", async (req, res) => {
  try {
    const email = req.query.email;
    let query = {};
    if (email) {
      query = { "buyer_email": email };
    }
    const bids = await BidsCollection.find(query).lean();
    res.status(200).json({
      success: true,
      bids
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

// update bid status 
bidsRoutes.patch("/update-bid-status/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const  status  = req.body;

    console.log(_id, status);

    const result = await BidsCollection.findByIdAndUpdate(_id, { $set: status });

    res.status(200).json({
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
})

module.exports = bidsRoutes;