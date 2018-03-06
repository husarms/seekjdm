const rp = require('request-promise');
const cheerio = require('cheerio');

var scrapeJDMAutoImports = function (callback){
    console.log("Scraping JDM Auto Imports...");
    var vehicles = [];
    const options = {
        uri: 'http://www.jdmautoimports.com/inventory.html',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    rp(options).then(($) => {
        $('.wsite-multicol-tr').each(function(i, elem) {
            var vehicle = {
                site: "jdm-auto-imports",
                image: 'http://www.jdmautoimports.com' + $(elem).find('img').attr('src'),
                url: 'http://www.jdmautoimports.com' + $(elem).find('a').attr('href'),
                description: $(elem).find('font').first().text(),
                shortDescription: $(elem).find('span').eq(3).text(),
                price: $(elem).find('font').first().text().split("$")[1],
                isAvailable: ''
            };
            if(!vehicle.url.includes("undefined")){
                //console.log("Adding " + vehicle.description + "...");
                vehicles.push(vehicle);
            }
        });
    }).catch((err) => {
        console.log(err);
    }).then(() => {
        callback(vehicles);
    });
}

module.exports = scrapeJDMAutoImports;