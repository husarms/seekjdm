const scrapeABAutosAndImports = require('./scrapeABAutosAndImports');
const scrapeImportAVehicle = require('./scrapeImportAVehicle');
const scrapeJapaneseClassics = require('./scrapeJapaneseClassics');
const scrapeJapStarImports = require('./scrapeJapStarImports');
const scrapeJDMAutoImports = require('./scrapeJdmAutoImports');
const scrapeMontuMotors = require('./scrapeMontuMotors');
const scrapeRHDSpecialties = require('./scrapeRHDSpecialties');
const scrapeShinkuClassics = require('./scrapeShinkuClassics');
const dbHelper = require('../db/dbHelper');
const config = require('../../config');

var scrape = function (callback) {
    var currentVehicles = [];
    var lastVehicles = [];
    const currentStartDate = new Date();
    console.log("Determining need to scrape...");

    /*
    * Step 1: Get vehicles from database and determine if we need to run scrape
    */
    function shouldRunScrape(callback){
        dbHelper.GetVehicles(function (result) {
            lastVehicles = result;
            if(lastVehicles.length > 0){
                const lastVehicleTimestamp = lastVehicles[0].lastUpdateTimestamp;
                const lastStartDate = new Date(lastVehicleTimestamp);
                const diffMs = currentStartDate - lastStartDate;
                const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                const scrapeInterval = parseInt(config.scrapeInterval);
                
                //Only re-scrape after a set amount of time has passed
                console.log("Scrape last ran at " + lastStartDate.toISOString() + ", current time is " + currentStartDate.toISOString() + ".");
                console.log(diffMins + " minutes since last scrape, interval set to " + scrapeInterval + " minutes.");
                if (diffMins < scrapeInterval) {
                    callback(false);
                    return;
                }
            } else {
                console.log("No vehicles found in database.");
            }
            callback(true);
        });
    };

    /*
    * Step 2: Scrape websites for vehicles
    */
    function scrape(callback){
        
        // Otherwise, let's go!
        console.log("Running scrape...");
            
        var scrapers = [
            function () {
                scrapeABAutosAndImports(function (vehicles) {
                    console.log("Scrape AB Autos and Imports complete. " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeImportAVehicle(function (vehicles) {
                    console.log("Scrape Import a Vehicle complete. " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeJapaneseClassics(function (vehicles) {
                    console.log("Scrape Japanese Classics complete. " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeJapStarImports(function (vehicles) {
                    console.log("Scrape Jap Star Imports complete. " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeJDMAutoImports(function (vehicles) {
                    console.log("Scrape JDM Auto Imports complete. " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeMontuMotors(function (vehicles) {
                    console.log("Scrape Montu Motors complete. " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeRHDSpecialties(function (vehicles) {
                    console.log("Scrape RHD Specialties complete. " + vehicles.length + " vehicles found.");
                    vehicles.map(vehicle => currentVehicles.push(vehicle));
                    scraperCallback();
                })
            },
            function () {
                scrapeShinkuClassics(function (vehicles) {
                    console.log("Scrape Shinku Classics complete. " + vehicles.length + " vehicles found.");
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
                callback();
            }
        }
    };


    /*
    * Step 3: Process vehicles and update database
    */
    function process(callback){

        function sortByTimestamp(array) {
            return array.sort(function (a, b) {
                a = new Date(a.insertTimestamp);
                b = new Date(b.insertTimestamp);
                return a > b ? -1 : a < b ? 1 : 0;
            });
        }

        // Get new vehicles and update db  
        console.log(lastVehicles.length + " vehicles found last time");
        // Find new vehicles
        var newVehiclesCount = 0;
        for (var i = 0; i < currentVehicles.length; i++) {
            var matchFound = false;
            for (var j = 0; j < lastVehicles.length; j++) {
                if (currentVehicles[i].image === lastVehicles[j].image) {
                    matchFound = true;
                    currentVehicles[i].insertTimestamp = lastVehicles[j].insertTimestamp;
                    break;
                }
            }
            if (!matchFound) {
                newVehiclesCount++;
                // Note when the new vehicle was first found
                currentVehicles[i].insertTimestamp = new Date().toISOString();
            }
            currentVehicles[i].lastUpdateTimestamp = new Date().toISOString();
        }
        sortedResults = sortByTimestamp(currentVehicles);
        console.log(newVehiclesCount + " new vehicle(s) found.");

        dbHelper.DropVehicles(function (result) {
            console.log(result);
            dbHelper.InsertVehicles(sortedResults, function (result) {
                console.log(result.insertedCount + " vehicles inserted.");
                var endTime = new Date().getTime();
                console.log("Execution time: " + (endTime - currentStartDate.getTime()) + "ms");
                callback(result.insertedCount);
            });
        });          
    };


    shouldRunScrape(shouldRunScrapeCallback);
    function shouldRunScrapeCallback(shouldRunScrape){
        if(!shouldRunScrape){
            callback(0);
            return;
        }
        scrape(scrapeCallback);
        function scrapeCallback(){
            process(processCallback);
            function processCallback(result){
                callback(result);
                return;
            }
        }
    }
}

module.exports = scrape;
