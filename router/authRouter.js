import { Router } from "express"
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controller/userController.js"

export const authRouter = Router()

authRouter
	.post("/register", registerUser)
	.post("/login", loginUser)
	.post("/logout", logoutUser)
