class MusicPlayer extends Object {
  constructor(args) {
    super(args)
    this.listeners = {}
  }

  on(eventName, listener) {
    if (!this.listeners.hasOwnProperty(eventName)) {
      this.listeners[eventName] = [listener]
    }
    else {
      this.listeners[eventName].push(listener)
    }
  }

  emit(eventName) {
    if (!this.listeners.hasOwnProperty(eventName)) {
      return
    }

    const args = []
    for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i])
    }

    this.listeners[eventName].forEach((listener) => {
      listener.apply(null, args)
    })
  }
}

const player = new MusicPlayer()

player.on('start', (artist, song) => {
  console.log(`Starting audio stream playing ${artist} ${song}`)
})

player.on('stop', () => {
  console.log('Stoping audio stream')
})

player.on('start', () => {
  console.log('Updating UI to started state')
})

player.on('stop', () => {
  console.log('Updating UI to stopped state')
})

player.emit('start', 'Sleater Kinney', 'No Cities to Love')
player.emit('stop')


// Alternative using EventEmitter
const events = require('events')

const player2 = new events.EventEmitter()

player2.on('start', (artist, song) => {
  console.log(`Starting audio stream playing ${artist} ${song}`)
})

player2.on('stop', () => {
  console.log('Stoping audio stream')
})

player2.on('start', () => {
  console.log('Updating UI to started state')
})

player2.on('stop', () => {
  console.log('Updating UI to stopped state')
})

player.emit('start', 'Beyonce', 'Irreplaceable')
player.emit('stop')
