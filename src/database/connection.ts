import client from './config'
import { createUserTableQuery, createRastreioTableQuery, uuidv4 } from './config'

const startDatabase = async (): Promise<void> => {
	await client.connect()
	await client.query(createUserTableQuery)
	await client.query(createRastreioTableQuery)
	console.log('Database started.')
}

export default startDatabase
