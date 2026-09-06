const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  //checking token exist or not.
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  //checking the token is blacklisted or not
  const isTokenBalcklisted = await tokenBlacklistModel.findOne({token})

  if(isTokenBalcklisted){
    return res.status(401).json({
      error: "Token is invalid"
    })
  }

  try {
    //verifying the token is valid or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(401).json({ error: "Tokein is invalid" });
  }
}

module.exports = authMiddleware;
