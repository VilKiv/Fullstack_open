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
        setCountries(initialCountries.map((country) => {return {...country,show:false}}))
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const toggleDetails = (countryId) => {
    const countriesCopy = [...countries]
    const toggledCountry = countriesCopy.find(n => n.cca3 === countryId)
    toggledCountry.show = !toggledCountry.show
    setCountries(countriesCopy)
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
        toggleDetails={toggleDetails}
      />
    </div>
  )
}

export default App