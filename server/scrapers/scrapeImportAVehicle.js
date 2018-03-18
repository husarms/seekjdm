const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeImportAVehicle = function(callback){
    console.log("Scraping Import a Vehicle...");
    var vehicles = [];
    const options = {
        uri: 'https://www.importavehicle.com/inventory',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('.ivi-vehicle-item').each(function(i, elem) {
            var vehicle = {
                site: "Toprank",
                image: $(elem).find('a[style]').attr('style').replace('background-image: url(\'','').replace('\')',''),
                url: 'https://www.importavehicle.com' + $(elem).find('a').attr('href'),
                description: $(elem).find('a[title]').attr('title'),
                shortDescription: '',
                price: $(elem).find('.ivi-vehicle-item-price').text().replace('\nOffered At: ','').replace('\n',''),
                isAvailable: ''
            };
            vehicles.push(vehicle);
        });
    }).catch((err) => {
            console.log(err);
    }).then(() => {
        callback(vehicles);
    });
}

module.exports = scrapeImportAVehicle;
