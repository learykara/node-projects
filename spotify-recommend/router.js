const express = require('express')

const { getFromApi, getTopTracks, onGetRelatedComplete } = require('./api')

const router = express.Router()

router.get('/search/:name', (req, res) => {
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

    relatedReq.on('end', (response) => {
      let artists = response.artists

      // This is working, but is it not "callback hell"?
      getTopTracks(artists).on('end', (relatedArtists) => {
        artist.related = relatedArtists
        res.json(artist)
      })
    })

    // Not working:
    // relatedReq.on('end', onGetRelatedComplete).on('end', relatedArtists => {
    //   artist.related = relatedArtists
    //   res.json(artist)
    // })

    relatedReq.on('error', (code) => {
      res.sendStatus(404)
    })

  })

  searchReq.on('error', (code) => {
    res.sendStatus(code)
  })
})

module.exports = router
