const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

// require('dotenv').config()
// const Note = require('./models/note')
// const express = require('express')
// const app = express()
// const cors = require('cors')
//
// let notes = [
//     {
//         id: 1,
//         content: "HTML is easy",
//         date: "2022-05-30T17:30:31.098Z",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only Javascript",
//         date: "2022-05-30T18:39:34.091Z",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         date: "2022-05-30T19:20:14.298Z",
//         important: true
//     }
// ]
//
// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }
// const morgan = require('morgan')
// morgan.token('type', function (req, res) {
//     return JSON.stringify(req.body)
// })
//
// app.use(cors())
// app.use(express.json())
// // app.use(express.static('build'))
// app.use(morgan(":method :url :status :res[content-length] - :response-time ms :type"))
// app.use(requestLogger)
// app.get('/api/notes', (request, response) => {
//     Note.find({}).then(notes => {
//         response.json(notes)
//     })
// })
//
// app.get('/api/notes/:id', (request, response) => {
//     Note.findById(request.params.id)
//         .then(note => {
//             if (note) {
//                 response.json(note)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch(error => {
//             console.log(error)
//             response.status(400).send({error: 'malformatted id'})
//         })
// })
//
// app.put('/api/notes/:id', (req, res, next) => {
//     const body = req.body
//     const note = {
//         id: body.name,
//         content: body.content,
//         date: new Date(),
//         important: body.important
//     }
//     Note.findByIdAndUpdate(req.params.id, note, {new: true, runValidators: true, context: 'query'})
//         .then(updatedNote => {
//             res.json(updatedNote)
//         })
//         .catch(error => next(error))
// })
// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => n.id))
//         : 0
//     return maxId + 1
// }
//
// app.post('/api/notes', (request, response) => {
//     const body = request.body
//
//     if (!body.content) {
//         return response.status(400).json({
//             error: 'content missing'
//         })
//     }
//
//     const note = new Note({
//             content: body.content,
//             important: body.important || false,
//             date: new Date()
//         }
//     )
//     note.save().then(savedNote => {
//         response.json(savedNote)
//     })
//
// })
//
// app.delete('/api/notes/:id', (request, response) => {
//     Note.findByIdAndRemove(request.params.id)
//         .then(result => {
//             response.status(204).end()
//         })
//         .catch(error => next(error))
// })
//
// const unknownEndpoint = (request, response) => {
//     response.status(404).send({error: 'unknown endpoint'})
// }
// app.use(unknownEndpoint)
//
// const errorHandler = (error, request, response, next) => {
//     console.error(error.message)
//
//     if (error.name === 'CastError') {
//         return response.status(400).send({error: 'malformatted id'})
//     } else if (error.name === 'ValidationError') {
//         return response.status(400).json({error: error.message})
//     }
//
//     next(error)
// }
//
// app.use(errorHandler)
// const PORT = process.env.PORT
// // const PORT = 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })