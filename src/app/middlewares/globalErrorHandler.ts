import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import { errorHandler } from "../errors/handleZodError";
import handleValidationError from "./handleValidationError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500; // Default status code for internal server error
  let message = "Something went wrong"; // Default error message
  let errorDetails: any = {};

  // Handle Zod Validation Error
  if (error instanceof ZodError) {
    const simplifiedError = errorHandler(error);
    statusCode = simplifiedError?.statusCode || 400;
    message = "Validation error";
    errorDetails = simplifiedError?.errorSources || [];
  } 
  // Handle Mongoose Validation Error
  else if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode || 400;
    message = "Validation error";
    errorDetails = simplifiedError?.errorSources || [];
  } 
  // Handle Custom Application Error
  else if (error instanceof AppError) {
    statusCode = error?.statusCode || 400;
    message = error?.message || "Application error";
    errorDetails = [
      {
        path: "",
        message: error?.message,
      },
    ];
  } 
  // Handle General Errors
  else if (error instanceof Error) {
    message = error?.message || "Internal server error";
    errorDetails = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }


   res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: { details: errorDetails },
    stack: error?.stack,
  });
};

export default globalErrorHandler;
