import React from 'react'

const Person = ({person}) => {
  return (
    <div>
        <div>{person.name} {person.number}</div>
    </div>
  )
}

export default Person