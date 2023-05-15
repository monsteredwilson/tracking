import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";
import { TUsersResponse } from "../interfaces/users.interfaces";
import { client } from "../database";
import { TCodes } from "../interfaces/codes.interfaces";
import format from "pg-format";

export const ensureCodesNotBoughtMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const {codes} = request.body

	const queryString: string = format(`
	SELECT * 
	FROM
		rastreio
	WHERE 
		id IN (%L)
	`,codes)

	const queryResult: QueryResult<TCodes> = await client.query(queryString)

	console.log(queryResult)

	if(queryResult.rows[0].userId != null){
		throw new AppError("Some code already bought", 409)
	}

	return next()
}