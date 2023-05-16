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
exports.CreateTables1684261127543 = void 0;
class CreateTables1684261127543 {
    constructor() {
        this.name = 'CreateTables1684261127543';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "codes_processed" ("codigos" character varying(14) NOT NULL, CONSTRAINT "PK_5d967794c783721e34b014d417b" PRIMARY KEY ("codigos"))`);
            yield queryRunner.query(`ALTER TABLE "codes_to_process" ALTER COLUMN "codigos" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "codes_to_process" ADD CONSTRAINT "PK_245705c9ad3202e001ea0856ebb" PRIMARY KEY ("codigos")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "codes_to_process" DROP CONSTRAINT "PK_245705c9ad3202e001ea0856ebb"`);
            yield queryRunner.query(`ALTER TABLE "codes_to_process" ALTER COLUMN "codigos" DROP NOT NULL`);
            yield queryRunner.query(`DROP TABLE "codes_processed"`);
        });
    }
}
exports.CreateTables1684261127543 = CreateTables1684261127543;
