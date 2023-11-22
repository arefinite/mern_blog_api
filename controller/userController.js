import bcrypt from "bcrypt"
import { User } from "../model/userModel.js"
import { failed, success } from "../services/responseServices.js"
import { getUserByEmail, getUserById } from "../services/userServices.js"
import { generateCookie } from "../services/cookieServices.js"

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body
		let user = await getUserByEmail(email)

		if (user) return failed(res, 400, "User already exists")

		const hashedPassword = await bcrypt.hash(password, 10)
		user = await User.create({ name, email, password: hashedPassword })

		generateCookie(res, user, "User registration successful")
	} catch (error) {
		failed(res, 400, error.message)
	}
}

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await getUserByEmail(email)

		if (!user) return failed(res, 401, "User not found")

		const validate = await bcrypt.compare(password, user.password)
		if (!validate) return failed(res, 401, "Wrong credential")

		generateCookie(res, user, "User login successful")
	} catch (error) {
		failed(res, 400, error.message)
	}
}

export const logoutUser = (req, res) => {
	res
		.status(200)
		.cookie("token", "", {
			expires: new Date(Date.now()),
		})
		.json({
			success: true,
			message: "User log out successful",
		})
}

export const getUserProfile = (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user
    })
}

export const getUser = async (req, res) => { 
  try {
    const { id } = req.params
    const user = await getUserById(id)
    if (!user) return failed(res, 404, "User not found")
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    failed(res, 400, error.message)
  }
}