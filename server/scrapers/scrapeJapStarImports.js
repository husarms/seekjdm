const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeJapStarImports = function (callback) {
    console.log("Scraping Jap Star Imports...");
    var vehicles = [];
    const options = {
        uri: 'http://www.japstarimports.com/inventory/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('#itemList').first().find('.thumbnail').each(function (i, elem) {
            var vehicle = {
                site: 'Jap Star Imports',
                image: $(elem).find('img').attr('data-src'),
                url: $(elem).find('a').attr('href'),
                description: $(elem).find('.inventory_car_title').clone().children().remove().end().text(),
                shortDescription: '',
                price: $(elem).find('.label_available_in_progress').text().replace('Available For','').trim(),
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

module.exports = scrapeJapStarImports;
