import 'dotenv/config'
import * as z from "zod" ; 

const envSchema = z.object({
    DATABASE_URL : z.string().min(1)
})





const _env = envSchema.parse(process.env)

export {_env}