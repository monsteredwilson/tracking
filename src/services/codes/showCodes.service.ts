import { QueryResult } from "pg";
import { TCodesResponse, TFilter } from "../../interfaces/codes.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";

export const showCodesService =async (token: string | undefined, filter: TFilter): Promise<TCodesResponse[]> => {

	const dataEnvio = filter.data_de_envio1
	const dataEnvio2 = filter.data_de_envio2
	const cidadeEnvio = filter.cidade_envio.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
	const estadoEnvio = filter.estado_envio.toUpperCase()
	const cidadeFinal = filter.cidade_final.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
	const estadoFinal = filter.estado_final.toUpperCase()
	
	const queryString: string = `
		SELECT
			"id", "data_de_postagem", "descricao_inicial", "endereco_envio", "data_last_review", "ultima_descricao", "endereco_final"
		FROM 
			rastreio
		WHERE
			("data_de_postagem" BETWEEN '${dataEnvio}%' AND '${dataEnvio2}%' OR
			"data_de_postagem" LIKE '${dataEnvio}%')
		AND
			("endereco_envio" LIKE '${cidadeEnvio}%')
		AND
			("endereco_final" LIKE '${cidadeFinal}%')
		ORDER BY "data_de_postagem" DESC	
	`

	const queryResult: QueryResult<TCodesResponse> = await client.query(queryString)

	if (queryResult.rowCount == 0){
		throw new AppError('Code not found, try again with another date or place', 404)
	}

	return queryResult.rows
}