const User = require('../models/User');

module.exports.createUser = async (req, res) => {
  const { username } = req.body
  const newUser = new User({ username })
  try {
    const { _id } = await newUser.save()
    res.send({ username, _id })
  } catch (err) {
    res.send({ error: err.message })
  }
}
