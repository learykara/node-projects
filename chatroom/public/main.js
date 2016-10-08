const addMessage = (message, username) => {
  const messages = document.getElementById('messages')
  let newMessage = document.createElement('div')
  const messageContent = document.createElement('span')
  messageContent.innerText = message
  if (username) {
    const messageUsername = document.createElement('strong')
    messageUsername.innerText = `${username}: `
    newMessage.appendChild(messageUsername)
    newMessage.appendChild(messageContent)
  } else {
    newMessage.appendChild(messageContent)
  }
  messages.appendChild(newMessage)
}

const notifyNewConnection = (username) => {
  addMessage(`${username} joined the chat.`)
}

const notifyUserExit = (username) => {
  addMessage(`${username} left the chat.`)
}

const listenForMessages = (socket) => {
  const messageInput = document.getElementById('message')
  let typingTimer;

  messageInput.addEventListener('keyup', (event) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      console.log('finished typing')
      finishedTyping(socket)
    }, 3000)
  })

  messageInput.addEventListener('keydown', (event) => {
    if (event.keyCode !== 13) {
      clearTimeout(typingTimer)
      socket.emit('typing', window.userName)
      return
    }

    const message = messageInput.value
    addMessage(messageInput.value, window.userName)
    socket.emit('message', message, window.userName)
    messageInput.value = ''
  })

  socket.on('message', addMessage)
}

const finishedTyping = (socket) => {
  console.log('yooo')
  socket.emit('doneTyping', window.userName)
}

const enterChatroom = () => {
  const portal = document.getElementById('portal')
  const chatroom = document.getElementById('chatroom')
  portal.classList.add('hidden')
  chatroom.classList.remove('hidden')
}

const listenForUsers = (socket) => {
  const nameInput = document.getElementById('username')

  nameInput.addEventListener('keydown', (event) => {
    if (event.keyCode !== 13) {
      return
    }

    let name = nameInput.value

    if (!name) {
      alert('Username required.')
      return
    }

    socket.emit('newUser', name)
    window.userName = name
    enterChatroom()
  })

  socket.on('newUser', notifyNewConnection)
  socket.on('userExit', notifyUserExit)
}

const updateTypers = (usernames) => {
  const typers = document.getElementById('typers')
  typers.innerText = (usernames && usernames.length) ?
      usernames.join(', ')
    : 'No one'
}

document.addEventListener("DOMContentLoaded", () => {
  const socket = io()

  listenForMessages(socket)
  listenForUsers(socket)

  socket.on('updateUserCount', (count) => {
    const userCounter = document.getElementById('user-count')
    userCounter.innerText = `${count} ${count === 1 ? 'person' : 'people'}`
  })

  socket.on('typing', updateTypers)
  socket.on('doneTyping', updateTypers)

  window.addEventListener('beforeunload', (event) => {
    socket.emit('userExit', window.userName)
  })
});
