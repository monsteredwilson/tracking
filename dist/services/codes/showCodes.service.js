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
exports.showCodesService = void 0;
const error_1 = require("../../error");
const rastreio_entity_1 = __importDefault(require("../../entities/rastreio.entity"));
const data_source_1 = require("../../data-source");
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
    const codesRepository = data_source_1.AppDataSource.getRepository(rastreio_entity_1.default);
    const queryResult = yield codesRepository.query(queryString);
    if (queryResult.length == 0) {
        throw new error_1.AppError('Code not found, try again with another date or place', 404);
    }
    return queryResult;
});
exports.showCodesService = showCodesService;
