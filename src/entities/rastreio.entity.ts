import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import User from './users.entity';
const { v4: uuidv4 } = require('uuid');

@Entity('rastreio')
class Rastreio {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({type: 'varchar', length:14, unique: true})
	codigo: string

	@Column({type: 'varchar', length:20})
	"data_de_postagem": string

	@Column({type: 'varchar', length:100})
	"descricao_inicial": string

	@Column({type: 'varchar', length:100})
	"endereco_envio": string

	@Column({type: 'varchar', length:20})
	"data_last_review": string

	@Column({type: 'varchar', length:100})
	"ultima_descricao": string

	@Column({type: 'varchar', length:100})
	"endereco_final": string

	@ManyToOne(()=> User, (user)=> user.rastreio)
	@JoinColumn()
	user: User

	constructor(){
		this.id = uuidv4()
	}
}

export default Rastreio