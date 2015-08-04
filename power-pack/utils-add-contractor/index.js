// Contractor utilities
// Usage example:
// Add a new contractor
// node contractor-utils.js add kara

var Database = require('contractor-db');

// Adds a new contractor, starting with a zero rating
Database.prototype.addContractor = function(name) {
    console.log('Adding contractor %s', name);
    this.store.insert({
        name: name,
        rating: 0,
        numberOfRatings: 0
    });
};

// Utilities
var database = new Database();
if (process.argv[2] == 'add') {
    database.addContractor(process.argv[3], 0);
}

