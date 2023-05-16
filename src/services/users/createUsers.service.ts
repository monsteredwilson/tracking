import format from "pg-format";
import { TUsers, TUsersRequest, TUsersResponse } from "../../interfaces/users.interfaces";
import { Repository } from 'typeorm'
import User from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";


export const createUsersService =async (userData: TUsersRequest): Promise<TUsersResponse> => {
	
	// userData.password = await bcrypt.hash(userData.password,8)

	const queryString: string = format(`
	INSERT INTO
		users(%I)
	VALUES
		(%L)
	RETURNING
		"id","username","email","active"
	`,
	Object.keys(userData),
	Object.values(userData)
	)

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)

	return queryResult[0]
}