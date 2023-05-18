import 'express-async-errors'
import express, { Application, json } from 'express'
import { handleErrors } from './error'
import { userRoutes } from './routes/users.routes'
import { loginRoutes } from './routes/login.routes'
import { codesRoutes } from './routes/codes.routes'
import cors from 'cors'

const app: Application = express()

app.use(express.json())

app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	app.use(cors());
	next();
})

app.use('/users', userRoutes)
app.use('/login', loginRoutes)
app.use('/codes', codesRoutes)
app.use(handleErrors)

export default app
