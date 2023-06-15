import { Repository } from "typeorm";
import { TCodes } from "../../interfaces/codes.interfaces";
import Rastreio from "../../entities/rastreio.entity";
import { AppDataSource } from "../../data-source";


export const listAllCodesService =async (token: string | undefined):Promise<TCodes[]> => {
	
	const queryString : string = `
	SELECT 'id',
	'data_de_postagem',
	'descricao_inicial',
	'endereco_envio',
	'data_last_review',
	'ultima_descricao',
	'endereco_final' 
	FROM rastreio
	ORDER BY 'data_de_postagem' ASC
	`

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await codesRepository.query(queryString)

	return queryResult
}