const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    minlength: 5
  },
  published: {
    type: String,
    minlength: 4
  },
  genres: {
    type : [String],
    required: true,
    default: []
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
})

module.exports = mongoose.model('Book', schema)