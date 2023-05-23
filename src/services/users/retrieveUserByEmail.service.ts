
import { TUsersResponse } from "../../interfaces/users.interfaces";
import {Repository} from 'typeorm'
import User from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";

export const retrieveUserByEmailService = async (token: string | undefined, isAdmin: boolean, email: string): Promise<TUsersResponse> => {

	const queryString = `
	SELECT 
		"id", "username", "email", "admin" ,"credits", "active"
	FROM 
		users
	WHERE
		email = ${email}
	`

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)

	return queryResult[0]
}