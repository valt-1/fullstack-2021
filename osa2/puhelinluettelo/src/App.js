import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '') {
      alert('Please enter a name')
      return
    }

    const nameMatches = persons.filter(person => 
      person.name.toLowerCase() === newName.toLowerCase())
    if (nameMatches.length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    const personObject = {
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )

}

export default App
