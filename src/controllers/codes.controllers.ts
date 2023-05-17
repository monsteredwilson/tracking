import { Request, Response } from "express";
import { TBuyCodesRequest, TCodes, TCodesCreate, TCodesResponse, TFilter } from "../interfaces/codes.interfaces";
import { showCodesService } from "../services/codes/showCodes.service";
import { buyCodesService } from "../services/codes/buyCodes.service";
import { retrieveCodesUserService } from "../services/codes/retrieveCodesUser.service";
import { createCodesService } from "../services/codes/createCodes.service";

export const showCodesController = async (request: Request, response: Response):Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const filter: TFilter = request.body

	const listCodes: TCodesResponse[] = await showCodesService(token, filter)

	return response.status(200).json(listCodes)
}


export const buyCodesController = async (request: Request, response: Response):Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const {id} = response.locals

	const {codes} = request.body

	const codesBuyed = await buyCodesService(token,id,codes)

	return response.status(200).json(codesBuyed)
}


export const retrieveCodesUserController = async (request: Request, response: Response):Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const {id} = response.locals

	const codes = await retrieveCodesUserService(token, id)

	return response.status(200).json(codes)
}


export const createCodesController =async (request: Request, response: Response):Promise<Response> => {
	
	const token: string | undefined = request.headers.authorization

	const { isAdmin } = response.locals

	const codeData: TCodesCreate = request.body

	const newCode: TCodes = await createCodesService(token, isAdmin, codeData)

	return response.status(200)
}