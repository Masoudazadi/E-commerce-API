const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const { createJWT } = require("../utils")

// Register User
const register = async (req, res) => {
  const { name, email, password } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists")
  }
  // Add first registered user as admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? "admin" : "user"
  const user = await User.create({ name, email, password, role })
  // Create token user
  const tokenUser = createJWT(user)
  res.status(StatusCodes.CREATED).json({ user: user, token: tokenUser })
}

// Login User
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password")
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError.UnauthorizedError("No user found")
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("password is incorrect")
  }
  const tokenUser = createJWT(user)
  res.status(StatusCodes.OK).json({ token: tokenUser, msg: "Login successful!" })
}


// Get User
const getUser = async (req, res) => {
  const user=req.user
  if (!user) {
    throw CustomError.UnauthorizedError("No user found")
  }
  res.status(StatusCodes.OK).json({ user: user, msg: "Get user successful!" })
}

// Logout User
const logout = async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  //   res.send() ==== this is for production
  res.status(StatusCodes.OK).json({ msg: "user logged out!" }) // this is for testing during development
}

// const logout = async (req, res) => {
//   res.cookie("token", "no token", {
//     httpOnly: true,
//     expires: new Date(Date.now()),
//   })
//   res.send()
// }

module.exports = {
  register,
  login,
  logout,
  getUser
}
