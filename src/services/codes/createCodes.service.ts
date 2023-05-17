import format from "pg-format";
import { TBuyCodesRequest, TCodes, TCodesCreate } from "../../interfaces/codes.interfaces";
import { TUsersResponse } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import Rastreio from "../../entities/rastreio.entity";
import {Repository} from 'typeorm'


export const createCodesService =async (token: string | undefined, isAdmin: boolean, codeData: TCodesCreate):Promise<TCodes | any> => {


	const queryString: string = `
	INSERT INTO 
		rastreio ("codigo", "data_de_postagem", "descricao_inicial","endereco_envio","data_last_review","ultima_descricao", "endereco_final")
	VALUES
		(${codeData.code}, ${codeData.data_de_postagem}, ${codeData.descricao_inicial}, ${codeData.endereco_envio}, ${codeData.data_last_review}, ${codeData.ultima_descricao}, ${codeData.endereco_final})
	RETURNING *
	`

	const rastreioRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await rastreioRepository.query(queryString)

	return queryResult[0]
}