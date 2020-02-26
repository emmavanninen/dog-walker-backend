const mongoose = require('mongoose')
const moment = require('moment')

const DogSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  age: { type: String, required: 'Age is required' },
  gender: { type: String, required: 'Gender is required' },
  notes: { type: String, default: '' },
  photo: { type: String, default: '' },
  owner: [{ type: mongoose.Schema.ObjectId, ref: 'Owner' }],
  jobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }],
  created: {
    type: String,
    default: () => {
      const now = moment()
      return now.format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
  }
})

module.exports = mongoose.model('Dog', DogSchema)
