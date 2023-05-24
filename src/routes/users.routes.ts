import { Router } from "express";
import { createUsersController, deleteUserController, retrieveUserByEmailController, retrieveUsersController, returnUserController, sendCreditsUserController } from "../controllers/users.controllers";
import { validateDataMiddleware } from "../middlewares/validate.middleware";
import { creditsSchemaRequest, usersSchemaRequest } from "../schemas/users.schema";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensureUserIsActiveMiddleware } from "../middlewares/ensureUserIsActive.middleware";

export const userRoutes: Router = Router()

userRoutes.post('',validateDataMiddleware(usersSchemaRequest),createUsersController)
userRoutes.get('', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, retrieveUsersController)
userRoutes.get('/profile', ensureTokenIsValidMiddleware, returnUserController)
userRoutes.post('/email', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, retrieveUserByEmailController)
userRoutes.patch('/credits/:id', validateDataMiddleware(creditsSchemaRequest),ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureUserExistsMiddleware, sendCreditsUserController)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, ensureUserExistsMiddleware, ensureUserIsActiveMiddleware, deleteUserController)