const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.methods.validatePassword = (password, callback) => {
  // TODO -- can't access this.password for some reason :(
  console.log(password, this.password)
  // logs out `asdfasdf undefined`
  bcrypt.compare(password, this.password, (err, isValid) => {
    if (err) {
      callback(err)
      return
    }
    callback(null, isValid)
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = User
