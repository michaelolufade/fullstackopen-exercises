require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")


const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use(express.static('dist'))


app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
            response.json(persons)
        })
})

app.get("/info", (request, response) => {
    Person.find({}).then(persons => {
        const msg = `PhoneBook has info for ${persons.length} people<br />${new Date()}`
        console.log(msg)
        response.send(msg)
    })
})

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const body = request.body

    console.log(id)
    console.log(body)

    Person.findByIdAndDelete(id, body,
        { new: true, runValidators: true }).then(person => {
        response.json(person)
    })
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number || false,
    })
    person.save().then(newPerson => response.json(newPerson))
})


app.patch("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const body = request.body

    Person.findByIdAndUpdate(id, body,
        { new: true, runValidators: true }).then(person => {
        response.json(person)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})