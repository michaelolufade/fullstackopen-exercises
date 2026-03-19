import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/numbers'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import personService from './services/persons'
import Notification from './components/notification'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setSearch] = useState("")
  const [newNotification, setNoification] = useState({ message: "", color: "" })

  useEffect(() => {
    axios.get("http://localhost:3001/api/persons").then(response => {
      setPersons(response.data)
    })
  }, [])

  const showNotification = (message, color) => {
    setNoification(
      { message, color }
    )
    setTimeout(() => {
      setNoification({ message: "", color: "" })
    }, 5000)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if (!newName || !newNumber) {
      alert("Enter a valid name and phone number")
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      const resp = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)

      if (resp) {
        personService.update(existingPerson.id, newNumber).then(updatedPersons => {
          // const newPersonsList = persons.map(person => person.id === existingPerson.id ? updatedPerson : person)
          setPersons(updatedPersons)
          showNotification(`Successfully updated phone number for ${existingPerson.name}`, "green")
        })
      }
      else {
        return
      }
    }
    else {
      personService.create(newPerson)
        .then(response => {
          setPersons(response)
          showNotification(`Added ${newPerson.name}`, "green")
        })
    }
    setSearch("")
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification.message} color={newNotification.color} />
      <Filter newSearch={newSearch} setSearch={setSearch} />
      <PersonForm clickHandler={addNewPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <Numbers persons={persons} newSearch={newSearch} setPersons={setPersons} showNotification={showNotification} />
    </div>
  )
}

export default App
