import { Router } from "express";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { buyCodesController, createCodesController, retrieveCodesUserController, retrieveNumberRowsCodesController, showCodesController } from "../controllers/codes.controllers";
import { validateDataMiddleware } from "../middlewares/validate.middleware";
import { buyCodeSchemaRequest, codeSchemaCreate, filterSchema } from "../schemas/codes.schema";
import { verifyCreditsMiddleware } from "../middlewares/verifyCredits.middleware";
import { ensureCodesExistsMiddleware } from "../middlewares/ensureCodesExists.middleware";
import { ensureCodesNotBoughtMiddleware } from "../middlewares/ensureCodesNotBought.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureCodeNotCreatedMiddleware } from "../middlewares/ensureCodeNotCreated.middleware";

export const codesRoutes: Router = Router()

codesRoutes.post('', validateDataMiddleware(filterSchema),ensureTokenIsValidMiddleware, showCodesController)

codesRoutes.patch('',validateDataMiddleware(buyCodeSchemaRequest),ensureTokenIsValidMiddleware, ensureCodesExistsMiddleware, ensureCodesNotBoughtMiddleware, verifyCreditsMiddleware, buyCodesController)

codesRoutes.get('', ensureTokenIsValidMiddleware, retrieveCodesUserController)

codesRoutes.post('/create',validateDataMiddleware(codeSchemaCreate), ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureCodeNotCreatedMiddleware, createCodesController)

codesRoutes.get('/rows', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, retrieveNumberRowsCodesController)