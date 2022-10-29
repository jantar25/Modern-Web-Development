import { useState, useEffect } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import personServices from './component/services/personServices'
import Notification from './component/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  
// GET ALL PERSONS
  useEffect(() => {
    personServices
    .getAllPersons()
    .then(res => {
      setPersons(res)
    })
  },[])

//ADD A PERSON OR UPDATE HIS/HER NUMBER 
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
          setSuccessMessage(`${newNumber} Replaced`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          console.log(error)
          setPersons(persons.filter(n => n.id !== existingPerson.id))
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
        setSuccessMessage(`Added ${newName} `)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(error)
        })
    }
  }

//DELETE A PERSON
  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
    personServices
    .deletePerson(person.id)
    .then(res => {
      setPersons(persons.filter(p => p.id !== person.id))
      setSuccessMessage(`Deleted Successfully`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
    .catch(error => {
      console.log(error)
      setErrorMessage(`the persone ${person.name} was already deleted from server`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setPersons(persons.filter(n => n.id !== person.id))
      })
    }
  }

//HANDLING INPUT CHANGE
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
      <Notification 
        message={errorMessage || successMessage} 
          style={errorMessage? "error" : "success"} 
        />
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