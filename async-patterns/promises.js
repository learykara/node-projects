const promise = new Promise(function(resolve) {
  resolve('Success!')
})

promise.then((result) => {
  console.log(result)
  // => Success!
  return result + '!'
}).then((result) => {
  console.log(result)
  return result + '!'
}).then((result) => {
  console.log(result)
  return result + '!'
})

// console.log(promise)

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date())
    }, seconds * 1000)
  })
}

console.log('Console.log before calling wait:', new Date())

wait(3).then(date => {
  console.log('Console.log after three seconds:', date)
  return wait(1)
}).then(date => {
  console.log('Console.log after one second:', date)
  return wait(5)
}).then(date => {
  console.log('Console.log after five seconds:', date)
})

console.log('Console.log after calling wait:', new Date())
