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
exports.loginService = void 0;
const pg_format_1 = __importDefault(require("pg-format"));
const database_1 = require("../../database");
const error_1 = require("../../error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryString = (0, pg_format_1.default)(`
	SELECT
		*
	FROM
		users
	WHERE
		email = %L
	`, loginData.email);
    const queryResult = yield database_1.client.query(queryString);
    const user = queryResult.rows[0];
    if (queryResult.rowCount == 0) {
        throw new error_1.AppError('Wrong email/password', 401);
    }
    const comparePassword = loginData.password == user.password;
    if (!comparePassword) {
        throw new error_1.AppError('Wrong email/password', 401);
    }
    if (!queryResult.rows[0].active) {
        throw new error_1.AppError('User inactive', 404);
    }
    const token = jsonwebtoken_1.default.sign({
        admin: user.admin
    }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN,
        subject: user.id.toString()
    });
    return { token };
});
exports.loginService = loginService;