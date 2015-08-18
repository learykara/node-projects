var express = require('express');

var app = express();
var port = process.env.PORT || 8080;


// Initialize router, set mergeParams to true to preserve
// req.params from parent router
var router = express.Router(mergeParams=true);


// Routes
router.get('/plot', function(req, res, next) {
  res.send('Plotting journey');
});


// Apply routes to application
app.use('/', router);


// Start server
app.listen(port);
console.log('Listening on port ' + port);
