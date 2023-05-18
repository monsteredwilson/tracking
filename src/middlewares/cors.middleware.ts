import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";
import { TUsersResponse } from "../interfaces/users.interfaces";
import { TCodes } from "../interfaces/codes.interfaces";
import format from "pg-format";
import { AppDataSource } from "../data-source";
import {Repository} from 'typeorm'
import Rastreio from "../entities/rastreio.entity";
import cors from 'cors'

export const corsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {

	cors()

	return next()
}