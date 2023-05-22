import format from "pg-format";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interfaces";
import { AppError } from "../../error";
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../../data-source";
import {Repository} from 'typeorm'
import User from "../../entities/users.entity";

export const loginService =async (loginData: TLoginRequest): Promise<TLoginResponse> => {
	
	const queryString: string = format(`
	SELECT
		*
	FROM
		users
	WHERE
		email = %L
	`, loginData.email)

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const queryResult = await userRepository.query(queryString)

	
	const user = queryResult[0]
	

	if(queryResult.length == 0){
		throw new AppError('Wrong email/password', 401)
	}

	const comparePassword = loginData.password == user.password

	if(!comparePassword){
		throw new AppError('Wrong email/password', 401)
	}

	if(!queryResult[0].active){
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

	const responseLogin = {
		token: token,
		userId: user.id,
		admin: user.admin
	}

	return responseLogin
}