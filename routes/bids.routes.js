const express = require("express");
const { createBid } = require("../controllers/bids.controller");
const bidsRoutes = express.Router();

bidsRoutes.post("/bid", createBid);

module.exports = bidsRoutes;