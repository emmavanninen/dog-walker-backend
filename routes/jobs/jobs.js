const express = require('express')
const router = express.Router()
const passport = require('passport')
const jobController = require('../../controllers/jobController')

// let auth = passport.authenticate('jwt-owner')

router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})

router.post('/create-job', jobController.createJob)

module.exports = router
