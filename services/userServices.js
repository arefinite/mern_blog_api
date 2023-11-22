import { User } from "../model/userModel.js"

export const getUserByEmail = async email =>  await User.findOne({ email })
export const getUserById = async id => await User.findOne({ _id: id })