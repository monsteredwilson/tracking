import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from 'typeorm'

@Entity('codes_to_process')
class CodesToProcess{

	@PrimaryColumn({type: 'varchar', length:14})
	codigos: string
}

export default CodesToProcess