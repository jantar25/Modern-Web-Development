import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import personServices from './component/services/personServices'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  useEffect(() => {
    personServices
    .getAllPersons()
    .then(res => {
      setPersons(res)
    })
  },[])

  const addPerson = (e) => {
    e.preventDefault()
    const existingPerson = persons.find((person)=> person.name.toLowerCase() === newName.toLowerCase())
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      } 
      personServices
      .createPerson(personObject)
      .then(res => {
        setPersons(persons.concat(res))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange} 
      />
      <h2>add new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        addPerson={addPerson} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        filter={filter} 
      />
    </div>
  )
}

export default App