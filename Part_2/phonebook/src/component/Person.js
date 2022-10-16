import React from 'react'

const Person = ({ person,handleDeletePerson }) => {
  return (
    <div>
        <div>
          {person.name} {person.number}
          <button onClick={ ()=>handleDeletePerson(person) }>delete</button>
        </div>
    </div>
  )
}

export default Person