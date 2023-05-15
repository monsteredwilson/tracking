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
exports.returnUserService = void 0;
const database_1 = require("../../database");
const returnUserService = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryString = `
		SELECT 
			"id","username","email","credits"
		FROM
			users
		WHERE
			id = $1
	`;
    const queryConfig = {
        text: queryString,
        values: [id]
    };
    const queryResult = yield database_1.client.query(queryConfig);
    return queryResult.rows[0];
});
exports.returnUserService = returnUserService;
