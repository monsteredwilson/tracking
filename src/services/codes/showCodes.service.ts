import { TCodesResponse, TFilter } from "../../interfaces/codes.interfaces";
import { AppError } from "../../error";
import { Repository } from 'typeorm'
import Rastreio from "../../entities/rastreio.entity";
import { AppDataSource } from "../../data-source";

export const showCodesService = async (token: string | undefined, filter: TFilter): Promise<TCodesResponse[]> => {
	const dataEnvio = filter.data_de_envio1;
	const dataEnvio2 = filter.data_de_envio2;
	const cidadeEnvio = filter.cidade_envio.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
	const estadoEnvio = filter.estado_envio.toUpperCase();
	const cidadeFinal = filter.cidade_final.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
	const estadoFinal = filter.estado_final.toUpperCase();

	const codesRepository: Repository<Rastreio> = AppDataSource.getRepository(Rastreio);

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

	if (dataEnvio && dataEnvio2) {
		queryBuilder.andWhere('rastreio.data_de_postagem BETWEEN :dataEnvio AND :dataEnvio2', { dataEnvio, dataEnvio2 });
	} else if (dataEnvio) {
		queryBuilder.andWhere('rastreio.data_de_postagem LIKE :dataEnvio', { dataEnvio: `${dataEnvio}%` });
	}

	if (cidadeEnvio) {
		queryBuilder.andWhere('rastreio.endereco_envio LIKE :cidadeEnvio', { cidadeEnvio: `${cidadeEnvio}%` });
	}

	if (cidadeFinal) {
		queryBuilder.andWhere('rastreio.endereco_final LIKE :cidadeFinal', { cidadeFinal: `${cidadeFinal}%` });
	}

	queryBuilder.orderBy('rastreio.data_de_postagem', 'DESC');

	const queryResult: TCodesResponse[] | any = await queryBuilder.getMany();

	if (queryResult.length === 0) {
		throw new AppError('Code not found, try again with another date or place', 404);
	}

	return queryResult
}
