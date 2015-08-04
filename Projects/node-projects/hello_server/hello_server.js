var express = require('express');
var _ = require('lodash');

var app = express();

app.get('/', function(request, response) {
    response.send("Hello World");
});

app.get('/jedi', function(request, response) {
    response.send(
        "Hello, jedi. Visit /jedi/&lt;firstname&gt;/&lt;lastname&gt; " +
        "to learn your jedi name.");
});

app.get('/jedi/:firstname/:lastname', function(request, response) {
    var first = request.params.firstname &&
        request.params.firstname.toLowerCase();
    var last = request.params.lastname &&
        request.params.lastname.toLowerCase();
    var jediName = [last.slice(0, 3), first.slice(0, 2)].join("");

    response.json(
        {'jediName': _.capitalize(jediName)});
});

app.listen(8080);
