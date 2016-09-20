const Alphabet = require('./alphabet')

const alpha = new Alphabet()

alpha.on('data', chunk => {
  console.log(chunk.toString())
})
