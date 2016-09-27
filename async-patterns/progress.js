function progressBar(total, onStart, onProgress, onEnd) {
  onStart()
  for (var i of Array(total).keys()) {
    console.log(i)
    if (i % 10 === 0) {
      onProgress(i)
    }
  }
  onEnd()
}

function startFn() { console.log('Starting progress bar') }
function progressFn(pct) { console.log(`${pct}% complete`) }
function endFn() { console.log('Finished') }

progressBar(100, startFn, progressFn, endFn)
