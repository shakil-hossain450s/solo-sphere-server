require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobsRoutes = require("./routes/jobs.routes");
const bidsRoutes = require("./routes/bids.routes");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://solosphere8699.web.app"
  ],
  credentials: true,
  optionsSuccessStatus: 200
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.post("/jwt", async (req, res) => {
  const user = req.body;
  console.log(user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : "lax"
  }).send({ success: true });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : "lax"
  }).send({ success: true });
});

// default route
app.get("/", (req, res) => {
  res.status(200).send("SoloSphere is cooking!");
});



// jobs routes
app.use("/", jobsRoutes);

// bids routes
app.use("/", bidsRoutes);



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