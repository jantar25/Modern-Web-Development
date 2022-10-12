import React from 'react'

const Filter = ({filter,handleSearchChange}) => {
  return (
    <div>
        <label>find countries </label>
        <input value={filter} onChange={handleSearchChange} />
  </div>
  )
}

export default Filter