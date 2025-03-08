const jwt = require("jsonwebtoken")

const createJWT = (user) => {
  console.log({userForCreateToken:user})
  return jwt.sign({userId: user._id.toString()}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}



// Verify the token
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

module.exports = {
  createJWT,
  isTokenValid,
}
