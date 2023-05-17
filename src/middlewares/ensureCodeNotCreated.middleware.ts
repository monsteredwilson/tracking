import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";
import { TUsersResponse } from "../interfaces/users.interfaces";
import { TCodes } from "../interfaces/codes.interfaces";
import format from "pg-format";
import { AppDataSource } from "../data-source";
import {Repository} from 'typeorm'
import Rastreio from "../entities/rastreio.entity";

export const ensureCodeNotCreatedMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	const {code} = request.body.code

	const queryString: string = format(`
	SELECT * 
	FROM
		rastreio
	WHERE 
		codigo = (%L)
	`,code)

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await codesRepository.query(queryString)

	if(queryResult.length != 0){
		throw new AppError("Code already created", 409)
	}

	return next()
}