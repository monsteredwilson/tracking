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

	const dburl = process.env.DATABASE_URL

    return {
        // user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // host: process.env.DB_HOST,
        // database: process.env.DB,
        port: parseInt(process.env.DB_PORT!),
		connectionString: dburl
    }
}

const client: Client = new Client(config())

export default client
