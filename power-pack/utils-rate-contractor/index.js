// Contractor utilities
// Rating a contractor
// node contractor-utils.js rate joe 5

var Database = require('contractor-db');

// Add a new rating for a contractor
// Overall calculated using a cumulative moving average
Database.prototype.rateContractor = function(name, rating) {
    this.store.findOne({name: name}, function(err, contractor) {
        if (err) {
            console.error('Could not find contractor');
            return;
        }
        var oldRating = contractor.rating;
        var numberOfRatings = contractor.numberOfRatings;
        var newRating = oldRating + (rating - oldRating) /
                        (numberOfRatings + 1);
        console.log('New rating for', name, 'is', newRating);

        this.store.update({
            _id: contractor._id
        }, {
            name:name, 
            rating: newRating,
            numberOfRatings: numberOfRatings + 1
        });
    }.bind(this));
};

// Utilities
var database = new Database();
if (process.argv[2] == 'rate') {
    database.rateContractor(process.argv[3], process.argv[4]);
}

