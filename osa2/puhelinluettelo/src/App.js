import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterStr, setFilterStr ] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert('Please enter a name and a number')
      return
    }
    const nameMatches = persons.filter(person => 
      person.name.toLowerCase() === newName.toLowerCase())
    if (nameMatches.length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
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
