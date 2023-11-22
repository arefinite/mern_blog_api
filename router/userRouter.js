import { Router } from "express";
import { getUser, getUserProfile } from "../controller/userController.js";
import { authMiddleware } from './../middleware/authMiddleware.js';

export const userRouter = Router()

userRouter.get('/profile', authMiddleware, getUserProfile)
.get('/:id',getUser)