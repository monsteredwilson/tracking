
import { TCodes } from "../../interfaces/codes.interfaces"
import { Repository } from 'typeorm'
import Rastreio from "../../entities/rastreio.entity"
import { AppDataSource } from "../../data-source"


export const retrieveNumberRowsCodesService = async (token: string | undefined, id: number): Promise<number> => {

	// const queryString: string = `
	// SELECT 
	// 	*
	// FROM 
	// 	rastreio
	// `

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)

	const queryResult = await codesRepository.count()

	return queryResult
}