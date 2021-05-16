const router = require("express").Router();
require("dotenv").config();
const pool = require("../config/database");

// get user by email body
router.post("/getUserEmail", async (req, res) => {
  console.log(`/getUserEmail: ${JSON.stringify(req.body)}`);
  try {
    const { email } = req.body;
    const getUserEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    console.log(`getUserEmail: ${JSON.stringify(getUserEmail.rows[0])}`);
    res.status(200).json(getUserEmail.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Get User Email Error");
  }
});

// get user by email params
router.get("/getUserEmail/:email", async (req, res) => {
  console.log(`/getUserEmail: ${JSON.stringify(req.params)}`);
  try {
    const { email } = req.params;
    const getUserEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    console.log(`getUserEmail: ${JSON.stringify(getUserEmail.rows[0])}`);
    res.status(200).json(getUserEmail.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Get User Email Error");
  }
});

// get user by id
router.get("/getUserByID/:id", async (req, res) => {
  console.log(`/getUser: ${JSON.stringify(req.params)}`);
  try {
    const { id } = req.params;
    const getUser = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log(`getUserByID: ${JSON.stringify(getUser.rows[0])}`);
    res.json(getUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Get User Error");
  }
});

// delete user by id
router.delete("/deleteUser/:id", async (req, res) => {
  console.log(`/deleteUser: ${JSON.stringify(req.params)}`);
  try {
    const { id } = req.params;

    console.log(`User ID: ${id}`);
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    console.log(deleteUser);
    res.json(`Deleted User ID: ${id}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Delete User Error");
  }
});

module.exports = router;
