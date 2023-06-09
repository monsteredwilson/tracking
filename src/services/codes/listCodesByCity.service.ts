import { Repository } from "typeorm";
import { TCodes, TCodesResponse } from "../../interfaces/codes.interfaces";
import Rastreio from "../../entities/rastreio.entity";
import { AppDataSource } from "../../data-source";


export const listCodesByCityService =async (token: string | undefined, city: string):Promise<TCodesResponse[]> => {

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio)
	
	const queryBuilder = codesRepository.createQueryBuilder('rastreio');
	queryBuilder.select([
		'rastreio.id',
		'rastreio.data_de_postagem',
		'rastreio.descricao_inicial',
		'rastreio.endereco_envio',
		'rastreio.data_last_review',
		'rastreio.ultima_descricao',
		'rastreio.endereco_final',
	]);

	queryBuilder.where('rastreio.userId IS NULL');

	queryBuilder.andWhere(`rastreio.endereco_final LIKE '%${city}'`)

	queryBuilder.orderBy('rastreio.data_de_postagem', 'DESC');

	queryBuilder.take(500)

	const queryResult: TCodesResponse[] | any = await queryBuilder.getMany();

	// const queryResult = await codesRepository.query(queryString)

	return queryResult
}