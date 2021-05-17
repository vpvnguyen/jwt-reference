import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

// Note that the four provided arguments are to identify a function as an error-handling middleware
// Specify the next object to maintain the error-handling signature even if it's not used
// Otherwise, Express interprets the next object as a regular middleware function, and it won't handle any errors

// If error.status and error.message are defined, include those in the server response
// Otherwise, default to a generic 500 Internal Server Error status code and a generic message
export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;

  response.status(status).send(error);
};
