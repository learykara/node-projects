var bodyParser = require('body-parser');
var Express = require('express');
var swig = require('swig');

var app = new Express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded());

var formItems = [
  {
    'identifier': 'female_name',
    'display': 'A female name'
  },
  {
    'identifier': 'dirty_task',
    'display': 'A dirty task'
  },
  {
    'identifier': 'obnoxious_celebrity',
    'display': 'An obnoxious celebrity'
  },
  {
    'identifier': 'job_title',
    'display': 'A job title'
  },
  {
    'identifier': 'celebrity',
    'display': 'A celebrity'
  },
  {
    'identifier': 'huge_number',
    'display': 'A huge number'
  },
  {
    'identifier': 'tedious_task',
    'display': 'A tedious task'
  },
  {
    'identifier': 'useless_skill',
    'display': 'A useless skill'
  },
  {
    'identifier': 'adjective',
    'display': 'An adjective'
  }
];

app.get('/', function (req, res) {
  res.render('input', {formItems: formItems});
});

app.post('/', function (req, res) {
  res.render('output', req.body);
});

app.listen(8080);
console.log('Listening on 8080...');
