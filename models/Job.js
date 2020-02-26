const mongoose = require('mongoose')
const moment = require('moment')

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: 'Title is required' },
  location: {
    street: String,
    city: String,
    state: String,
    zip: String,
    coordinates: {
      type: [Number]
    }
  },
  price: { type: Number, default: 0 },
  owner: [{ type: mongoose.Schema.ObjectId, ref: 'Owner' }],
  walker: [{ type: mongoose.Schema.ObjectId, ref: 'Walkers' }],
  dogs: [{ type: mongoose.Schema.ObjectId, ref: 'Dog' }],
  completed: { type: Boolean, default: false },
  created: {
    type: String,
    default: () => {
      const now = moment()
      return now.format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
  }
})

module.exports = mongoose.model('Job', JobSchema)
