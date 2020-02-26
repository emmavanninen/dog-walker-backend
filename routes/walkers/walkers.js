const express = require('express')
const router = express.Router()
const passport = require('passport')
const walkerController = require('../../controllers/walkerController')

// let auth = passport.authenticate('jwt-walker')

router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})

router.post('/register-walker', walkerController.createWalker)

module.exports = router
