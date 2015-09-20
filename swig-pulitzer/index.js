var Express = require('express');
var swig = require('swig');

var app = new Express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  res.render('index', {name: 'Kara'});
});

app.listen(8080);
console.log('Listening on 8080...');
