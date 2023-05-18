import 'express-async-errors'
import express, { Application, json } from 'express'
import { handleErrors } from './error'
import { userRoutes } from './routes/users.routes'
import { loginRoutes } from './routes/login.routes'
import { codesRoutes } from './routes/codes.routes'
import cors from 'cors'

const app: Application = express()

app.use(express.json())

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	app.use(cors({
		origin: '*',
		preflightContinue: false,
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization']
	}))
	next()
})

app.use('/users', userRoutes)
app.use('/login', loginRoutes)
app.use('/codes', codesRoutes)
app.use(handleErrors)

export default app
