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
exports.ensureCodesExistsMiddleware = void 0;
const error_1 = require("../error");
const database_1 = require("../database");
const pg_format_1 = __importDefault(require("pg-format"));
const ensureCodesExistsMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { codes } = request.body;
    const queryString = (0, pg_format_1.default)(`
	SELECT * 
	FROM
		rastreio
	WHERE 
		id IN (%L)
	`, codes);
    const queryResult = yield database_1.client.query(queryString);
    if (queryResult.rowCount != codes.length) {
        throw new error_1.AppError("Some code not found", 404);
    }
    return next();
});
exports.ensureCodesExistsMiddleware = ensureCodesExistsMiddleware;
