import 'dotenv/config'
import express from 'express'
import authRoutes from './src/routes/auth.ts'
import cors from "cors"

const app = express()
const PORT = 3030

const allowedOrigins = [
        'http://localhost:5173'
]


app.use(cors({
        origin : allowedOrigins,
        credentials : true 
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))




app.use('/auth',authRoutes)

app.listen(PORT ,()=>{
        console.log(`server running on http:localhost:${PORT}`)
})