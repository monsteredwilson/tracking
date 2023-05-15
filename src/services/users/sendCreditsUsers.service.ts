import { QueryConfig, QueryResult } from "pg"
import format from "pg-format"
import { TUsersResponse } from "../../interfaces/users.interfaces"
import { client } from "../../database"

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

	const queryResult: QueryResult<TUsersResponse> = await client.query(queryString)

	return queryResult.rows[0]
}