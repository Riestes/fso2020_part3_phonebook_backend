const express = require('express')
const { request, response } = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        id: 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        id: 2
    },
    {
        "name": "Dan abramov",
        "number": "12-43-234345",
        id: 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        id: 4
    },
]

// GET PERSONS
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// INFO
app.get('/info', (request, response) => {
    const numOfPersons = persons.length
    const date = new Date()

    const info = `Phonebook has info for ${numOfPersons} people` + '<br>' + `${date}`

    response.send(info)
})

// SINGLE NAME
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// DELETE
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

// Generate new id for POST
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0
    return maxId + 1
}

// ADD (POST) PERSON
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'must receive name and number'
        })
    } else if (persons.find(person => 
        person.name.toLowerCase() === body.name.toLowerCase())){
        return response.status(400).json({
            error: 'name already added'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})