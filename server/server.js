const express = require('express');
const path = require('path');
const scrapeVehicles = require('./scrapers/scrape');
const dbHelper = require('./db/dbHelper');

const port = process.env.PORT || 5000;

const app = express();

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../build')));

// Answer API requests.
app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server running on ' + port + '"}');
});

app.get('/api/vehicles', (req, res) => {
    dbHelper.GetVehicles(function(result){
        res.set('Content-Type', 'application/json');
        res.send({ vehicles: result });
        //Rescrape
        scrapeVehicles(function(vehicleCount){
            console.log("Scrape completed, vehicle count = " + vehicleCount);
        });
    });
    // scrapeVehicles(function(vehicleCount){
    //     console.log("Vehicle count = " + vehicleCount);
    //     dbHelper.GetVehicles(function(result){
    //         res.set('Content-Type', 'application/json');
    //         res.send({ vehicles: result });
    //     });
    // });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));