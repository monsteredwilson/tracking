import {z} from 'zod'
import { buyCodeSchemaRequest, codeSchema, codeSchemaCreate, codeSchemaRequest, codeSchemaResponse, codeSchemaView, filterSchema } from '../schemas/codes.schema'

export type TCodes = z.infer<typeof codeSchema>

export type TCodesView = z.infer<typeof codeSchemaView>

export type TCodesCreate = z.infer<typeof codeSchemaCreate>

export type TCodesRequest = z.infer<typeof codeSchemaRequest>

export type TCodesResponse = z.infer<typeof codeSchemaResponse>

export type TFilter = z.infer<typeof filterSchema>

export type TBuyCodesRequest = z.infer<typeof buyCodeSchemaRequest>