import { Router } from "express";
import { createUsersController, deleteUserController, retrieveUsersController, returnUserController, sendCreditsUserController } from "../controllers/users.controllers";
import { validateDataMiddleware } from "../middlewares/validate.middleware";
import { creditsSchemaRequest, usersSchemaRequest } from "../schemas/users.schema";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensureUserIsActiveMiddleware } from "../middlewares/ensureUserIsActive.middleware";
import { corsMiddleware } from "../middlewares/cors.middleware";

export const userRoutes: Router = Router()

userRoutes.post('', corsMiddleware,validateDataMiddleware(usersSchemaRequest),createUsersController)
userRoutes.get('', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, retrieveUsersController)
userRoutes.get('/profile', ensureTokenIsValidMiddleware, returnUserController)
userRoutes.patch('/credits/:id', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureUserExistsMiddleware, sendCreditsUserController)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureUserExistsMiddleware, ensureUserIsActiveMiddleware, deleteUserController)