import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./config/env.config";
import { authRouter } from "./auth/auth.router";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

const app = express();

app.use(helmet()); // provides you with sensible defaults such as DNS Prefetch Control, Frameguard, Hide Powered-By, HSTS, IE No Open, Don't Sniff Mimetype, and XSS Filter
app.use(cors()); // enable all CORS requests
app.use(express.json()); // parse incoming requests with JSON payloads, which populates the request object with a new body object containing the parsed data
app.use(authRouter);
app.use("/api/items", itemsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
