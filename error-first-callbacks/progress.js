var events = require('events');

// Create new event emitter
var progress = new events.EventEmitter();


progress.on('start', function() {
  console.log('`start` event emitted.');
});

progress.once('progress', function() {
  console.log('`progress` event emitted for the first time.')
})

progress.on('end', function() {
  console.log('`end` event emitted.');
});


progress.on('start', function() {
  for (var i=0; i<100; i++) {
    if (i % 10 === 0) {
      progress.emit('progress', i);
    }
  }

  progress.emit('end');
});

progress.on('progress', function(n) {
  console.log('Progress is at ' + n + '%');
});

progress.on('end', function() {
  console.log('Process completed.');
});


// Start counter
progress.emit('start');
