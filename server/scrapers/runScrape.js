//var scrape = require('./scrape');
var scrapeJapStarImports = require('./scrapeJapStarImports');

// scrape(function(){
//     return true;
// });

scrapeJapStarImports(function (vehicles) {
    console.log("She called me back! " + vehicles.length + " vehicles found.");

    vehicles.forEach(function(vehicle){
       console.log(JSON.stringify(vehicle, null, 2));
    });
});
