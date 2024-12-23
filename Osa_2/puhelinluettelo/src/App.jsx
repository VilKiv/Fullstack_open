import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

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
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
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
    return searchQuery.lenght === 0
          ? persons
          : persons.filter((person) => {
            person.name.toLowerCase().includes(searchQuery.toLowerCase())
          })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
      <div>
          filter shown with <input
            value={searchQuery}
            onChange={handleQueryChange}
          />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {filteredWithQuery().map((person) => 
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App