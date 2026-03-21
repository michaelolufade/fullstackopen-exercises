require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('----------------------')
  next()
}

app.use(requestLogger)

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const msg = `PhoneBook has info for ${persons.length} people<br />${new Date()}`
    response.send(msg)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  Person.findByIdAndDelete(id, body, { new: true, runValidators: true })
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number || false,
  })
  person
    .save()
    .then((newPerson) => {
      response.json(newPerson)
    })
    .catch((error) => next(error))
})

app.patch('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  if (!body.number) {
    return response.status(403).send({ error: 'missing content' })
  }

  Person.findByIdAndUpdate(id, body, { new: true, runValidators: true }).then(
    (person) => {
      if (!person) {
        return response.status(404).send({ error: 'id not found' })
      } else {
        response.json(person)
      }
    },
  )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
