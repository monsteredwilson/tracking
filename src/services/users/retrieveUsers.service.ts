import { QueryConfig, QueryResult } from "pg";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";

export const retrieveUsersService = async (token: string | undefined, isAdmin: boolean): Promise<TUsersResponse[]> => {

	const queryString = `
	SELECT 
		"id", "username", "email", "admin" ,"credits", "active"
	FROM 
		users
	`

	const queryResult: QueryResult<TUsersResponse> = await client.query(queryString)

	return queryResult.rows
}