const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeMontuMotors = function (callback) {
    console.log("Scraping Montu Motors...");
    var vehicles = [];
    const options = {
        uri: 'https://montumotors.com/inventory-feed/?type=Current',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('.ft-item').each(function (i, elem) {
            var vehicle = {
                site: "Montu Motors",
                image: $(elem).find('.cover-bkg').attr('style').replace('background-image:url(', '').replace(')', ''),
                url: 'https://www.montumotors.com' + $(elem).find('.absolute-link').attr('href'),
                description: $(elem).find('.info').find('a').text(),
                shortDescription: '',
                price: $(elem).find('.price').text().trim(),
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
