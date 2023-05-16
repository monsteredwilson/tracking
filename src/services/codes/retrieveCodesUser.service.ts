
import { TCodes } from "../../interfaces/codes.interfaces"
import { Repository } from 'typeorm'
import Rastreio from "../../entities/rastreio.entity"
import { AppDataSource } from "../../data-source"


export const retrieveCodesUserService = async (token: string | undefined, id: number): Promise<TCodes[]> => {

	const queryString: string = `
	SELECT 
		"id","codigo","data_de_postagem","descricao_inicial","endereco_envio","data_last_review","ultima_descricao","endereco_final"
	FROM 
		rastreio
	WHERE
		"userId" = ${id}
	`

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await codesRepository.query(queryString)

	return queryResult
}