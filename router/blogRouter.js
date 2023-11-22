import { Router } from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { addBlog, deleteBlog, getBlog, getBlogs, getMyBlogs, updateBlog } from "../controller/blogController.js"

export const blogRouter = Router()

blogRouter
  .get("/getMyBlogs", authMiddleware, getMyBlogs)
  .get('/:id',getBlog)
  .post("/add", authMiddleware, addBlog)
	.put("/:id",authMiddleware,updateBlog)
	.delete("/:id",authMiddleware,deleteBlog)
