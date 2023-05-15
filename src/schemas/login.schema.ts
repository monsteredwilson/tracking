import {z} from 'zod'

export const loginSchemaRequest = z.object({
	email: z.string().email(),
	password: z.string()
})

export const loginSchemaResponse = z.object({
	token: z.string()
})