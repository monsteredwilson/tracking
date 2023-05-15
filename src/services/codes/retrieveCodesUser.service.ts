import { QueryResult } from "pg"
import { TCodes } from "../../interfaces/codes.interfaces"
import { client } from "../../database"



export const retrieveCodesUserService = async (token: string | undefined, id: number): Promise<TCodes[]> => {

	const queryString: string = `
	SELECT 
		"id","codigo","data_de_postagem","descricao_inicial","endereco_envio","data_last_review","ultima_descricao","endereco_final"
	FROM 
		rastreio
	WHERE
		"userId" = ${id}
	`

	const queryResult: QueryResult<TCodes> = await client.query(queryString)

	return queryResult.rows
}