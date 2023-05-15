import {z} from 'zod'
import { creditsSchemaRequest, usersSchema, usersSchemaRequest, usersSchemaResponse } from '../schemas/users.schema'

export type TUsers = z.infer<typeof usersSchema>

export type TUsersRequest = z.infer<typeof usersSchemaRequest>

export type TUsersResponse = z.infer<typeof usersSchemaResponse>

export type TCreditsRequest = z.infer<typeof creditsSchemaRequest>