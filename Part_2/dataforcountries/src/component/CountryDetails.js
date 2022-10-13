import React from 'react'

const CountryDetails = ({country}) => {
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
        </div>
  )
}

export default CountryDetails