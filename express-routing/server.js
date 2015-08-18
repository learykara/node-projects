var express = require('express');
var app = express();

var port = process.env.PORT || 8080;


// Initialize router
var router = express.Router({
  mergeParams: true               // preserve req.params from parent router
});

// Apply routes to application
app.use(/^\/([nswe]+)/, router);


// Routes
router.get('/plot', function(req, res, next) {
  console.log(req.params[0]);
  res.send('Plotting journey');
});


// Start server
app.listen(port);
console.log('Listening on port ' + port);
