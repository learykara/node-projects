const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
app.use(express.static('public'))

const server = http.Server(app)
const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`)
    socket.broadcast.emit('message', message)
  })
})

server.listen(process.env.PORT || 8080)
