import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({ showAll, handleShowChange }) => {
  return (
    <div>
      find countries: <input value={showAll} onChange={handleShowChange} />
    </div>
  )
}

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length === 1) {
    return (
      <Country country={countriesToShow[0]} />
    )
  }

  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    countriesToShow.map(country =>
      <div key={country.name}>
        {country.name}
        <button>show</button>
      </div>
    )
  )
}

const Country = ({ country }) => {

  const rows = () => country.languages.map(language =>
    <div key={language.name}>
      <li>{language.name}</li>
    </div>
  )

  return (
    <div>
      <h2>{country.name}</h2>

      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>

      <h3>languages</h3>

      <ul>
        {rows()}
      </ul>

      <img src={country.flag} alt="flag" width='150' />

    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleShowChange = (event) => {
    setShowAll(event.target.value)
  }

  const countriesToShow = showAll
    ? countries.filter(country => country.name.toLowerCase().includes(showAll.toLowerCase()))
    : []

  console.log(showAll)

  return (
    <div>
      <Filter
        showAll={showAll}
        handleShowChange={handleShowChange}
      />

      <Countries countriesToShow={countriesToShow} />

    </div>
  )
}

export default App;