"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Handle 404 (Not Found) as a middleware
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API Not Found",
        error: ""
    });
};
exports.default = notFound;
