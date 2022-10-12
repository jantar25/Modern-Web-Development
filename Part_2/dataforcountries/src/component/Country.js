import React from 'react'

const Country = ({country}) => {
  return (
    <div>
        <div>{country.name.official}</div>
    </div>
  )
}

export default Country