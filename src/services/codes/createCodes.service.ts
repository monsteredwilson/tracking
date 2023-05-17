import format from "pg-format";
import { TBuyCodesRequest, TCodes, TCodesCreate } from "../../interfaces/codes.interfaces";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import Rastreio from "../../entities/rastreio.entity";
import {Repository} from 'typeorm'


export const createCodesService =async (token: string | undefined, isAdmin: boolean, codeData: TCodesCreate):Promise<TCodes > => {

	// const data_de_postagem = String(codeData.data_de_postagem.toString())
	// const data_last_review = String(codeData.data_last_review.toString())


	const queryString: string = format(`
	INSERT INTO 
		rastreio ("codigo", "data_de_postagem", "descricao_inicial","endereco_envio","data_last_review","ultima_descricao", "endereco_final")
	VALUES
		(%L)
	RETURNING *
	`,
	Object.values(codeData))

	const rastreioRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await rastreioRepository.query(queryString)

	return queryResult[0]
}