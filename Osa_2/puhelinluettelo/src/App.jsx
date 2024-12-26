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
    }
    const oldInstance = persons.find((person) => person.name === newName)
    if (oldInstance) {
      if (!window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
        )) {
          return
      }
      updateNumber(oldInstance)
      setNewName('')
      setNewNumber('')
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

  const updateNumber = (oldInstance) => {
    const updatedPerson = { ...oldInstance, number: newNumber }
    personService
      .update(oldInstance.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id != returnedPerson.id ? person : returnedPerson))
      })
      .catch(error => {
        alert(
          `the person '${oldInstance.name}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== oldInstance.id))
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (!window.confirm(`Do you want to delete ${person.name}?`)) {
      return
    }
    personService
      .deletePerson(id)
      .then((deletedPerson) => {
        setPersons(persons.filter(n => n.id !== deletedPerson.id))
      })
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== id))
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
      <FilterForm 
        searchQuery={searchQuery} 
        handleQueryChange={handleQueryChange} 
      />
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
        <Person
          key={person.name}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />

      )}
    </div>
  )
}

export default App