"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = require("../errors/handleZodError");
const handleValidationError_1 = __importDefault(require("./handleValidationError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500; // Default status code for internal server error
    let message = "Something went wrong"; // Default error message
    let errorDetails = {};
    // Handle Zod Validation Error
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.errorHandler)(error);
        statusCode = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) || 400;
        message = "Validation error";
        errorDetails = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources) || [];
    }
    // Handle Mongoose Validation Error
    else if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) || 400;
        message = "Validation error";
        errorDetails = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources) || [];
    }
    // Handle Custom Application Error
    else if (error instanceof AppError_1.default) {
        statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 400;
        message = (error === null || error === void 0 ? void 0 : error.message) || "Application error";
        errorDetails = [
            {
                path: "",
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    // Handle General Errors
    else if (error instanceof Error) {
        message = (error === null || error === void 0 ? void 0 : error.message) || "Internal server error";
        errorDetails = [
            {
                path: "",
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: { details: errorDetails },
        stack: error === null || error === void 0 ? void 0 : error.stack,
    });
};
exports.default = globalErrorHandler;
