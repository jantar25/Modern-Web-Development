import React from 'react'

const PersonForm = (props) => {
    const {newName,newNumber,addPerson,handleNameChange,handleNumberChange} = props
  return (
    <form onSubmit={addPerson}>
    <div>
      <div>
        <label>name: </label>
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <label>number: </label>
        <input value={newNumber} onChange={handleNumberChange} />
    </div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm