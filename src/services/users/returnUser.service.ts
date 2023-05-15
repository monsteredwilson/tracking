import { QueryConfig, QueryResult } from "pg";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";


export const returnUserService =async (token: string | undefined, id: number): Promise<TUsersResponse> => {

	const queryString: string = `
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

	const queryResult: QueryResult<TUsersResponse> = await client.query(queryConfig)
	
	return queryResult.rows[0]
}