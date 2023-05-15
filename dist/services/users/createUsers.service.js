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
exports.createUsersService = void 0;
const pg_format_1 = __importDefault(require("pg-format"));
const database_1 = require("../../database");
const createUsersService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // userData.password = await bcrypt.hash(userData.password,8)
    const queryString = (0, pg_format_1.default)(`
	INSERT INTO
		users(%I)
	VALUES
		(%L)
	RETURNING
		"id","username","email","active"
	`, Object.keys(userData), Object.values(userData));
    const queryResult = yield database_1.client.query(queryString);
    return queryResult.rows[0];
});
exports.createUsersService = createUsersService;
