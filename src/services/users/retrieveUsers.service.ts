
import { TUsersResponse } from "../../interfaces/users.interfaces";
import {Repository} from 'typeorm'
import User from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";

export const retrieveUsersService = async (token: string | undefined, isAdmin: boolean): Promise<TUsersResponse[]> => {

	const queryString = `
	SELECT 
		"id", "username", "email","password", "admin" ,"credits", "active"
	FROM 
		users
	`

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)

	return queryResult
}