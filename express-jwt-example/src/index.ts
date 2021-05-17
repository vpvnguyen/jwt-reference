import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";

dotenv.config();

// check if Node.js loaded the environmental variable PORT into process.env; otherwise, exit the application
if (!process.env.PORT) {
  process.exit(1);
}

// parse its value as a number type and create an instance of an Express application
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet()); // provides you with sensible defaults such as DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype, and XSS Filter
app.use(cors()); // enable all CORS requests
app.use(express.json()); // parse incoming requests with JSON payloads, which populates the request object with a new body object containing the parsed data
app.use("/api/items", itemsRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
