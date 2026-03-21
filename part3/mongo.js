require("dotenv").config()
const mongoose = require("mongoose")

const name = process.argv[2]
const number = process.argv[3]

const url = `mongodb+srv://pb_db_user:${process.env.PASSWORD}@phonebook.l2z5pzh.mongodb.net/numbers?appName=Phonebook`

mongoose.set("strictQuery", false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (!name || !number) {
  console.log("Phonebook:")
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note.name, note.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`Added ${name}, ${number} to phonebook!`)
    mongoose.connection.close()
  })
}
