var express = require('express');
var path = require('path');

var names = require('./names.json');

var app = express();
app.use(require('body-parser')());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/form.html"));
});

app.post('/', function(req, res) {
    var genre = req.body.genre;

    var nameStart = Math.floor(Math.random() * 3);
    var nameEnd = Math.floor(Math.random() * 3);

    var bandName = [
            names[genre].part_1[nameStart],
            names[genre].part_2[nameEnd]
        ].join(' ');

    res.send(bandName);
});

app.get('/names', function(req, res) {
    res.json(names);
});

app.listen(8080);
