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
exports.ensureUserExistsMiddleware = void 0;
const error_1 = require("../error");
const database_1 = require("../database");
const ensureUserExistsMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const queryString = `
	SELECT * 
	FROM
		users
	WHERE 
		id = ${id}
	`;
    const queryResult = yield database_1.client.query(queryString);
    if (queryResult.rowCount == 0) {
        throw new error_1.AppError("User not found", 404);
    }
    return next();
});
exports.ensureUserExistsMiddleware = ensureUserExistsMiddleware;
