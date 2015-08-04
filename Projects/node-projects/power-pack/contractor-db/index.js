var path = require('path');

var Datastore = require('nedb');

// Database layer
var Database = function() {
    this.store = new Datastore({
        filename: path.join(__dirname, 'contractors.db'),
        autoload: true
    });
};

module.exports = Database;

