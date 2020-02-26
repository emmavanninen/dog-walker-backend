const express = require('express')
const router = express.Router()
const passport = require('passport')
const ownerController = require('../../controllers/ownerController')

let auth = passport.authenticate('jwt-owner')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/register-owner', ownerController.createOwner)
router.post('/login-owner', ownerController.login)

module.exports = router
