import format from "pg-format";
import { TUsers, TUsersRequest, TUsersResponse } from "../../interfaces/users.interfaces";
import * as bcrypt from 'bcryptjs'
import { QueryResult } from "pg";
import { client } from "../../database";


export const deleteUserService =async (token: string | undefined, isAdmin: boolean, id: number): Promise<TUsersResponse> => {
	
	const queryString: string = `
	UPDATE
		users
	SET
		active = false
	WHERE
		id = ${id}
	`

	const queryResult: QueryResult<TUsersResponse> = await client.query(queryString)
	queryResult

	return queryResult.rows[0]
}