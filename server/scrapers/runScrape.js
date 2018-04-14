//var scrape = require('./scrape');
var scrapeRHDSpecialties = require('./scrapeRHDSpecialties');

// scrape(function(){
//     return true;
// });

scrapeRHDSpecialties(function (vehicles) {
    console.log("She called me back! " + vehicles.length + " vehicles found.");

    vehicles.forEach(function(vehicle){
       console.log(JSON.stringify(vehicle, null, 2));
    });
});
