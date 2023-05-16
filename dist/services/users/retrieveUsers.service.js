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
exports.retrieveUsersService = void 0;
const users_entity_1 = __importDefault(require("../../entities/users.entity"));
const data_source_1 = require("../../data-source");
const retrieveUsersService = (token, isAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    const queryString = `
	SELECT 
		"id", "username", "email", "admin" ,"credits", "active"
	FROM 
		users
	`;
    const userRepository = data_source_1.AppDataSource.getRepository(users_entity_1.default);
    const queryResult = yield userRepository.query(queryString);
    return queryResult;
});
exports.retrieveUsersService = retrieveUsersService;
