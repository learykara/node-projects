const events = require('events')
const fs = require('fs')
const path = require('path')

const countLines = (file, cb) => {
  let lines = 0
  const reader = fs.createReadStream(file)
  reader.on('end', () => {
    console.log(`${file}: ${lines}`)
    cb(null, lines)
  })
  reader.on('data', (data) => {
    lines += data.toString().split('\n').length - 1
  })
  reader.on('error', (err) => {
    cb(err)
  })
}

const onReadDirComplete = (err, files) => {
  if (err) throw err

  let totalLines = 0
  let completed = 0

  const checkComplete = () => {
    if (completed === files.length) {
      console.log(`Total: ${totalLines}`)
    }
  }

  files.forEach((file) => {
    countLines(path.join(process.argv[2], file), (err, lines) => {
      if (err) {
        if (err.code === 'EISDIR') {
          // Subdirectory
        } else {
          console.error(err)
        }
      } else {
        totalLines += lines
      }
      completed += 1
      checkComplete()
    })
  })
}

fs.readdir(process.argv[2], onReadDirComplete)
