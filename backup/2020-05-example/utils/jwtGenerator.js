const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate jwt using user's id with jwt secret key
const jwtGenerator = (id) => {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

module.exports = jwtGenerator;
