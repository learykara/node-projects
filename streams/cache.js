const { Writable } = require('stream')

class Cache extends Writable {
  constructor(key, options) {
    super(options)
    this._key = key
    this._value = null
    this.on('finish', function() {
      Cache.store[this._key] = this._value
    })
  }

  _write(chunk, encoding, callback) {
    // Is encoding used?
    if (!this._value) {
      this._value = chunk
    }
    else {
      this._value = Buffer.concat([this._value, chunk])
    }
    callback()
  }
}

Cache.store = {}

module.exports = Cache
