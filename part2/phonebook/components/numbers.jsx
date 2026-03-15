import Person from './person'


const Numbers = ({persons, newSearch, setPersons, showNotification}) => {
  const searchResult = persons.filter(person => (person.name.toLowerCase().startsWith(newSearch.toLowerCase())))

    return (
      <>
        <h2>Numbers</h2>
          {searchResult.map(person => (
            <Person key={person.id} name={person.name} number={person.number} id={person.id} setPersons={setPersons} showNotification={showNotification}/>
          ))}
      </>
    )
  }

  export default Numbers