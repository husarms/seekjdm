const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeMontuMotors = function(callback){
    console.log("Scraping Montu Motors...");
    var vehicles = [];
    const options = {
        uri: 'https://www.montumotors.com/vehicles',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('.montu-inventory-link').each(function(i, elem) {
            var vehicle = {
                site: "Montu Motors",
                image: $(elem).find('.montu-lead-photo').attr('style').replace('background-image: url(','').replace(')',''),
                url: 'https://www.montumotors.com' + $(elem).attr('href'),
                description: $(elem).find('.year').text() + " " + $(elem).find('.make').text() + " " + $(elem).find('.model').text(),
                shortDescription: '',
                price: $(elem).find('.price').text(),
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

module.exports = scrapeMontuMotors;
