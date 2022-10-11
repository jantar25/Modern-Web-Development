import { useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '089-7536-46' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const existingPerson = persons.find((person)=> person.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const pesonObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      } 
      setPersons(persons.concat(pesonObject))
      setNewName('')
      setNewNumber('')
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