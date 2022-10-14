import React, { useState,useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
  const [weather,setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
    .then(res => {
      setWeather(res.data) 
    })
  },[api_key,country.latlng])
 

  return (
        <div>
          <h1>{country.name?.official}</h1>
          <div>
            <div>capital {country.capital}</div>
            <div>capital {country.area}</div>
          </div>
          <div>
            <h3>Languages</h3>
            <ul>
              {Object
                .entries(country.languages)
                    .map(([key,value])=>
                        <li key={key}>{value}</li>
                        )
                    }
            </ul>
          </div>
          <img src={country.flags.png} alt="country flag" />
          <div>
            <h3>Weather in {country.capital}</h3>
            <h4>temperature { parseFloat(weather.main?.temp - 273.1).toFixed(2) } celcius</h4>
            {weather.weather?.map((icon) => 
              <img key={icon.icon} 
                  src={`http://openweathermap.org/img/wn/${icon.icon}@2x.png`} 
                  alt='weather icon' />
              )}
            <h4>wind { weather.wind?.speed } m/s</h4>
          </div>
        </div>
  )
}

export default CountryDetails