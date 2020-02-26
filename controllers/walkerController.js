const Walker = require('../models/Walker')
const dbErrorMsg = require('../routes/lib/helpers/dbErrorMsg')

module.exports = {
  createWalker: async (req, res) => {
    try {
      let createdWalker = await new Walker({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        owner: req.body.password
      })

      await createdWalker.save()

      res.json({
        message: 'Success'
      })
    } catch (e) {
      res.status(500).json(dbErrorMsg(e))
    }
  }
}
