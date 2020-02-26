const Owner = require('../models/Owner')
const bcrypt = require('bcryptjs')
const dbErrorMsg = require('../routes/lib/helpers/dbErrorMsg')
// const passport = require('../routes/lib/helpers/passport/passport')
const authHelper = require('../routes/lib/helpers/authHelper')

module.exports = {
  createOwner: async (req, res) => {
    try {
      let createdOwner = await new Owner({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phone: req.body.phone
      })

      let generatedSalt = await bcrypt.genSalt(10)
      let hash = await bcrypt.hash(createdOwner.password, generatedSalt)

      createdOwner.password = hash

      console.log(`23`, createdOwner)

      await createdOwner.save()

      let ownerToken = await authHelper.createOwnerJwtToken(createdOwner)

      res.json({
        message: 'Success',
        token: ownerToken
      })
    } catch (e) {
      res.status(500).json(dbErrorMsg(e))
    }
  },

  login: async (req, res) => {
    try {
      let owner = await Owner.findOne({ email: req.body.email })

      if (!owner) {
        throw 'User not found'
      }

      let comparedPassword = await authHelper.comparePassword(
        req.body.password,
        owner.password
      )

      if (comparedPassword === 409) {
        throw 'Wrong password'
      }

      let jwtToken = await authHelper.createOwnerJwtToken(owner)

      res.status(200).send(owner, token)
    } catch (e) {
      res.status(500).json(dbErrorMsg(e))
    }
  }
}
