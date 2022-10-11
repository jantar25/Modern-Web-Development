import { useState } from 'react'
import Person from './component/Person'

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
      <div>
        <label>filter shown with: </label>
        <input value={filter} required onChange={handleFilterChange} />
      </div>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>
            <label>name: </label>
            <input value={newName} required onChange={handleNameChange} />
          </div>
          <div>
            <label>number: </label>
            <input value={newNumber} required onChange={handleNumberChange} />
        </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
        ).map((person) =>
        <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App