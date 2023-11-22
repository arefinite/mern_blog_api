import jwt from "jsonwebtoken"

export const generateCookie = (res, user, message, status = 200) => {
	const token = jwt.sign({ _id: user._id }, process.env.PRIVATE__KEY)
	res
		.status(status)
    .cookie("token", token, {
      sameSite: process.env.NODE__ENV === 'DEVELOPMENT' ? 'lax' : 'none',
      secure:process.env.NODE__ENV === 'DEVELOPMENT' ? false :true
    })
		.json({ success: true, message})
}
