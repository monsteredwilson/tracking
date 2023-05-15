import {z} from 'zod'

export const usersSchema = z.object({
	id: z.number(),
	username: z.string().max(20),
	email: z.string().email().max(45),
	password: z.string().min(8).max(120),
	admin: z.boolean().default(false),
	credits: z.number().int(),
	active: z.boolean().default(true)
})

export const usersSchemaRequest = usersSchema.omit({id: true, credits: true, admin: true,active: true})

export const usersSchemaResponse = usersSchema.omit({password: true, admin: true})

export const creditsSchemaRequest = usersSchema.pick({credits: true})