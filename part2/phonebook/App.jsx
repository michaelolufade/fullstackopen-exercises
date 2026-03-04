import { useState } from 'react'
import Numbers from './components/numbers'
import PersonForm from './components/personForm'
import Filter from './components/filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setSearch] = useState("")
  const [personsToShow, setPersonsToShow] = useState(persons)

  const addNewPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      alert(`${newName} is already added to phonebook!`)
      setNewName("")
      setNewNumber("")
      return
    }

    if (!newName || !newNumber) {
      alert("Enter a valid name and phone number")
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const newPersonsList = persons.concat(newPerson)
    setPersons(newPersonsList)
    setSearch("")
    setPersonsToShow(newPersonsList)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} newSearch={newSearch} setSearch={setSearch} setPersonsToShow={setPersonsToShow}/>
      <PersonForm clickHandler={addNewPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <Numbers persons={personsToShow} />
    </div>
  )
}

export default App
