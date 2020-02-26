const mongoose = require('mongoose')
const moment = require('moment')

const OwnerSchema = new mongoose.Schema({
  email: {
    type: String,
    // trims white spaces out
    trim: true,
    unique: true,
    required: 'Email is required'
  },
  firstName: { type: String, required: 'First name is required' },
  lastName: { type: String, required: 'Last name is required' },
  phone: {
      type: String, required: 'Phone number is required'
  },
  photo: { type: String, default: '' },
  password: {
    type: String,
    required: 'Password is required'
  },
  dogs: [{ type: mongoose.Schema.ObjectId, ref: 'Dog' }],
  jobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }],
  created: {
    type: String,
    default: () => {
      const now = moment()
      return now.format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
  }
})

module.exports = mongoose.model('Owner', OwnerSchema)
