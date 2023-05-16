import format from "pg-format";
import { TBuyCodesRequest, TCodes } from "../../interfaces/codes.interfaces";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import Rastreio from "../../entities/rastreio.entity";
import {Repository} from 'typeorm'


export const buyCodesService =async (token: string | undefined, id: number, codes: []):Promise<TCodes[]| any> => {

	

	const queryString1: string = `
	UPDATE users
		SET credits = credits - ${codes.length}
	WHERE
		id = ${id}
	`

	await AppDataSource.getRepository(Rastreio).query(queryString1)

	const queryString2: string = format(`
	UPDATE rastreio
		SET "userId" = ${id}
	WHERE 
		id IN (%L)
	RETURNING 
		"id","codigo","data_de_postagem","descricao_inicial","endereco_envio","data_last_review","ultima_descricao","endereco_final"
	;
	`,
	codes
	)

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await codesRepository.query(queryString2)

	return queryResult[0]
}