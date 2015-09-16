var Hapi = require('hapi');
var Good = require('good');

var quotes = require('./quotes.json');

var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8080
});

function choose(array) {
  return array[Math.floor(Math.random() * array.length)];
}

server.route({
  method: 'GET',
  path: '/happy/quote',
  handler: function(request, reply) {
    var quote = choose(quotes);
    reply('"' + quote.quote + '"  -' + quote.author);
  }
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, function(err) {
  if (err) {
    throw(err);
  }

  server.start(function() {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
