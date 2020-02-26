const NodeGeoCoder = require('node-geocoder')
const Job = require('../models/Job')
const Owner = require('../models/Owner')
const Dog = require('../models/Dog')
const dbErrorMsg = require('../routes/lib/helpers/dbErrorMsg')

module.exports = {
  createJob: async (req, res) => {
    try {
      const options = {
        provider: 'mapquest',
        httpAdapter: 'https',
        apiKey: 'oON6i1iaBbTG75KFcajVn1nLIv8tGuRf',
        formatter: null
      }

      const geocoder = NodeGeoCoder(options)

      const geoLocation = await geocoder.geocode({
        address: req.body.location.street,
        country: 'United States',
        zipcode: req.body.location.zip
      })

      let coordinatesArr = [geoLocation[0].latitude, geoLocation[0].longitude]

      req.body.coordinates = coordinatesArr

      const foundOwner = await Owner.findById(req.user._id)
        .populate({
          path: 'dogs',
          match: null,
          select: '-__v'
        })
        .select('-__v -created')
        .exec()

      let newJob = new Job({
        jobTitle: req.body.jobTitle,
        location: req.body.location,
        price: req.body.price,
        owner: req.user._id,
        dogs: foundOwner.dogs
      })

      await newJob.save()

      res.send(newJob)
    } catch (e) {
      res.status(500).json(dbErrorMsg(e))
    }
  }
}
