const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')
const ownersRouter = require('./routes/owners/owners')
const dogsRouter = require('./routes/dogs/dogs')
const walkersRouter = require('./routes/walkers/walkers')
const jobsRouter = require('./routes/jobs/jobs')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: false
  })
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/owners', ownersRouter)
app.use('/api/dogs', dogsRouter)
app.use('/api/walkers', walkersRouter)
app.use('/api/jobs', jobsRouter)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Error: ${err}`))

const ownerJWTStrategy = require('./routes/lib/helpers/passport/ownerPassport')
// const walkerJWTStrategy = require('./routes/lib/helpers/passport/walkerPassport')
app.use(passport.initialize())

// passport.serializeUser((user, cb) => {
//   cb(null, user)
// })

// passport.deserializeUser((user, cb) => {
//   cb(null, user)
// })

passport.use('jwt-owner', ownerJWTStrategy)
// passport.use('jwt-walker', walkerJWTStrategy)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
