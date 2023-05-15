import { Router } from "express";
import { loginController } from "../controllers/login.controllers";
import { validateDataMiddleware } from "../middlewares/validate.middleware";
import { loginSchemaRequest } from "../schemas/login.schema";
import { ensureUserIsActiveMiddleware } from "../middlewares/ensureUserIsActive.middleware";

export const loginRoutes: Router = Router()

loginRoutes.post('', validateDataMiddleware(loginSchemaRequest), loginController)