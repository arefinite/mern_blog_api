import { Blog } from "../model/blogModel.js"

export const findBlogsByUserId = async id => await Blog.find({ user: id })
export const findBlogById = async id => await Blog.findOne({ _id: id })
export const findBlogs = async () => await Blog.find()

