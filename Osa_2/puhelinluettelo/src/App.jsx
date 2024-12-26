import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState({active:false,message:'',color:'green'})

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
      setNotification({active:true,message:'Name shouldn\'t be empty!',color:'red'})
        setTimeout(() => {          
          setNotification({...notification, active:false})        
        }, 3000)
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
      setNotification({active:true,message:`The number of ${oldInstance.name} was updated`,color:'green'})
        setTimeout(() => {          
          setNotification({...notification, active:false})        
        }, 3000)
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
        setNotification({active:true,message:`Added ${newName}`,color:'green'})
        setTimeout(() => {          
          setNotification({...notification, active:false})        
        }, 3000)
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
        setNotification({active:true,
                        message:`the person '${oldInstance.name}' was already deleted from server`,
                        color:'red'})
        setTimeout(() => {          
          setNotification({...notification, active:false})        
        }, 3000)
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
        setNotification({active:true,
          message:`Deleted ${person.name}`,
          color:'green'})
        setTimeout(() => {          
          setNotification({...notification, active:false})        
        }, 3000)
        setPersons(persons.filter(n => n.id !== deletedPerson.id))
      })
      .catch(error => {
        setNotification({active:true,
          message:`the person '${oldInstance.name}' was already deleted from server`,
          color:'red'})
        setTimeout(() => {          
          setNotification({...notification, active:false})        
        }, 3000)
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
      <Notification 
        message={notification.message} 
        active={notification.active}
        color={notification.color}
      />
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