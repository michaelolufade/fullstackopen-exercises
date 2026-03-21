import { useState, useEffect } from 'react'
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
  const [newNotification, setNotification] = useState({ message: "", color: "" })

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const showNotification = (message, color) => {
    setNotification(
      { message, color }
    )
    setTimeout(() => {
      setNotification({ message: "", color: "" })
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
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      const resp = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)

      if (resp) {
        personService.update(existingPerson.id, newNumber).then(updatedPerson => {
          setPersons(persons.map(
            person => person.id === existingPerson.id ? updatedPerson : person))
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
          setPersons(persons.concat(response))
          showNotification(`Added ${newPerson.name}`, "green")
        })
        .catch(error => {
          console.log(error.response.data)
          showNotification(error.response.data.error, "red")
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
