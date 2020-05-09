const router = require("express").Router();
const pool = require("../config/database");
const bcrypt = require("bcrypt");

const jwtGenerator = require("../utils/jwtGenerator");
// register

// add user
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    // destructure the req.body { name, email, password }
    const { name, email, password } = req.body;
    // check if user exists by querying db for users by email
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    console.log(user.rows);
    // if user exists, throw error
    // an array of objects will return if user exists
    // empty array will return if there are no users
    // send status 401 if unauthenticated, 403 if unauthorized
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    // bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    // encrypt
    const bcryptPassword = await bcrypt.hash(password, salt);

    // enter the user inside the database
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    console.log(newUser.rows);

    // generate jwt token
    const token = jwtGenerator(newUser.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
