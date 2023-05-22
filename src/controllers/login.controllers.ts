import { Request, Response} from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interfaces";
import { loginService } from "../services/login/login.service";

export const loginController =async (request: Request, response: Response): Promise<Response> => {
	
	const loginData: TLoginRequest = request.body

	const responseLogin: TLoginResponse = await loginService(loginData)

	return response.status(200).json(responseLogin)
}