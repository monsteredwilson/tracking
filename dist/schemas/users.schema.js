"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditsSchemaRequest = exports.usersSchemaResponse = exports.usersSchemaRequest = exports.usersSchema = void 0;
const zod_1 = require("zod");
exports.usersSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string().max(20),
    email: zod_1.z.string().email().max(45),
    password: zod_1.z.string().min(8).max(120),
    admin: zod_1.z.boolean().default(false),
    credits: zod_1.z.number().int(),
    active: zod_1.z.boolean().default(true)
});
exports.usersSchemaRequest = exports.usersSchema.omit({ id: true, credits: true, admin: true, active: true });
exports.usersSchemaResponse = exports.usersSchema.omit({ password: true, admin: true });
exports.creditsSchemaRequest = exports.usersSchema.pick({ credits: true });
