const express = require('express');
// const scrapeVehicles = require('./scrapers/scrape');
// const dbHelper = require('./db/dbHelper');

const app = express();
//const port = process.env.PORT || 5000;

//Point to our react-create-app build folder
var buildDir = __dirname + "/build/";
app.use(express.static(buildDir));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
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