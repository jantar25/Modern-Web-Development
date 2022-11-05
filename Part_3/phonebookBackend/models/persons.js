const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
const numberValidator = (v) => {
  return /^\d{2,3}-\d{6,}$/.test(v)
}

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: numberValidator,
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  date: Date,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', personSchema)