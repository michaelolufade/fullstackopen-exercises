const PersonForm = ({clickHandler, newName, setNewName, newNumber, setNewNumber}) => {
    return (
      <>
        <h2>Add a new Contact</h2>
        <form>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>

        <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
            <button type="submit" onClick={clickHandler}>add</button>
          </div>
        </form>
      </>
    )
  }


export default PersonForm