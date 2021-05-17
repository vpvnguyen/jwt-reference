import { Router } from "express";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config/env.config";
import { generateAccessToken, generateRefreshToken } from "./auth.middleware";

export const authRouter = Router();

let refreshTokens: string[] = [];

// POST login
authRouter.post("/login", (req, res) => {
  console.log("login", req.body);
  // authenticate user
  const { username } = req.body;
  const user = { username };
  const refreshToken = generateRefreshToken(user);

  // save refresh token to memory or DB
  refreshTokens.push(refreshToken);

  // return refresh token for username
  res.status(200).json({ refreshToken });
});

// POST refreshToken
authRouter.post("/refreshToken", (req, res) => {
  console.log("refreshToken", req.body);

  // check if refresh token exists
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "No Refresh Token" });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ message: "Refresh Token does not exist" });

  // verify refresh token
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });

    // at this point, there is more data in user (issueAt, etc)
    // get username specifically
    console.log("refreshToken", user);
    const { username } = user;
    const accessToken = generateAccessToken({ username });
    res.status(200).json({ accessToken });
  });
});

// DELETE logout
authRouter.delete("/logout", (req, res) => {
  console.log("logout", req.body);

  // delete refresh token
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(410).json({ message: "Successfully deleted Refresh Token" });
});
