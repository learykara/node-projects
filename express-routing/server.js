var express = require('express');
var app = express();

var port = process.env.PORT || 8080;


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


// Start server
app.listen(port);
console.log('Listening on port ' + port);
