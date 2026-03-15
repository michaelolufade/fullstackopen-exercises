import personService from '../services/persons'


const DeleteBtn = ({name, id, setPersons, showNotification}) => {
  const handleDelete = () => {
    const result = window.confirm(`Delete ${name} ?`);

    if (result) {
      personService
        .remove(id)
        .then(() => personService.getAll())
        .then(updatedPhonebook => {
          setPersons(updatedPhonebook)
          showNotification(`Deleted ${name}`, "red")
          })
        .catch(() => {
          showNotification(`Information of ${name} has been removed from server`, "red")
          personService.getAll()
            .then(updatedPhonebook =>
              setPersons(updatedPhonebook)
        )
      }
    )}
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  )
}


const Person = ({name, number, id, setPersons, showNotification}) => {
    return (
      <li>{name} {number}
      <DeleteBtn key={id} name={name} id={id} setPersons={setPersons} showNotification={showNotification}/></li>
    )
}

export default Person
