const express = require('express')
const router = express.Router()
const passport = require('passport')
const dogsController = require('../../controllers/dogController')

let auth = passport.authenticate('jwt-owner')

router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/create-dog', dogsController.createDog)

module.exports = router
