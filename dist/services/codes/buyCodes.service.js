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
exports.buyCodesService = void 0;
const pg_format_1 = __importDefault(require("pg-format"));
const data_source_1 = require("../../data-source");
const rastreio_entity_1 = __importDefault(require("../../entities/rastreio.entity"));
const buyCodesService = (token, id, codes) => __awaiter(void 0, void 0, void 0, function* () {
   
    const queryString1 = `
	UPDATE users
		SET credits = credits - ${codes.length}
	WHERE
		id = ${id}
	`;
    yield data_source_1.AppDataSource.getRepository(rastreio_entity_1.default).query(queryString1);
    const queryString2 = (0, pg_format_1.default)(`
	UPDATE rastreio
		SET "userId" = ${id}
	WHERE 
		id IN (%L)
	RETURNING 
		"id","codigo","data_de_postagem","descricao_inicial","endereco_envio","data_last_review","ultima_descricao","endereco_final"
	;
	`, codes);
    const codesRepository = data_source_1.AppDataSource.getRepository(rastreio_entity_1.default);
    const queryResult = yield codesRepository.query(queryString2);
    return queryResult[0];
});
exports.buyCodesService = buyCodesService;
