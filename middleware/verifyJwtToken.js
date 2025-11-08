require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJwtToken = async(req, res, next) => {
  try{

    const token = req.cookies?.token;
    // console.log(token);
    if(!token) return res.status(401).send({message: 'unauthorized access'});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      // console.log('err', err);
      // console.log('decoded', decoded);
      if(err) return res.status(403).send({message: 'forbidden access'});

      req.user = decoded;
      next();
    })

  } catch(err){
    console.log(err);
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = verifyJwtToken;