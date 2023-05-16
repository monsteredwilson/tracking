import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";
import { TUsersResponse } from "../interfaces/users.interfaces";
import { TCodes } from "../interfaces/codes.interfaces";
import format from "pg-format";
import { AppDataSource } from "../data-source";
import {Repository} from 'typeorm'
import Rastreio from "../entities/rastreio.entity";

export const ensureCodesExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const {codes} = request.body

	const queryString: string = format(`
	SELECT * 
	FROM
		rastreio
	WHERE 
		id IN (%L)
	`,codes)

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await codesRepository.query(queryString)

	if(queryResult.length != codes.length){
		throw new AppError("Some code not found", 404)
	}

	return next()
}