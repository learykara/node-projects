var express = require('express');
var _ = require('lodash');

// Import map
var map = require('./map.json');

var app = express();
var port = process.env.PORT || 8080;

// Define constants
var START = 's';
var GRUE = 'g';
var END = 'e';

// Initialize router
var router = express.Router({
  mergeParams: true               // preserve req.params from parent router
});

// Apply routes to application
app.use(/^\/([nswe]+)/, router);

var directions = {
  'n': 'north',
  's': 'south',
  'w': 'west',
  'e': 'east'
}

// Routes
router.get('/plot', function(req, res, next) {
  var journey = req.params[0].split('');
  var journeyLong = [];

  for (var i=0; i<journey.length; i++) {
    journeyLong.push(directions[journey[i]]);
  }

  res.send('You plan to travel ' + journeyLong.join(', then '));
});

router.get('/travel', function(req, res, next) {
  var journey = req.params[0].split('');

  // Determine start coordinates and map dimensions
  var yLen = map.length;
  var yPos = _.findIndex(map, function(row) {
    return row.indexOf(START) > -1;
  });

  var xLen = map[0].length;
  var xPos = map[yPos].indexOf(START);

  // Make the journey
  for (var i=0; i<journey.length; i++) {

    if (journey[i] === 'n') { yPos--; }
    else if (journey[i] === 's') { yPos++; }
    else if (journey[i] === 'w') { xPos--; }
    else if (journey[i] === 'e') { xPos++; }

    // Check if we've traveled off the map
    if (
        xPos < 0 || xPos > xLen - 1 ||
        yPos < 0 || yPos > yLen - 1) {
      res.send('You off the grid, man. Peace out.');
      return;
    }

    // What beasts await at our new location?
    var newLocationValue = map[yPos][xPos];

    if (newLocationValue === GRUE) {
      res.send('You dead, man');
      return;
    }

    else if (newLocationValue === END) {
      res.send('CONGRATS BRO! YOU MADE IT!!');
      return;
    }
  }

  // Nothing to report. Keep on keepin' on.
  res.send("Keep on keepin' on, bro.");
});


// Start server
app.listen(port);
console.log('Listening on port ' + port);
