"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyCodeSchemaRequest = exports.filterSchema = exports.codeSchemaResponse = exports.codeSchemaRequest = exports.codeSchemaView = exports.codeSchema = void 0;
const zod_1 = require("zod");
exports.codeSchema = zod_1.z.object({
    id: zod_1.z.number(),
    code: zod_1.z.string().max(14),
    data_de_postagem: zod_1.z.string().max(20),
    descricao_inicial: zod_1.z.string().max(100),
    endereco_envio: zod_1.z.string().max(100),
    data_last_review: zod_1.z.string().max(20),
    ultima_descricao: zod_1.z.string().max(100),
    endereco_final: zod_1.z.string().max(100),
    userId: zod_1.z.number().nullish()
});
exports.codeSchemaView = exports.codeSchema.omit({ code: true, userId: true });
exports.codeSchemaRequest = exports.codeSchema.pick({ id: true });
exports.codeSchemaResponse = exports.codeSchema.omit({ userId: true });
exports.filterSchema = zod_1.z.object({
    data_de_envio1: zod_1.z.string().min(10).max(10),
    data_de_envio2: zod_1.z.string().min(10).max(10),
    cidade_envio: zod_1.z.string().max(100),
    estado_envio: zod_1.z.string().min(2).max(2),
    cidade_final: zod_1.z.string().max(100),
    estado_final: zod_1.z.string().min(2).max(2)
});
exports.buyCodeSchemaRequest = zod_1.z.object({
    codes: zod_1.z.array(zod_1.z.string())
});
