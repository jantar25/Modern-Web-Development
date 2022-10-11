import { useState } from 'react'
import Person from './component/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addPerson = (e) => {
    e.preventDefault()
    const existingPerson = persons.find((person)=> person.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const pesonObject = {
        name: newName,
      } 
      setPersons(persons.concat(pesonObject))
      setNewName('')
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label>name: </label>
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) =>
        <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App