const { EventEmitter } = require('events')

const progress = new EventEmitter()

progress.on('start', () => {
  console.log('Starting progress bar')
})

progress.on('status', (pct) => {
  console.log(`${pct}% complete`)
})

progress.on('end', () => {
  console.log('Finished')
})

function progressBar(total) {
  progress.emit('start')
  for (var i of Array(total).keys()) {
    if (i % 10 === 0) {
      progress.emit('status', i)
    }
  }
  progress.emit('end')
}

progressBar(100)
