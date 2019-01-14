const Exercise = require('../models/Exercise')
const User = require('../models/User')
const { ObjectId } = require('mongoose').Types

const addExercise = async (req, res) => {
  try {
    let { userId, description, duration, date: dateString } = req.body
    if (userId) {
      userId = ObjectId(userId)
    }
    const date = dateString ? Date.parse(dateString) : Date.now()
    const exercise = new Exercise({ userId, description, duration, date })
    const { _id } = await exercise.save()
    res.send({
      _id,
      userId,
      description,
      duration,
      date: new Date(date).toDateString(),
    })
  } catch (err) {
    console.log(err)
    res.send({ error: err.message })
  }
}

const getExerciseLog = async (req, res) => {
  try {
    const {
      userId: _id,
      from: fromString,
      to: toString,
      limit: limitString,
    } = req.query
    const userId = ObjectId(_id)
    const from = fromString ? new Date(fromString) : undefined
    const to = toString ? new Date(toString) : undefined
    const limit = limitString ? parseInt(limitString) : undefined

    const dateQuery = {
      date: {
        ...from && { $gte: from },
        ...to && { $lte: to },
      }
    }

    const { username } = await User.findOne({ _id: userId })
    const exercises = await Exercise.find({ userId, ...(from || to) && dateQuery }).limit(limit)
    const log = exercises.map(({ _id, description, duration, date }) => ({
      _id, description, duration,
      date: date ? date.toDateString() : 'Invalid Date',
    }))

    res.send({
      _id,
      username,
      from: from ? from.toDateString() : undefined,
      to: to ? to.toDateString() : undefined,
      limit,
      log,
    })
  } catch (err) {
    console.log(err)
    res.send({ error: err.message })
  }
}

module.exports = { addExercise, getExerciseLog }
