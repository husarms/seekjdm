var scrape = require('./scrape');
// var scrapeMontuMotors = require('./scrapeMontuMotors');

scrape(function(){
    return true;
});

// scrapeMontuMotors(function (vehicles) {
//     console.log("She called me back! " + vehicles.length + " vehicles found.");
//
//     vehicles.forEach(function(vehicle){
//        console.log(JSON.stringify(vehicle, null, 2));
//     });
// });
