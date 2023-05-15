"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.AppError = void 0;
const zod_1 = require("zod");
class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const handleErrors = (error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof zod_1.ZodError) {
        return response.status(400).json(error.flatten().fieldErrors);
    }
    return response.status(500).json({ message: 'Internal server error' });
};
exports.handleErrors = handleErrors;
