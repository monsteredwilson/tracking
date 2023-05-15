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
exports.deleteUserController = exports.sendCreditsUserController = exports.returnUserController = exports.retrieveUsersController = exports.createUsersController = void 0;
const createUsers_service_1 = require("../services/users/createUsers.service");
const retrieveUsers_service_1 = require("../services/users/retrieveUsers.service");
const returnUser_service_1 = require("../services/users/returnUser.service");
const sendCreditsUsers_service_1 = require("../services/users/sendCreditsUsers.service");
const deleteUsers_service_1 = require("../services/users/deleteUsers.service");
const createUsersController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = request.body;
    const newUser = yield (0, createUsers_service_1.createUsersService)(userData);
    return response.status(201).json(newUser);
});
exports.createUsersController = createUsersController;
const retrieveUsersController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    const { isAdmin } = response.locals;
    const users = yield (0, retrieveUsers_service_1.retrieveUsersService)(token, isAdmin);
    return response.status(200).json(users);
});
exports.retrieveUsersController = retrieveUsersController;
const returnUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    const { id } = response.locals;
    const user = yield (0, returnUser_service_1.returnUserService)(token, id);
    return response.status(200).json(user);
});
exports.returnUserController = returnUserController;
const sendCreditsUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    const { isAdmin } = response.locals;
    const id = parseInt(request.params.id);
    const credits = parseInt(request.body.credits);
    const user = yield (0, sendCreditsUsers_service_1.sendCreditsUserService)(token, isAdmin, id, credits);
    return response.status(200).json(user);
});
exports.sendCreditsUserController = sendCreditsUserController;
const deleteUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    const { isAdmin } = response.locals;
    const id = parseInt(request.params.id) != 1 ? parseInt(request.params.id) : 999999;
    yield (0, deleteUsers_service_1.deleteUserService)(token, isAdmin, id);
    return response.status(204).send();
});
exports.deleteUserController = deleteUserController;
