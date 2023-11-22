export const success = (res,status,message) => {
	res
		.status(status)
		.json({ success: "true", message })
}

export const failed = (res,status,message) => {
	res
		.status(status)
		.json({ success: "failed", message})
}
