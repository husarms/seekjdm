const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeABAutosAndImports = function(callback){
    console.log('Scraping AB Autos and Imports...');
    var vehicles = [];
    const baseUrl = 'http://www.abautosandimports.com';
    const options = {
        uri: baseUrl + '/vehicles.html',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('.wsite-image.wsite-image-border-none').each(function(i, elem) {
            var vehicleText = $(elem).find('div').text();
            var vehicleDescription = vehicleText.split('$')[0].replace('SOLD','').replace(/\r?\n/g,'').trim();
            var vehiclePrice = vehicleText.split('$')[1];
            var vehicle = {
                site: 'AB Autos and Imports',
                image: baseUrl + $(elem).find('img').attr('src'),
                url: baseUrl + $(elem).find('a').attr('href'),
                description: vehicleDescription,
                shortDescription: '',
                price: vehiclePrice ? '$' + vehiclePrice.replace(/\r?\n/g,'').replace('.','') : '',
                isAvailable: ''
            };
            if(vehicle.price !== ''){
                vehicles.push(vehicle);
            }
        });
    }).catch((err) => {
            console.log(err);
    }).then(() => {
        callback(vehicles);
    });
}

module.exports = scrapeABAutosAndImports;
