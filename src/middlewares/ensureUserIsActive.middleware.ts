import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryResult } from "pg";
import { TUsersResponse } from "../interfaces/users.interfaces";
import { client } from "../database";

export const ensureUserIsActiveMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const id = request.params.id

	const queryString: string = `
	SELECT * 
	FROM
		users
	WHERE 
		id = ${id}
	`

	const queryResult: QueryResult<TUsersResponse> = await client.query(queryString)

	if(!queryResult.rows[0].active){
		throw new AppError("User inactive", 404)
	}

	return next()
}