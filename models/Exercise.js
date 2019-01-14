const mongoose = require('mongoose')
const { Schema } = mongoose

const ExerciseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    index: true,
    default: Date.now
  },
})

ExerciseSchema.post('find', (doc) => {
  doc.date = doc.date ? doc.date.toDateString() : 'Invalid Date'
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)

module.exports = Exercise
