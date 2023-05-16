
import { TUsersResponse } from "../../interfaces/users.interfaces"
import { AppDataSource } from "../../data-source"
import {Repository} from 'typeorm'
import User from "../../entities/users.entity"

export const sendCreditsUserService =async (token: string | undefined, isAdmin: boolean, id: number, credits: number): Promise<TUsersResponse> => {
	
	const queryString: string = `
	UPDATE users
		SET credits = CASE WHEN credits + ${credits} >= 0 THEN credits + ${credits} ELSE 0 END
	WHERE
		id = ${id}
	RETURNING 
		"id", "username", "email", "credits", "active"
	;
	`

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)

	return queryResult[0]
}