import format from "pg-format";
import { TBuyCodesRequest, TCodes } from "../../interfaces/codes.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { TUsersResponse } from "../../interfaces/users.interfaces";


export const buyCodesService =async (token: string | undefined, id: number, codes: []):Promise<TCodes[]| any> => {

	console.log(id)
	console.log(codes)

	const queryString1: string = `
	UPDATE users
		SET credits = credits - ${codes.length}
	WHERE
		id = ${id}
	`

	await client.query(queryString1)

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

	const queryResult: QueryResult<TCodes> = await client.query(queryString2)

	return queryResult.rows
}