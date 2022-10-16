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
      const updatedPerson = {...existingPerson, number:newNumber}
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) && (
        personServices
        .updatePerson(existingPerson.id,updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(`${existingPerson.name}'s new number ${newNumber} replacement failed`)
          console.log(error)
          })
      )
    
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
      .catch(error => {
        alert(`the persone ${newName} addition failed`)
        console.log(error)
        })
    }
  }


  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
    personServices
    .deletePerson(person.id)
    .then(res => {
      setPersons(persons.filter(p => p.id !== person.id))
    })
    .catch(error => {
      alert(`the persone ${person.name} was already deleted from server`)
      console.log(error)
      setPersons(persons.filter(n => n.id !== person.id))
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
        handleDeletePerson={handleDeletePerson} 
      />
    </div>
  )
}

export default App