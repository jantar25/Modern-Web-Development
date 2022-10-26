const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Jantar:${password}@cluster0.mrzquim.mongodb.net/Phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String, 
    number: String,
    date: Date,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')

    if(!name || !number) {
        Person.find({}).then(result => {
            console.log('phonebook:')
            result.forEach(person => {
              console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
          })
    } else {
        const person = new Person({
            name: name,
            number: number,
            date: new Date(),
        })
        return person.save().then(() => {
            console.log(`Added ${name} number ${number} to phonebook`)
            return mongoose.connection.close()
          })   
    }
  })
  .catch((err) => console.log(err))