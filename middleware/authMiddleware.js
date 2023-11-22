import { failed } from "../services/responseServices.js"
import jwt from "jsonwebtoken"
import { getUserById } from "../services/userServices.js"

export const authMiddleware = async (req, res, next) => {
	try {
    const { token } = req.cookies
		if (!token) return failed(res,400, "Please Login/Register")

		const decode = jwt.verify(token, process.env.PRIVATE__KEY)
		req.user = await getUserById(decode._id)

		next()
	} catch (error) {
		failed(res,400, error.message)
	}
}
