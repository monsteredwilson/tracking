import {z} from 'zod'
import { loginSchemaRequest, loginSchemaResponse } from '../schemas/login.schema'

export type TLoginRequest = z.infer<typeof loginSchemaRequest>

export type TLoginResponse = z.infer<typeof loginSchemaResponse>