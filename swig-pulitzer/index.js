var bodyParser = require('body-parser');
var Express = require('express');
var swig = require('swig');

var app = new Express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
  res.render('input');
});

app.post('/', function (req, res) {
  res.render('output', req.body);
});

app.listen(8080);
console.log('Listening on 8080...');
