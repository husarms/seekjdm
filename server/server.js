const express = require('express');
const path = require('path');
const scrapeVehicles = require('./scrapers/scrape');
const dbHelper = require('./db/dbHelper');
const memoryCache = require('memory-cache');

const port = process.env.PORT || 5000;
const app = express();
const memCache = new memoryCache.Cache();
const cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if(cacheContent){
            console.log("Memory Cache - Sending cached content.");
            res.send(cacheContent);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                console.log("Memory Cache - Adding content to cache.");
                memCache.put(key, body, duration * 1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../build')));

// Answer API requests.
app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server running on ' + port + '"}');
});

// Cache for 30 seconds
app.get('/api/vehicles', cacheMiddleware(30), (req, res) => {
    dbHelper.GetVehicles(function(result){
        res.set('Content-Type', 'application/json');
        res.send({ vehicles: result });
        //Rescrape
        scrapeVehicles(function(vehicleCount){
            console.log("Scrape completed, vehicle count = " + vehicleCount);
        });
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));