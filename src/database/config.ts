import { Client, ClientConfig } from 'pg'
import 'dotenv/config'

const config = () => {
    if (process.env.NODE_ENV === 'test') {
        return {
            user: process.env.DB_TEST_USER,
            password: process.env.DB_TEST_PASSWORD,
            host: process.env.DB_TEST_HOST,
            database: process.env.DB_TEST,
            port: parseInt(process.env.DB_TEST_PORT!),
        }
    }

	const dbUrl = process.env.DATABASE_URL

    return {
        // user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // host: process.env.DB_HOST,
        // database: process.env.DB,
        port: parseInt(process.env.DB_PORT!),
		connectionString: dbUrl
    }
}

const client: Client = new Client(config())

export const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(20) NOT NULL,
	email VARCHAR(45) NOT NULL UNIQUE,
	"password" VARCHAR(120) NOT NULL,
	"admin" BOOLEAN DEFAULT FALSE,
	credits INTEGER DEFAULT 0,
	active BOOLEAN DEFAULT TRUE
)
`

export const { v4: uuidv4 } = require('uuid');

export const createRastreioTableQuery = `
CREATE TABLE IF NOT EXISTS rastreio(
	id UUID DEFAULT '${uuidv4()}' PRIMARY KEY,
	codigo VARCHAR(14) NOT NULL UNIQUE,
	"data_de_postagem" VARCHAR(20) NOT NULL,
	"descricao_inicial" VARCHAR(100) NOT NULL,
	"endereco_envio" VARCHAR(100) NOT NULL,
	"data_last_review" VARCHAR(20) NOT NULL,
	"ultima_descricao" VARCHAR(100) NOT NULL,
	"endereco_final" VARCHAR(100) NOT NULL,
	"userId" INTEGER DEFAULT NULL,
	FOREIGN KEY ("userId") REFERENCES users(id)
)
`



export default client
