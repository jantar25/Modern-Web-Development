import { useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    console.log(name)
    useEffect(() => {
        const country = axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        return country.data
    },[name])
}