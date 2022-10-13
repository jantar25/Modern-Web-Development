import React,{ useState } from 'react'
import CountryDetails from './CountryDetails'

const Country = ({ country }) => {
  const [toggleView,setToggleView] = useState(false)

  const showCountryDetails = () => {
    setToggleView(!toggleView)
  }
  return (
    <div>
        <div>
          {country.name.official}
          <button onClick={showCountryDetails}>{toggleView? "hide" : "show"}</button>
        </div>
        {toggleView &&
        <CountryDetails country={country} />
        }
    </div>
  )
}

export default Country