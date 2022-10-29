require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/persons')
const app = express()


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(function(error, request, response, next){
//   console.error(error)
//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }
//   next(error)
// })
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))



//GET INFORMATION
  app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
      response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
    })
  })
  
//GET ALL PERSONS
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

//GET ONE PERSON BY ID
  app.get('/api/persons/:id',(request,response,next) => {
    Person.findById(request.params.id)
    .then(person => { 
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
  })

//DELETE ONE PERSON BY ID
  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

//CREATE ONE PERSON
  app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
        date: new Date(),
      })
    
      person.save()
      .then(savedPerson =>{
        response.json(savedPerson)
      })
      .catch(error => next(error))
    }
  })

  //UPDATE EXISTING PERSON
  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }
  app.use(errorHandler)
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })