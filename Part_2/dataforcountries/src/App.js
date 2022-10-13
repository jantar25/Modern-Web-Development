import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './component/Filter'
import Country from './component/Country'
import CountryDetails from './component/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => {
      setCountries(res.data) 
    })
  },[])

  const handleSearchChange = (e) => {
    setFilter(e.target.value)
  }
  
  const filterCountries = countries
    .filter(country => 
      country
      .name
      .official
      .toLowerCase()
      .includes(filter.toLowerCase()))

  return (
    <div>
      <Filter 
        filter={filter} 
        handleSearchChange={handleSearchChange} 
        />
        {filterCountries.length>10?
          <div>Too many matches,specify another filter.</div> : 
        filterCountries.length === 1?
          <CountryDetails country={filterCountries[0]} />  :
        filterCountries.map((country) =>
          <Country key={country.name?.official} country={country} />)
        }
    </div>
  )
}

export default App
