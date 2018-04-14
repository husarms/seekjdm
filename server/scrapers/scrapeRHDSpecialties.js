const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeRHDSpecialties = function(callback){
    console.log('Scraping RHD Specialties...');
    var vehicles = [];
    const baseUrl = 'https://rhdspecialties.com';
    const options = {
        //Hitting URL directory returns 403 - used cached version (1-2 days old unfortunately)
        uri: 'http://webcache.googleusercontent.com/search?q=cache:https://rhdspecialties.com/collections/inventory',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('.grid__item.small--one-half.medium-up--one-fifth').each(function(i, elem) {
            var vehicleDescription = $(elem).find('.product-card__name').text();
            var vehiclePrice = $(elem).find('.product-card__price').text().split('$')[1].trim();
            var vehicle = {
                site: 'RHD Specialties',
                image: 'https:' + $(elem).find('img').attr('src'),
                url: baseUrl + $(elem).find('a').attr('href'),
                description: vehicleDescription,
                shortDescription: '',
                price: vehiclePrice && '$' + vehiclePrice,
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

module.exports = scrapeRHDSpecialties;
