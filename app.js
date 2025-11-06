const express = require("express");
const cors = require("cors");
const jobsRoutes = require("./routes/jobs.routes");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174",],
  credentials: true,
  optionSuccessStatus: 200
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// default route
app.get("/", (req, res) => {
  res.status(200).send("SoloSphere is cooking!");
});

// jobs routes
app.use("/", jobsRoutes);

// 404 route 
app.use((req, res, next) => {
  res.status(404).send("404 - Oops! Page not found.");
});

// 500 - Internal server error route
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("500 - Internal Server Error!");
});

module.exports = app;