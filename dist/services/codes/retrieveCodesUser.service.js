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
exports.retrieveCodesUserService = void 0;
const database_1 = require("../../database");
const retrieveCodesUserService = (token, id) => __awaiter(void 0, void 0, void 0, function* () {
    const queryString = `
	SELECT 
		"id","codigo","data_de_postagem","descricao_inicial","endereco_envio","data_last_review","ultima_descricao","endereco_final"
	FROM 
		rastreio
	WHERE
		"userId" = ${id}
	`;
    const queryResult = yield database_1.client.query(queryString);
    return queryResult.rows;
});
exports.retrieveCodesUserService = retrieveCodesUserService;
