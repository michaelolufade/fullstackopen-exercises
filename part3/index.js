const express = require("express")
const morgan = require("morgan")
const cors = require("cors")


const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use(express.static('dist'))


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const msg = `PhoneBook has info for ${persons.length} people<br />${new Date()}`
    console.log(msg)
    response.send(msg)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (!person) {
        response.status(404).end()
    }
    response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    let newId = String(Math.ceil(Math.random() * 100))
    while (persons.find(person => person.id === newId)) {
        newId = String(Math.floor(Math.random() * 100))
    }
    return newId
}

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(person =>
        person.name.toLowerCase() === body.name.toLowerCase()
    )) {
        return response.status(405).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    console.log(newPerson)

    persons = persons.concat(newPerson)
    response.json(persons)
})


app.patch("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const body = request.body
    console.log(persons)

    persons = persons.map(person => person.id === id ? { ...person, number: body.number } : person)

    response.json(persons)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})