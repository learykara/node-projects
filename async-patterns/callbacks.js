const wait = (seconds, callback) => {
  setTimeout(() => {
    callback(new Date())
  }, seconds * 1000)
}

console.log('Console log before calling wait:', new Date())

const seconds = 3

wait(3, (date) => {
  console.log('Console log inside anonymous callback:', date)
}, seconds * 1000)

console.log('Console log after calling wait:', new Date())
