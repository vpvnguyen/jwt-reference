const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    // destructure token
    const jwtToken = req.header("token");

    // check if token exists
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    // verify if token if valid by passing in the given client token and our jwt secret
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // set the requested user as the payload to be used in the client token
    req.user = payload.user;
    console.log(`payload.user: ${payload.user}`);

    // continue on to route
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorized");
  }
};
