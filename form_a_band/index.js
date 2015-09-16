var express = require('express');
var path = require('path');

var names = require('./names.json');

var app = express();
app.use(require('body-parser')());

function choose(array) {
    return array[Math.floor(Math.random() * array.length)];
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/form.html"));
});

app.post('/', function(req, res) {
    var genre = req.body.genre;

    var bandName= [
        choose(names[genre].part_1),
        choose(names[genre].part_2)
    ].join(' ')

    res.send(bandName);
});

app.get('/names', function(req, res) {
    res.json(names);
});

app.listen(8080);
