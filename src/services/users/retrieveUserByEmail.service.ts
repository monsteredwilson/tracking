
import { TUsersResponse } from "../../interfaces/users.interfaces";
import {Repository} from 'typeorm'
import User from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";
import format from 'pg-format'

export const retrieveUserByEmailService = async (token: string | undefined, isAdmin: boolean, email: string): Promise<TUsersResponse> => {

	console.log(email)

	const queryString = format(`
	SELECT 
		"id", "username", "email", "admin" ,"credits", "active"
	FROM 
		users
	WHERE
		email = (%L)
	`,email)

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)

	return queryResult
}