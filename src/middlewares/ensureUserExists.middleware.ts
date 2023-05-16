import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { AppDataSource } from "../data-source";
import {Repository} from 'typeorm'
import User from "../entities/users.entity";

export const ensureUserExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const id = request.params.id

	const queryString: string = `
	SELECT * 
	FROM
		users
	WHERE 
		id = ${id}
	`
	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)

	if(queryResult.length == 0){
		throw new AppError("User not found", 404)
	}

	return next()
}