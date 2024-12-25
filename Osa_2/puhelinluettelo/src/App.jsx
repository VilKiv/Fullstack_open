import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault() 
    if (newName.length === 0) {
      window.alert('Name shouldn\'t be empty!')
      return
    } else if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: newName
    }
    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber('')
          setNewName('')
        })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredWithQuery = () => {
    const filteredPersons = searchQuery.length === 0 
          ? persons 
          : persons.filter((person) => { 
              return person.name.toLowerCase()
                .includes(searchQuery.toLowerCase()) 
            })
    return filteredPersons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm searchQuery={searchQuery} handleQueryChange={handleQueryChange} />
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      {filteredWithQuery().map((person) => 
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App