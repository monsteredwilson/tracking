
import { TUsers, TUsersRequest, TUsersResponse } from "../../interfaces/users.interfaces";
import {Repository} from 'typeorm'
import { AppDataSource } from "../../data-source";
import User from "../../entities/users.entity";


export const deleteUserService =async (token: string | undefined, isAdmin: boolean, id: number): Promise<TUsersResponse> => {
	
	const queryString: string = `
	UPDATE
		users
	SET
		active = false
	WHERE
		id = ${id}
	`

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)
	queryResult

	return queryResult[0]
}