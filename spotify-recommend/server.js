const _ = require('lodash')
const express = require('express')
const unirest = require('unirest')
const { EventEmitter } = require('events')

const app = express()

app.use(express.static('public'))

const getFromApi = (endpoint, args) => {
  let emitter = new EventEmitter()
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

const getTopTracks = (relatedArtists) => {
  let emitter = new EventEmitter()
  let fetched = 0

  const checkComplete = () => {
    if (fetched === relatedArtists.length) {
      // Yey you're done! Now do something about it.
      console.log('Finished fetching all top tracks')
      emitter.emit('end', relatedArtists)
    }
  }

  relatedArtists.forEach((relatedArtist) => {
    console.log(`Getting top tracks for ${relatedArtist.id}`)
    getFromApi(
        `artists/${relatedArtist.id}/top-tracks`, { country: 'US' })
      .on('end', (response) => {
        console.log('Success')
        relatedArtist.tracks = response.tracks
        fetched += 1
        checkComplete()
      })
      .on('error', (code) => {
        console.error(`Error fetching tracks for artist ${relatedArtist.id}`)
        relatedArtist.tracks = []
        fetched += 1
        checkComplete()
      })
  })

  return emitter
}

app.get('/search/:name', (req, res) => {
  const searchReq = getFromApi('search', {
    q: req.params.name,
    limit: 1,
    type: 'artist',
  })

  searchReq.on('end', (searchResp) => {
    const artist = searchResp.artists.items[0]

    if (!artist) {
      return res.sendStatus(404)
    }

    const artistId = artist.id

    const relatedReq = getFromApi(`artists/${artistId}/related-artists`, {
      limit: 5
    })

    relatedReq.on('end', (relatedResp) => {
      console.log('Finished getting related artists.')
      const artists = relatedResp.artists

      getTopTracks(artists).on('end' , relatedArtists => {
        artist.related = relatedArtists
        res.json(artist)
      })
    })

    relatedReq.on('error', (code) => {
      res.sendStatus(404)
    })

  })

  searchReq.on('error', (code) => {
    res.sendStatus(code)
  })
})

app.listen(process.env.PORT || 8080)
