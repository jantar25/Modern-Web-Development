require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/persons')
const app = express()


app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))
app.use(express.static('build'))



//GET INFORMATION
  app.get('/info', (request, response) => {
    response.send(`Phonebook has info for people `)
  })
  
//GET ALL PERSONS
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

//GET ONE PERSON BY ID
  app.get('/api/persons/:id',(request,response) => {
    Person.findById(request.params.id)
    .then(person => { 
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    response.status(500).end({ error: 'malformatted id' })
    })
  })

//DELETE ONE PERSON BY ID
  app.delete('/api/persons/:id', (request,response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => console.log(error))
  })

//CREATE ONE PERSON
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const existingName = Person.findOne({name:body.name})
    console.log(existingName)
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    // else if (existingName) {
    //   return response.status(400).json({ 
    //     error: 'name must be unique'
    //    })
    // } 
    else {
      const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
      })
    
      person.save().then(savedPerson =>{
        response.json(savedPerson)
      })   
    }
  })
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })