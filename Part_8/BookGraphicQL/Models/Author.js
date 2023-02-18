const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

AuthorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

AuthorSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', AuthorSchema)