const Alphabet = require('./alphabet')
const Cache = require('./cache')

const alpha = new Alphabet()
const cache = new Cache('alpha2')

alpha.pipe(cache)

cache.on('finish', () => {
  console.log('Cache store:')
  for (var key in Cache.store) {
    console.log(`${key}: ${Cache.store[key]}`)
  }
})
