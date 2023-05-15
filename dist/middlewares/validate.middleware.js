"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDataMiddleware = void 0;
const validateDataMiddleware = (schema) => (request, response, next) => {
    const validatedData = schema.parse(request.body);
    request.body = validatedData;
    return next();
};
exports.validateDataMiddleware = validateDataMiddleware;
