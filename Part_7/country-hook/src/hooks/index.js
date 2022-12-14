import { useState,useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
      const getCountry = async (name) =>{
        const country = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        setCountry(country.data[0])
      }
      getCountry(name)
    },[name])
  
    return country
  }

export const useField = (type) => {
  const [value, setValue] = useState('')
  
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}