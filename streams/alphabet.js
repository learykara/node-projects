const stream = require('stream')

function Alphabet(options) {
  stream.Readable.call(this, options)
  this._start = 'a'
  this._end = 'z'
  this._curr = this._start.charCodeAt(0)
}

Alphabet.prototype = Object.create(stream.Readable.prototype)
Alphabet.prototype.constructor = Alphabet

Alphabet.prototype._read = () => {
  const letter = String.fromCharCode(this._curr)
  const buf = new Buffer(letter, 'utf8')
  // Error here -- what is it pushing `buf` onto?
  this.push(buf)
  this._cur++
  if (letter === this._end) {
    this.push(null)
  }
}

module.exports = Alphabet
