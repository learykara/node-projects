var express = require('express');

var app = express();

app.get('/headers', function (req, res) {
  res.json(req.headers);
});

app.get('/headers/:headerName', function (req, res) {
  res.json(req.headers[req.params.headerName]);
});

app.get('/version', function (req, res) {
  res.json(req.httpVersion);
});

app.listen(8090);
