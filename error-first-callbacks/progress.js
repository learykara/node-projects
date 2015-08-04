var ProgressBar = function() {
  this.onStartCallback = null;
  this.onProgressCallback = null;
  this.onEndCallback = null;
};


// Register callbacks
ProgressBar.prototype.onStart = function(callback) {
  console.log('Registered start callback');
  this.onStartCallback = callback;
}

ProgressBar.prototype.onProgress = function(callback) {
  console.log('Registered progress callback');
  this.onProgressCallback = callback;
}

ProgressBar.prototype.onEnd = function(callback) {
  console.log('Registered end callback');
  this.onEndCallback = callback;
}

ProgressBar.prototype.start = function() {
  if (!this.onStartCallback) {
    return;
  }
  this.onStartCallback();
}

ProgressBar.prototype.progress = function(n) {
  if (!this.onProgressCallback) {
    return;
  }
  this.onProgressCallback(n);
}

ProgressBar.prototype.end = function() {
  if (!this.onEndCallback) {
    return;
  }
  this.onEndCallback();
}


// Initialize progress bar
var progress = new ProgressBar();

progress.onStart(function() {
  for (var i=0; i<100; i++) {
    if (i%10 === 0) {
      progress.progress(i);
    }
  }
  progress.end();
});

progress.onProgress(function(n) {
  console.log('Progress is at ' + n + '%');
});

progress.onEnd(function() {
  console.log('Process completed.')
});


// Start coutner
progress.start();
