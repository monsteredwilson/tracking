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
exports.retrieveCodesUserController = exports.buyCodesController = exports.showCodesController = void 0;
const showCodes_service_1 = require("../services/codes/showCodes.service");
const buyCodes_service_1 = require("../services/codes/buyCodes.service");
const retrieveCodesUser_service_1 = require("../services/codes/retrieveCodesUser.service");
const showCodesController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    const filter = request.body;
    const listCodes = yield (0, showCodes_service_1.showCodesService)(token, filter);
    return response.status(200).json(listCodes);
});
exports.showCodesController = showCodesController;
const buyCodesController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    const { id } = response.locals;
    const { codes } = request.body;
    const codesBuyed = yield (0, buyCodes_service_1.buyCodesService)(token, id, codes);
    return response.status(200).json(codesBuyed);
});
exports.buyCodesController = buyCodesController;
const retrieveCodesUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.authorization;
    const { id } = response.locals;
    const codes = yield (0, retrieveCodesUser_service_1.retrieveCodesUserService)(token, id);
    return response.status(200).json(codes);
});
exports.retrieveCodesUserController = retrieveCodesUserController;
