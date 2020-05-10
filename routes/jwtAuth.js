const router = require("express").Router();
const pool = require("../config/database");
const bcrypt = require("bcrypt");

const jwtGenerator = require("../utils/jwtGenerator");

const validInfo = require("../middleware/validEmail");
const authorization = require("../middleware/authorization");

// add user
router.post("/register", validInfo, async (req, res) => {
  console.log(`/register: ${JSON.stringify(req.body)}`);
  try {
    // destructure the req.body { name, email, password }
    const { name, email, password } = req.body;
    // check if user exists by querying db for users by email
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // if user exists, throw error
    // an array of objects will return if user exists
    // empty array will return if there are no users
    // send status 401 if unauthenticated, 403 if unauthorized
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    // bcrypt the new user's password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    // encrypted password
    const bcryptPassword = await bcrypt.hash(password, salt);

    // insert the new user inside the database
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    console.log(`inserted newUser: ${newUser.rows}`);

    // generate jwt token
    const token = jwtGenerator(newUser.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Registration Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  console.log(`/login: ${req.body}`);
  try {
    // get email and password from req.body
    const { email, password } = req.body;

    // check if user doesnt exist in DB
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    // check if incoming password is the same as the password in the DB
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    console.log(`Valid password? ${validPassword}`); // true if password is valid

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    // give client the jwt token
    const token = jwtGenerator(user.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Login Error");
  }
});

router.get("/verify", authorization, async (req, res) => {
  console.log(`/verify: ${JSON.stringify(req.body)}`);
  try {
    console.log("User verified!");
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Verification Error");
  }
});

module.exports = router;
