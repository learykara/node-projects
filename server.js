const express = require('express');

const { router } = require('./routes');

const app = express();
app.use(express.static('public'));
app.use('/', router);

app.listen(process.env.PORT || 8080);

exports.app = app;
