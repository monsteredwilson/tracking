import { QueryConfig, QueryResult } from "pg";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import {Repository} from 'typeorm'
import User from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";

export const returnUserService =async (token: string | undefined, id: number): Promise<TUsersResponse> => {

	const queryString = `
		SELECT 
			"id","username","email","credits"
		FROM
			users
		WHERE
			id = $1
	`

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [id]
	}

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryConfig as any)
	
	return queryResult[0]
}