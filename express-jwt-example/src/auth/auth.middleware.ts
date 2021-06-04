import { Request, Response, NextFunction } from "express";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config/env.config";
import jwt from "jsonwebtoken";
import { IUser } from "./auth.interface";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // check if token exists from auth header
  if (!token) return res.status(401).json({ message: "Token does not exist" });

  // verify access token
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // set user to express response object to be passed to next function
    res.locals.user = user;

    // continue to next function
    next();
  });
};

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET);
};
