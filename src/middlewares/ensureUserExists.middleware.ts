import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryResult } from "pg";
import { TUsersResponse } from "../interfaces/users.interfaces";
import { client } from "../database";

export const ensureUserExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const id = request.params.id

	const queryString: string = `
	SELECT * 
	FROM
		users
	WHERE 
		id = ${id}
	`

	const queryResult: QueryResult<TUsersResponse> = await client.query(queryString)

	if(queryResult.rowCount == 0){
		throw new AppError("User not found", 404)
	}

	return next()
}