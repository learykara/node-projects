const express = require('express')
const unirest = require('unirest')
const { EventEmitter } = require('events')

const app = express()

app.use(express.static('public'))

const getFromApi = (endpoint, args) => {
  const emitter = new EventEmitter()
  unirest.
    get(`https://api.spotify.com/v1/${endpoint}`).
    qs(args).
    end((response) => {
      response.ok ?
        emitter.emit('end', response.body)
      : emitter.emit('error', response.code)
    })

    return emitter
}

app.get('/search/:name', (req, res) => {
  const searchReq = getFromApi('search', {
    q: req.params.name,
    limit: 1,
    type: 'artist',
  })

  searchReq.on('end', (item) => {
    const artist = item.artists.items[0]

    if (!artist) {
      return res.sendStatus(404)
    }

    const artistId = artist.id

    getFromApi(`artists/${artistId}/related-artists`, {
      limit: 5,
    }).on('end', (item2) => {
      artist.related = item2.artists
      res.json(artist)
    }).on('error', (code) => {
      res.sendStatus(404)
    })
  })

  searchReq.on('error', (code) => {
    res.sendStatus(code)
  })
})

app.listen(process.env.PORT || 8080)
