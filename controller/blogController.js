import { Blog } from "../model/blogModel.js"
import { findBlogById, findBlogs, findBlogsByUserId } from "../services/blogServices.js"
import { failed, success } from "../services/responseServices.js"

export const getMyBlogs = async (req, res) => {
	try {
		const { _id } = req.user
		const blogs = await findBlogsByUserId(_id)
		if (!blogs) return failed(res, 404, "No Blog Found")
		res.status(200).json({
			success: true,
			blogs: blogs,
		})
	} catch (error) {
		failed(res, 400, error.message)
	}
}

export const addBlog = async (req, res) => {
	try {
		const { title, description, imgUrl } = req.body
		const blog = await Blog.create({
			title,
			description,
			imgUrl,
			user: req.user,
		})

		success(res, 201, "Blog Added Successfully")
	} catch (error) {
		failed(res, 400, error.message)
	}
}
export const updateBlog = async (req, res) => {
	try {
		const { title, description, imgUrl } = req.body
		const { id } = req.params
		const { _id } = req.user

		const blog = await findBlogById(id)

		if (!(blog.user.toString() === _id.toString()))
			return failed(res, 401, "Unauthorized")

		blog.title = title
		blog.description = description
		blog.imgUrl = imgUrl
		await blog.save()

		success(res, 200, "Blog Updated Successfully")
	} catch (error) {
		failed(res, 400, error.message)
	}
}
export const deleteBlog = async (req, res) => {
	try {
		const { _id } = req.user
    const { id } = req.params
    
    const blog = await findBlogById(id)
    
		if (!(blog.user.toString() === _id.toString()))
      return failed(res, 401, "Unauthorized")
    
    await blog.deleteOne()
    success(res,200,'Blog Delete successfully')
	} catch (error) {
		failed(res, 400, error.message)
	}
}

export const getBlogs = async(req,res) => {
  try {
    const blogs = await findBlogs()
    if (!blogs) return failed(res, 404, "Blogs Not Found")
    res.status(200).json({
      message: 'Success',
      blogs: blogs
    })
  } catch (error) {
    failed(res, 400, error.message)
  }
}

export const getBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await findBlogById(id)
    if (!blog) return failed(res, 400, 'No blog found')
    res.status(200).json({
      message: 'Success',
      blog
    })
  } catch (error) {
    failed(res, 400, error.message)
  }
}