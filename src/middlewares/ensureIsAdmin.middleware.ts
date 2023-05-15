import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

export const ensureIsAdminMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const {isAdmin} = response.locals

	if(!isAdmin){
		throw new AppError("Insufficient Permission", 403)
	}

	return next()
}