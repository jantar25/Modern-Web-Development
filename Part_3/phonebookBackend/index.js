const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


//GET INFORMATION
  app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people ${new Date()}`)
  })
  
//GET ALL PERSONS
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

//GET ONE PERSON BY ID
  app.get('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end('Not found')
    }
  })

//DELETE ONE PERSON BY ID
  app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

//CREATE ONE PERSON
  app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 1000)
    const body = request.body
    const existingName = persons.find(person => person.name === body.name)
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    } else if (existingName) {
      return response.status(400).json({ 
        error: 'name must be unique'
       })
    } else {
      const person = {
        id: id,
        name: body.name,
        number: body.number
      }
    
      persons = persons.concat(person)
      response.json(person)
    }
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })