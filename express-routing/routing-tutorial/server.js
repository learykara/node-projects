var express = require('express');

var app = express();
var port = process.env.PORT || 8080;


// Routes
// Standard route as done in hello_server project:
app.get('/sample', function(req, res) {
  res.send('This is a sample!');
});


// Get an instance of the router
var router = express.Router();


// Router middleware that will happen on every request
// (**order is important -- needs to come before route
// if we want it to run before route)
router.use(function(req, res, next) {
  // Log each request to the console
  console.log(req.method, req.url);

  // Continue to what we were doing and go to the route
  next();
});

// Route middleware to validate :name
router.param('name', function(req, res, next, name) {
  // Do validation on name here
  console.log('Doing name validation on ' + name);

  // Once validation done, save new item in req
  req.name = name;
  next();
});


// Home page route
router.get('/', function(req, res) {
  res.send("I'm the home page!");
});

// About page route
router.get('/about', function(req, res) {
  res.send("I'm the about page!");
});

// Route with parameters
router.get('/hello/:name', function(req, res) {
  res.send('Hello ' + req.params.name + '!');
});


// Apply the routes to our application
app.use('/', router);  // Can define a default root: `app.use('/api', router);


// Use app.route to define multiple actions on a single route
app.route('/login').
  get(function(req, res) {
    res.send('This is the login form');
  }).
  post(function(req, res) {
    console.log('Processing');
    res.send('Processing the login form!');
  });



// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
