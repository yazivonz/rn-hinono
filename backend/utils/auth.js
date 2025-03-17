// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource"
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};