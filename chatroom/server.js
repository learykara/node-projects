const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
app.use(express.static('public'))

const server = http.Server(app)
const io = socketIo(server)

const allUsers = []
const typingUsers = []

io.on('connection', (socket) => {
  console.log('Client connected')
  io.emit('updateUserCount', allUsers.length)

  socket.on('newUser', (username) => {
    console.log(`New user detected: ${username}`)
    socket.broadcast.emit('newUser', username)

    allUsers.push(username)
    io.emit('updateUserCount', allUsers.length)
  })

  socket.on('typing', (username) => {
    typingUsers.indexOf(username) === -1 && typingUsers.push(username)
    socket.broadcast.emit('typing', typingUsers)
  })

  socket.on('doneTyping', (username) => {
    typingUsers.pop(username)
    socket.broadcast.emit('doneTyping')
  })

  socket.on('message', (message, username) => {
    console.log(`Received message: ${message}`)
    socket.broadcast.emit('message', message, username)
  })

  socket.on('userExit', (username) => {
    console.log(`${username} left the chat.`)
    allUsers.pop(username)
    typingUsers.pop(username)

    socket.broadcast.emit('userExit', username)

    io.emit('updateUserCount', allUsers.length)
  })
})

server.listen(process.env.PORT || 8080)
