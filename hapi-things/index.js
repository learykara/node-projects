var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server();
server.connection({ port: 8080 });

var HAPPY_QUOTE = "Happiness can exist only in acceptance. -George Orwell";

server.route({
  method: 'GET',
  path: '/happy/quote',
  handler: function(request, reply) {
    reply(HAPPY_QUOTE);
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
