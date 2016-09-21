const { Readable, Transform, Writable } = require('stream')

class RandomNumbers extends Readable {
  constructor(nValues, options) {
    super(options)
    this._total = nValues
    this._nVals = 0
  }

  _read() {
    const number = Math.round(Math.random() * 100)
    // Is the best way to do this converting the integer to a string?
    const buf = new Buffer.from(number.toString(), 'utf8')
    this.push(buf)
    this._nVals++
    if (this._nVals === this._total) {
      this.push(null)
    }
  }
}

class Multiply extends Transform {
  constructor(factor, options) {
    super(options)
    this._factor = factor
  }

  _transform(chunk, encoding, callback) {
    const number = parseInt(chunk.toString())
    const multiplied = number * this._factor
    console.log(`Original: ${number}`)
    const buf = new Buffer.from(multiplied.toString(), 'utf8')
    this.push(buf)
    callback()
  }
}

class PrintToConsole extends Writable {
  constructor(options) {
    super(options)
  }

  _write(chunk, encoding, callback) {
    console.log(`Multiplied: ${chunk.toString()}\n`)
    callback()
  }
}

module.exports = {
  Multiply,
  PrintToConsole,
  RandomNumbers,
}
