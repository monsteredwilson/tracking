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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCreditsMiddleware = void 0;
const database_1 = require("../database");
const error_1 = require("../error");
const verifyCreditsMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = response.locals;
    const { codes } = request.body;
    const queryString = `
	SELECT *
	FROM
		users
	WHERE id = ${id}
	`;
    const queryResult = yield database_1.client.query(queryString);
    if (queryResult.rows[0].credits < codes.length) {
        throw new error_1.AppError('Insufficient credits', 401);
    }
    return next();
});
exports.verifyCreditsMiddleware = verifyCreditsMiddleware;
