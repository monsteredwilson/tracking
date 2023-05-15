import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { TUsersResponse } from "../interfaces/users.interfaces";
import { client } from "../database";
import { AppError } from "../error";

export const verifyCreditsMiddleware =async (request: Request, response:Response, next: NextFunction): Promise<Response|void> => {
	
	const {id} = response.locals
	const {codes} = request.body

	const queryString: string = `
	SELECT *
	FROM
		users
	WHERE id = ${id}
	`

	const queryResult: QueryResult<TUsersResponse> = await client.query(queryString)

	if(queryResult.rows[0].credits < codes.length){
		throw new AppError('Insufficient credits', 401)
	}

	return next()


}