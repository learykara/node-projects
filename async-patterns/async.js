console.log('Console log before calling wait:', new Date())

async function wait(seconds) {
  await setTimeout(() => {
    console.log('Console log after async await:', new Date())
  }, seconds * 1000)
}

(async function() {
  const foo = await wait(3)
  const bar = await wait(1)
  const baz = await wait(5)
}())

console.log('Console log after calling wait:', new Date())
