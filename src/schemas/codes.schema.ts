import {z} from 'zod'

export const codeSchema = z.object({
	id: z.number(),
	code: z.string().max(14),
	data_de_postagem: z.string().max(20),
	descricao_inicial: z.string().max(100),
	endereco_envio: z.string().max(100),
	data_last_review: z.string().max(20),
	ultima_descricao: z.string().max(100),
	endereco_final: z.string().max(100),
	userId: z.number().nullish()
})

export const codeSchemaView = codeSchema.omit({code: true, userId: true})

export const codeSchemaCreate = codeSchema.omit({id: true, userId: true})

export const codeSchemaRequest = codeSchema.pick({id: true})

export const codeSchemaResponse = codeSchema.omit({userId: true})

export const filterSchema = z.object({
	data_de_envio1 : z.string().min(10).max(10),
	data_de_envio2: z.string().min(10).max(10),
	cidade_envio: z.string().max(100),
	estado_envio: z.string().min(2).max(2),
	cidade_final: z.string().max(100),
	estado_final: z.string().min(2).max(2)
})

export const buyCodeSchemaRequest = z.object({
	codes: z.array(z.string())
})

