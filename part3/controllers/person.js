const personsRouter = require("express").Router()
const Person = require("../models/person")

personsRouter.get("/", (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes)
  })
})

// personsRouter.get('/info', (request, response) => {
//   Person.find({}).then((persons) => {
//     const msg = `PhoneBook has info for ${persons.length} people<br />${new Date()}`
//     response.send(msg)
//   })
// })

personsRouter.get("/:id", (request, response, next) => {
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

personsRouter.post("/", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
})

personsRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

personsRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.content = content
      person.important = important

      return person.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

personsRouter.patch("/:id", (request, response, next) => {
  const id = request.params.id
  const body = request.body

  Person.findByIdAndUpdate(id, body, {
    returnDocument: "after",
    runValidators: true,
  })
    .then((person) => {
      if (!person) {
        return response.status(404).send({ error: "id not found" })
      } else {
        response.json(person)
      }
    })
    .catch((error) => next(error))
})

module.exports = personsRouter
