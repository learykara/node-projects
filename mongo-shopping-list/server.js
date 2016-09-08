const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const Item = require('./models/item')
const { DATABASE_URL, PORT } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/items', (req, res) => {
  Item.find((err, items) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error'
      })
    }
    res.json(items)
  })
})

app.post('/items', (req, res) => {
  Item.create({
    name: req.body.name,
  }, (err, item) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
    res.status(201).json(item)
  })
})

app.put('/items/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name

  Item.findOneAndUpdate({ _id: id }, { name }, { new: true }, (err, item) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
    res.status(200).json(item)
  })
})

app.delete('/items/:id', (req, res) => {
  const id = req.params.id

  Item.findOneAndRemove({ _id: id }, (err, snippet) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error',
      })
    }
    res.sendStatus(204)
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not found',
  })
})

const runServer = (callback) => {
  mongoose.connect(DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err)
    }

    app.listen(PORT, () => {
      console.log('Listening on localhost:', PORT)
      if (callback) {
        callback()
      }
    })
  })
}

if (require.main === module) {
  runServer((err) => {
    if (err) {
      console.error(err)
    }
  })
}

exports = {
  app,
  runServer,
}
