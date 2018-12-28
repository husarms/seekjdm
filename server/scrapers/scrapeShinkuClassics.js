const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeShinkuClassics = function (callback) {
    console.log("Scraping Shinku Classics...");
    var vehicles = [];
    const options = {
        uri: 'https://shinkuclassics.com/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('.grid4column-progression').each(function (i, elem) {
            var vehicle = {
                site: 'Shinku Classics',
                image: $(elem).find('.attachment-progression-vehicle').attr('src'),
                url: $(elem).find('h1').find('a').attr('href'),
                description: $(elem).find('h1').find('a').text(),
                shortDescription: '',
                price: $(elem).find('.pcd-price').text().replace('Our Price:','').trim(),
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

module.exports = scrapeShinkuClassics;
