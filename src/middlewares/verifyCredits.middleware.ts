import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { AppDataSource } from "../data-source";
import {Repository} from 'typeorm'
import User from "../entities/users.entity";

export const verifyCreditsMiddleware =async (request: Request, response:Response, next: NextFunction): Promise<Response|void> => {
	
	const {id} = response.locals
	const {codes} = request.body

	const queryString: string = `
	SELECT *
	FROM
		users
	WHERE id = ${id}
	`

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)

	if(queryResult[0].credits < codes.length){
		throw new AppError('Insufficient credits', 401)
	}

	return next()


}