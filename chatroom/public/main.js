document.addEventListener("DOMContentLoaded", () => {
  const socket = io()

  const input = document.getElementById('input')
  const messages = document.getElementById('messages')

  const addMessage = (message) => {
    const newMessage = document.createElement('div')
    newMessage.innerText = message
    messages.appendChild(newMessage)
  }

  input.addEventListener('keydown', (event) => {
    if (event.keyCode !== 13) {
      return
    }

    const message = input.value
    addMessage(input.value)
    socket.emit('message', message)
    input.value = ''
  })

  socket.on('message', addMessage)
});
