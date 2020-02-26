const Dog = require('../models/Dog')
const Owner = require('../models/Owner')
const dbErrorMsg = require('../routes/lib/helpers/dbErrorMsg')

module.exports = {
  createDog: async (req, res) => {
    try {
      let createdDog = new Dog({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        owner: req.user._id
      })

      await createdDog.save()

      await Owner.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { dogs: createdDog } },
        { new: true }
      )

      res.send(createdDog)
    } catch (e) {
      res.status(500).json(dbErrorMsg(e))
    }
  }
}
