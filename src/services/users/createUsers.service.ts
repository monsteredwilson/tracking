import format from "pg-format";
import { TUsers, TUsersRequest, TUsersResponse } from "../../interfaces/users.interfaces";
import * as bcrypt from 'bcryptjs'
import { QueryResult } from "pg";
import { client } from "../../database";


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

	const queryResult: QueryResult<TUsersResponse> = await client.query(queryString)

	return queryResult.rows[0]
}