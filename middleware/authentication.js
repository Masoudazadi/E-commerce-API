const User = require("../models/userModel")


const CustomError = require("../errors")
const { isTokenValid } = require("../utils")

const authenticateUser = async (req, res, next) => {
  console.log(req.headers)
  const token = req.headers.authorization?.replace(/Bearer /g, "");
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication invalid")
  }

  try {
    const { userId } = isTokenValid({ token })
    console.log(userId)
    req.user =await  User.findOne({_id: userId})
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid")
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access to this route"
      )
    }
    next()
  }
}

module.exports = { authenticateUser, authorizePermissions }