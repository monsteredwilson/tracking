"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureTokenIsValidMiddleware = void 0;
const error_1 = require("../error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ensureTokenIsValidMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = request.headers.authorization;
    if (!token) {
        throw new error_1.AppError('Missing Bearer Token', 401);
    }
    token = token.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, decode) => {
        if (error) {
            throw new error_1.AppError(error.message, 401);
        }
        response.locals.isAdmin = decode.admin;
        response.locals.id = parseInt(decode.sub);
    });
    return next();
});
exports.ensureTokenIsValidMiddleware = ensureTokenIsValidMiddleware;
