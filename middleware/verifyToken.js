require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) return res.status(401).send({ message: "Unauthorized access" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({  message: "Unauthorized access" });
      }

      req.user = decoded; 
      next();
    });
  } catch (err) {
    res.status(500).send({ success: false, message: "Token verification failed", error: error.message });
  }
}

module.exports = verifyToken;