const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const { BasicStrategy } = require('passport-http')

const User = require('./user-model')

const app = express()

const jsonParser = bodyParser.json()

const strategy = new BasicStrategy((username, password, callback) => {
  User.findOne({
    username,
  }, (err, user) => {
    if (err) {
      callback(err)
      return
    }

    if (!user) {
      return callback(null, false, {
        message: 'Incorrect username.',
      })
    }

    user.validatePassword(password, (err, isValid) => {
      if (err) {
        return callback(err)
      }

      if (!isValid) {
        return callback(null, false, {
          message: 'Incorrect password.'
        })
      }

      return callback(null, user)
    })
  })
})

passport.use(strategy)

app.use(passport.initialize())

const checkRequiredField = (req, name, type) => {
  if (!(name in req.body)) {
    return {
      valid: false,
      status: 422,
      message: `Missing field: ${name}`
    }
  }

  let fieldVal = req.body[name]

  if (typeof fieldVal !== type) {
    return {
      valid: false,
      status: 422,
      message: `Incorrect field type: ${name}`
    }
  }

  fieldVal = fieldVal.trim()

  if (!fieldVal.length) {
    return {
      valid: false,
      status: 422,
      message: `Incorrect field length: ${name}`
    }
  }

  return {
    valid: true,
    value: fieldVal,
  }
}

app.get('/hidden', passport.authenticate('basic', { session: false }), (req, res) => {
  res.json({
    message: 'Luke... I am your father'
  })
})

app.post('/users', jsonParser, (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'No request body',
    })
  }

  const userCheck = checkRequiredField(req, 'username', 'string')

  if (!userCheck.valid) {
    return res.status(userCheck.status).json({
      message: userCheck.message,
    })
  }

  const username = userCheck.value

  const passwordCheck = checkRequiredField(req, 'password', 'string')

  if (!passwordCheck.valid) {
    return res.status(passwordCheck.status).json({
      message: passwordCheck.message,
    })
  }

  const password = passwordCheck.value

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json({
        message: 'Interval server error',
      })
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error',
        })
      }

      const user = new User({
        username,
        password: hash,
      })

      user.save(err => {
        if (err) {
          return res.status(500).json({
            message: 'Internal server error',
          })
        }
        return res.status(201).json({})
      })
    })
  })
})

mongoose.connect('mongodb://localhost/auth').then(() => {
  app.listen(process.env.PORT || 8080)
})
