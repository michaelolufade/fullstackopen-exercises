import { useState, useEffect } from "react";
import axios from "axios";


const API_KEY = import.meta.env.VITE_SOME_KEY


const getAllCountries = () => {
  const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
  return request.then(response => response.data)
}


const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca2.toLowerCase()}&limit=1&appid=${API_KEY}`)
      .then(response => response.data[0])
      .then(loc => {
        console.log(loc)
        setLocation([loc.lat, loc.lon])
    })
    }, [])


  useEffect(()=> {
    if (!location) {
      console.log("no location")
      return
    }
    const [lat, lon] = location
    console.log("There is location", lat, lon)
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&&appid=${API_KEY}`)
      .then(resp => console.log(resp))
  }, [location])

  return (
    <>
      <h1>{country.name.common}</h1>
      <li>Capital: {country.capital}</li>
      <li>Area: {country.area}</li>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt || `Flag of ${country.name.common}`}/>

      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather} Celcius</p>

      <img />

      <p>Wind {weather} m/s</p>
    </>
  )
}


const Country = ({countries, setViewedCountries}) => {
  if (!countries) {
    return
  }
  else if (countries.length > 10) {
    console.log(countries.length)
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length === 1) {
    return (
      <CountryInfo country={countries[0]} />
    )
  } else {
    return (
      <>
        {countries.map(country =>
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => setViewedCountries([country])}>Show</button>
          </li>)
        }
      </>
    )
  }
}


const App = () => {
  const [allCountries, setAllCountries] = useState(null)
  const [ViewedCountries, setViewedCountries] = useState(null)

  useEffect(() => {
    getAllCountries()
      .then(data => {
        setAllCountries(data)
      })
  }, [])

  const searchCountry = (searchString) => {
    const searchResult = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(searchString))

    if (searchResult.length === allCountries.length) {
      setViewedCountries(null)
    } else {
      setViewedCountries( searchResult)
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    searchCountry(event.target.value.toLowerCase())
  }

  return (
    <>
      Find Countries <input onChange={handleChange}/>
      <Country countries={ViewedCountries} setViewedCountries={setViewedCountries} />
    </>
  )
}

export default App