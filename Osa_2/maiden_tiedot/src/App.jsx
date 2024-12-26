import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import CountryForm from './components/CountryForm'

const App = () => {
  const [query,setQuery] = useState('')
  const [countries,setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const filteredWithQuery = () => {
    return (
      query.length === 0
      ? countries
      : countries.filter((country) => {
        return country.name.common.toLowerCase()
          .includes(query.toLowerCase())
      })
    )
  }

  const filteredCountries = filteredWithQuery()

  return (
    <div>
      <CountryForm 
        handleQueryChange={handleQueryChange}
      />
      <Countries 
        countries={filteredCountries} 
      />
    </div>
  )
}

export default App