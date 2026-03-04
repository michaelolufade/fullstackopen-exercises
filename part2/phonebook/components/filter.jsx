const Filter = ({persons, newSearch, setSearch, setPersonsToShow}) => {
    const handleSearch = (event) => {
      const searchString = event.target.value
      setSearch(searchString)
      const searchResult = persons.filter(person => (person.name.toLowerCase().startsWith(searchString.toLowerCase())))

      if (searchResult) {
        setPersonsToShow(searchResult)
      }
      else {
        setPersonsToShow(persons)
      }
    }

    return (
      <>
        <div>
          Search contact: <input value={newSearch} onChange={handleSearch}/>
        </div>
      </>
    )
  }

  export default Filter