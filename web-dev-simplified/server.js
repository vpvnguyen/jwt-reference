const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

// DATA MODEL
const posts = [
  {
    username: "Vincent",
    job: "Developer",
    title: "Post 1",
  },
  {
    username: "Jim",
    job: "Sales",
    title: "Post 2",
  },
];

// REFRESH TOKEN MODEL (ideally, store in memory or DB)
let refreshTokens = [];

// MIDDLEWARE
const authenticateToken = (req, res, next) => {
  // get token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No Token" });

  // verify correct user
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });

    // set user to request if valid
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

// LOGIN; GET ACCESS TOKEN FOR USERNAME DETECTED
app.post("/login", (req, res) => {
  // authenticate user
  const { username } = req.body;
  const user = { username };
  const refreshToken = generateRefreshToken(user);

  // save refresh token to memory or DB
  refreshTokens.push(refreshToken);

  // return refresh token for username
  res.json({ refreshToken });
});

app.post("/refreshToken", (req, res) => {
  // check if refresh token exists
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "No Refresh Token" });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ message: "Refresh Token does not exist" });

  // verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });

    // at this point, there is more data in user (issueAt, etc)
    // get username specifically
    const { username } = user;
    const accessToken = generateAccessToken({ username });
    res.status(204).json({ accessToken });
  });
});

// GET POSTS BY USERNAME
app.get("/posts", authenticateToken, (req, res) => {
  // get username from req.user created by middlware
  const { username } = req.user;

  // filter for posts by username
  const postsByUsername = posts.filter((post) => post.username === username);

  // return posts
  res.status(200).json(postsByUsername);
});

app.delete("/logout", (req, res) => {
  // delete refresh token
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(410).json({ message: "Successfully deleted Refresh Token" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
