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
exports.showCodesService = void 0;
const database_1 = require("../../database");
const error_1 = require("../../error");
const showCodesService = (token, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const dataEnvio = filter.data_de_envio1;
    const dataEnvio2 = filter.data_de_envio2;
    const cidadeEnvio = filter.cidade_envio.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    const estadoEnvio = filter.estado_envio.toUpperCase();
    const cidadeFinal = filter.cidade_final.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    const estadoFinal = filter.estado_final.toUpperCase();
    const queryString = `
		SELECT
			"id", "data_de_postagem", "descricao_inicial", "endereco_envio", "data_last_review", "ultima_descricao", "endereco_final"
		FROM 
			rastreio
		WHERE
			("data_de_postagem" BETWEEN '${dataEnvio}%' AND '${dataEnvio2}%' OR
			"data_de_postagem" LIKE '${dataEnvio}%')
		AND
			("endereco_envio" LIKE '${cidadeEnvio}%')
		AND
			("endereco_final" LIKE '${cidadeFinal}%')
		ORDER BY "data_de_postagem" DESC	
	`;
    const queryResult = yield database_1.client.query(queryString);
    if (queryResult.rowCount == 0) {
        throw new error_1.AppError('Code not found, try again with another date or place', 404);
    }
    return queryResult.rows;
});
exports.showCodesService = showCodesService;
