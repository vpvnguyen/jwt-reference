import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const getJwtTokenSecret = () => {
  const jwtTokenSecret = process.env.JWT_TOKEN_SECRET;
  if (!jwtTokenSecret)
    throw new Error(`JWT ERROR: jwtTokenSecret is ${jwtTokenSecret}!`);
  return jwtTokenSecret;
};

const generateAccessToken = (username: string) => {
  const jwtTokenSecret = getJwtTokenSecret();

  // jwt.sign(payload, secret, options?)
  // in order to use 'exp' options, payload must be an object literal
  return jwt.sign({ username }, jwtTokenSecret, {
    expiresIn: "1800s",
  });
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const headerToken = authHeader && authHeader.split(" ")[1];

  if (headerToken == null) return res.sendStatus(401);

  const jwtTokenSecret = getJwtTokenSecret();
  jwt.verify(headerToken, jwtTokenSecret, (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.signedCookies.user = user;

    next();
  });
};

app.get("/", (req, res) => {
  console.log(process.env.JWT_TOKEN_SECRET);
  res.send("Welcome to the Express API Server");
});

app.post("/createNewUser", async (req, res) => {
  try {
    const { username } = req.body;

    const accessToken = generateAccessToken(username);
    res.json(accessToken);
  } catch (error) {
    console.error("Error /createNewUser", error);
    res.send("Error /createNewUser");
  }
});

app.get("/authenticateUser", authenticateToken, (req, res) => {
  res.send("user authenticated");
});

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
