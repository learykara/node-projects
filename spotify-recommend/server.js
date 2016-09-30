const _ = require('lodash')
const express = require('express')

const router = require('./router')

const app = express()

app.use(express.static('public'))

app.use('/', router)

app.listen(process.env.PORT || 8080)
