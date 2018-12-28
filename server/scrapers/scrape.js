const scrapeJapaneseClassics = require('./scrapeJapaneseClassics');
const scrapeJDMAutoImports = require('./scrapeJdmAutoImports');
const scrapeImportAVehicle = require('./scrapeImportAVehicle');
const scrapeMontuMotors = require('./scrapeMontuMotors');
const scrapeABAutosAndImports = require('./scrapeABAutosAndImports');
const scrapeRHDSpecialties = require('./scrapeRHDSpecialties');
const dbHelper = require('../db/dbHelper');
const config = require('../../config');

var scrape = function (callback) {
    var currentVehicles = [];
    const currentStartTime = new Date().getTime();
    console.log("Determining need to scrape...");

    dbHelper.GetVehicles(function (result) {
        const lastVehicles = result;
        const lastVehicleTimestamp = lastVehicles[0].timestamp;
        const lastStartTime = new Date(lastVehicleTimestamp);
        const diffMs = currentStartTime - lastStartTime;
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        const scrapeInterval = parseInt(config.scrapeInterval);
        
        //Only re-scrape after a set amount of time has passed
        if (diffMins < scrapeInterval) {
            console.log("Scrape last ran " + diffMins + " minutes ago, scrape interval set to " +
                scrapeInterval + " minutes, returning...");
            callback(0);
            return;
        }
    
        //Otherwise, let's go!
        console.log("Running scrape...");

        var scrapers = [
            function () {
                scrapeJDMAutoImports(function (vehicles) {
                    console.log("She called me back! " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeJapaneseClassics(function (vehicles) {
                    console.log("She called me back! " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeImportAVehicle(function (vehicles) {
                    console.log("She called me back! " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeMontuMotors(function (vehicles) {
                    console.log("She called me back! " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeABAutosAndImports(function (vehicles) {
                    console.log("She called me back! " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeRHDSpecialties(function (vehicles) {
                    console.log("She called me back! " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            }
        ];

        const scrapersLength = scrapers.length;
        // Call all scrapers
        while (scrapers.length) {
            scrapers.shift().call();
        }

        var callbackCount = 0;
        function scraperCallback() {
            callbackCount++;
            // Once all scrapers have finished write out to file
            if (callbackCount === (scrapersLength)) {
                // Save data from last run so we can compare
                console.log(currentVehicles.length + " vehicles found in current run...");
                processResults();
            }
        }

        function sortByTimestamp(array) {
            return array.sort(function (a, b) {
                a = new Date(a.timestamp);
                b = new Date(b.timestamp);
                return a > b ? -1 : a < b ? 1 : 0;
            });
        }

        /*
        * Get new vehicles and update db
        */
        function processResults() {
            dbHelper.GetVehicles(function (result) {
                var lastVehicles = result;
                console.log(lastVehicles.length + " vehicles found last time");
                //Find new vehicles
                var newVehiclesCount = 0;
                for (var i = 0; i < currentVehicles.length; i++) {
                    var matchFound = false;
                    for (var j = 0; j < lastVehicles.length; j++) {
                        if (currentVehicles[i].image === lastVehicles[j].image) {
                            matchFound = true;
                            currentVehicles[i].timestamp = lastVehicles[j].timestamp;
                            break;
                        }
                    }
                    if (!matchFound) {
                        newVehiclesCount++;
                        // Note when the new vehicle was first found
                        currentVehicles[i].timestamp = new Date().toISOString();
                    }
                }
                sortedResults = sortByTimestamp(currentVehicles);
                console.log(newVehiclesCount + " new vehicle(s) found.");

                dbHelper.DropVehicles(function (result) {
                    console.log(result);
                    dbHelper.InsertVehicles(sortedResults, function (result) {
                        console.log(result.insertedCount + " vehicles inserted.");
                        var endTime = new Date().getTime();
                        console.log("Execution time: " + (endTime - currentStartTime) + "ms");
                        callback(result.insertedCount);
                    });
                });
            });
        }
    });
}

module.exports = scrape;
