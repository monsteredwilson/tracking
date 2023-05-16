import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import Rastreio from './rastreio.entity'

@Entity('users')
class User {

	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({type: 'varchar', length: 20})
	username: string

	@Column({type: 'varchar', length: 45, unique: true})
	email: string
	
	@Column({type: 'varchar', length: 120})
	"password": string

	@Column({type: 'boolean', default: false})
	"admin": boolean

	@Column({type: 'int', default: 0})
	credits: number

	@Column({type: 'boolean', default: true})
	active: boolean

	@OneToMany(()=> Rastreio, (rastreio)=> rastreio.user)
	rastreio: Rastreio	
}

export default User