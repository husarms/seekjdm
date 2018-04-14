//var scrape = require('./scrape');
var scrapeABAutosAndImports = require('./scrapeABAutosAndImports');

// scrape(function(){
//     return true;
// });

scrapeABAutosAndImports(function (vehicles) {
    console.log("She called me back! " + vehicles.length + " vehicles found.");

    vehicles.forEach(function(vehicle){
       console.log(JSON.stringify(vehicle, null, 2));
    });
});
