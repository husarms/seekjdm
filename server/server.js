const express = require('express');
const path = require('path');
// const scrapeVehicles = require('./scrapers/scrape');
// const dbHelper = require('./db/dbHelper');

const port = process.env.PORT || 5000;

const app = express();

// Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../build')));

// Answer API requests
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});



// app.get('/api/vehicles', (req, res) => {
//     scrapeVehicles(function(vehicleCount){
//         console.log("Vehicle count = " + vehicleCount);
//         dbHelper.GetVehicles(function(result){
//             res.send({ vehicles: result });
//         });
//     });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));