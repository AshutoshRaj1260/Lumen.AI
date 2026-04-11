const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
      success: false,
      err: "Token Missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
        err: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized access",
      success: false,
      err: "Token not valid",
    });
  }
}

module.exports = identifyUser;
