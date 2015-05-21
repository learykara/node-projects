var flappyBird = require('./flappybird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappybird.FlappyBird();
    app.run();
});
