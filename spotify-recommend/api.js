const unirest = require('unirest')
const { EventEmitter } = require('events')

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

const onGetRelatedComplete = (response) => {
  let emitter = new EventEmitter()

  let artists = response.artists

  getTopTracks(artists).on('end', relatedArtists => {
    emitter.emit('end', relatedArtists)
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

module.exports = {
  getFromApi,
  getTopTracks,
  onGetRelatedComplete,
}
