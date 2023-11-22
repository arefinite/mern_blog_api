import express from "express"
import { authRouter } from "./router/authRouter.js"
import { userRouter } from "./router/userRouter.js"
import cookieParser from "cookie-parser"
import { blogRouter } from "./router/blogRouter.js"
import { getBlogs } from "./controller/blogController.js"
import cors from 'cors'
export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: [process.env.FRONTEND__URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials:true
}))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)
app.get('/api/blogs',getBlogs)