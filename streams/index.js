const fs = require('fs')
const zlib = require('zlib')

const inFile = fs.createReadStream(process.argv[2])
const outFile = fs.createWriteStream(proecess.argv[3])

// 1. create a stream for reading the file (`inFile`)
// 2. pipe data from file into gzip stream (example of `Transform` stream --
//    takes in some data and transforms it into a gzip'ed version of the data)
// 3. pipe output from gzip stream into `outFile`
inFile.pipe(zlib.createGzip()).pipe(outFile)


/**
Readable streams
To begin reading data:
1. readable.on('data', chunk => {})
2. readable.pipe(writable)
3. readable.resume()
4. readable.read([size])
  - does not trigger flowing moze

To pause reading data:
1. readable.removeAllListeners('data')
2. readable.unpipe()
3. readable.pause()


Writable streams
No concept of flowing/paused modes.
Must indicate when there is no more data to be written using writable.end
1. writable.write(chunk[, encoding][, callback])
2. writable.end([chunk][, encoding][, callback])
3. writable.on('drain', callback)

**/
