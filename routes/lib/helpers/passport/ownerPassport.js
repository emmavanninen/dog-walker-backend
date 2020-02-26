const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Owner = require('../../../../models/Owner')
const keys = process.env.OWNER_SECRET_KEY

const jwtOpts = {}
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOpts.secretOrKey = keys
const userJWTLogin = new JwtStrategy(jwtOpts, async (payload, done) => {
  const ownerEmail = payload.email
  try {
    if (ownerEmail) {
      const owner = await Owner.findOne({ email: ownerEmail })
      if (!owner || owner === null) {
        return done(null, false)
      }
      return done(null, owner)
    }
  } catch (error) {
    return done(error, false)
  }
})
module.exports = userJWTLogin
