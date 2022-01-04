import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterStr, setFilterStr ] = useState('')
  const [ notification, setNotification ] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }
  useEffect(hook, [])

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.filter(person => 
      person.name.toLowerCase() === newName.toLowerCase())
    if (existing.length > 0) {
      const existingPerson = existing[0]
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, {name: existingPerson.name, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            notify(error.response.data.error)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          notify(`Added ${person.name}`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          notify(error.response.data.error)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterStrChange = (event) => {
    setFilterStr(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterStr.toLowerCase()))

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(error => {
        alert(`${person.name} was already deleted from server`)
        setPersons(persons.filter(p => p.id !== id))
      })
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterStr={filterStr}
        handleFilterStrChange={handleFilterStrChange}
      />
      <h3>Add new</h3>
      <Notification message={notification} />
      <PersonForm 
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App
