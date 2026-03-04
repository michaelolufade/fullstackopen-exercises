import Person from './person'


const Numbers = ({persons}) => {
    return (
      <>
        <h2>Numbers</h2>
          {persons.map(person => (
            <Person key={person.id} name={person.name} number={person.number}/>
          ))}
      </>
    )
  }

  export default Numbers