import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from 'typeorm'

@Entity('codes_processed')
class CodesProcessed{

	@PrimaryColumn({type: 'varchar', length:14})
	codigos: string
}

export default CodesProcessed