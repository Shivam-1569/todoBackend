import express from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import cors from 'cors'


export const app = express()

config({
    path: './config.env',
})


//middlewares
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

//routes
app.use("/user",userRouter)
app.use("/task", taskRouter)

//error middleware
app.use(errorMiddleware)








