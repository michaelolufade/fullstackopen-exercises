const Filter = ({ newSearch, setSearch}) => {
    const handleSearch = (event) => {
      const searchString = event.target.value
      setSearch(searchString)
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