const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
async function comparePassword(incomingPassword, userPassword) {
  try {
    let comparedPassword = await bcrypt.compare(incomingPassword, userPassword)
    if (comparedPassword) {
      return comparedPassword
    } else {
      throw 409
    }
  } catch (error) {
    return error
  }
}
async function createOwnerJwtToken(user) {
  let payload
  if (user.photo.length > 1) {
    payload = {
      email: user.email,
      id: user._id,
      photo: user.photo
    }
  } else {
    payload = {
      email: user.email,
      id: user._id
    }
  }
  let jwtToken = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 3600
  })
  return jwtToken
}
module.exports = {
  comparePassword,
  createOwnerJwtToken
}
