import { Request, Response } from "express"
import { TUsers, TUsersRequest, TUsersResponse } from "../interfaces/users.interfaces"
import { createUsersService } from "../services/users/createUsers.service"
import { retrieveUsersService } from "../services/users/retrieveUsers.service"
import { returnUserService } from "../services/users/returnUser.service"
import { sendCreditsUserService } from "../services/users/sendCreditsUsers.service"
import { deleteUserService } from "../services/users/deleteUsers.service"
import { retrieveUserByEmailService } from "../services/users/retrieveUserByEmail.service"

export const createUsersController = async (request: Request, response: Response): Promise<Response> => {

	const userData: TUsersRequest = request.body

	const newUser: TUsersResponse = await createUsersService(userData)

	return response.status(201).json(newUser)
}


export const retrieveUsersController = async (request: Request, response: Response): Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const { isAdmin } = response.locals

	const users: TUsersResponse[] = await retrieveUsersService(token, isAdmin)

	return response.status(200).json(users)
}

export const retrieveUserByEmailController =async (request: Request, response: Response): Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const { isAdmin } = response.locals

	const email = request.params.email

	const user: TUsersResponse = await retrieveUserByEmailService(token, isAdmin, email)
	
	return response.status(200).json(user)
}


export const returnUserController = async (request: Request, response: Response): Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const { id } = response.locals

	const user: TUsersResponse = await returnUserService(token, id)

	return response.status(200).json(user)
}

export const sendCreditsUserController = async (request: Request, response: Response): Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const { isAdmin } = response.locals

	const id = parseInt(request.params.id)

	const credits: number = parseInt(request.body.credits)

	const user: TUsersResponse = await sendCreditsUserService(token, isAdmin, id, credits)

	return response.status(200).json(user)
}

export const deleteUserController = async (request: Request, response: Response): Promise<Response> => {

	const token: string | undefined = request.headers.authorization

	const { isAdmin } = response.locals

	const id = parseInt(request.params.id) != 1? parseInt(request.params.id) : 999999

	await deleteUserService(token, isAdmin, id)

	return response.status(204).send()
}