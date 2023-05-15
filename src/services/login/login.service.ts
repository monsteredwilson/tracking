import format from "pg-format";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import { QueryResult } from "pg";
import { TUsers } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import jwt from 'jsonwebtoken'


export const loginService =async (loginData: TLoginRequest): Promise<TLoginResponse> => {
	
	const queryString: string = format(`
	SELECT
		*
	FROM
		users
	WHERE
		email = %L
	`, loginData.email)

	const queryResult: QueryResult<TUsers> = await client.query(queryString)

	const user = queryResult.rows[0]

	if(queryResult.rowCount == 0){
		throw new AppError('Wrong email/password', 401)
	}

	const comparePassword = loginData.password == user.password

	if(!comparePassword){
		throw new AppError('Wrong email/password', 401)
	}

	if(!queryResult.rows[0].active){
		throw new AppError('User inactive', 404)
	}

	const token: string = jwt.sign(
		{
			admin: user.admin
		},
		process.env.SECRET_KEY!,
		{
			expiresIn: process.env.EXPIRES_IN!,
			subject: user.id.toString()
		}
	)

	return {token}
}