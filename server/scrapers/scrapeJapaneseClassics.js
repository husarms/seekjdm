const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeJapaneseClassics = function(callback){
    console.log("Scraping Japanese Classics...");
    var vehicles = [];
    const options = {
        uri: 'https://www.japaneseclassics.com/inventory/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('.vehicle').each(function(i, elem) {
            var vehicle = {
                site: "Japanese Classics",
                image: $(elem).find('img').attr('src'),
                url: $(elem).find('a').attr('href'),
                description: $(elem).find('h3').text(),
                shortDescription: $(elem).find('.short-description').text(),
                price: $(elem).find('.vehicle_price').text().replace('Available Now: ',''),
                isAvailable: ''
            };
            if(!vehicle.price.toLowerCase().includes("sold")){
                vehicles.push(vehicle);
            }
        });
    }).catch((err) => {
        console.log(err);
    }).then(() => {
        callback(vehicles);
    });
}

module.exports = scrapeJapaneseClassics;
