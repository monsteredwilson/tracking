
import { TCodes } from "../../interfaces/codes.interfaces"
import { Repository } from 'typeorm'
import Rastreio from "../../entities/rastreio.entity"
import { AppDataSource } from "../../data-source"
import format from 'pg-format'
import User from "../../entities/users.entity"


export const retrieveCodesByEmailService = async (token: string | undefined, email: string, isAdmin: boolean): Promise<TCodes[]> => {

	const queryString1: string = format(`
	SELECT
		"id"
	FROM
		users
	WHERE 
		email = (%L)
	`, email)

	const userRepository: Repository<User> = AppDataSource.getRepository(User)

	const id = await userRepository.query(queryString1)

	const queryString2: string = `
	SELECT 
		"id","codigo","data_de_postagem","descricao_inicial","endereco_envio","data_last_review","ultima_descricao","endereco_final"
	FROM 
		rastreio
	WHERE
		"userId" = ${id.id}
	`

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await codesRepository.query(queryString2)

	return queryResult
}