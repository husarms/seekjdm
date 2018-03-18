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
                site: "JDM Auto Imports",
                image: 'http://www.jdmautoimports.com' + $(elem).find('img').attr('src'),
                url: 'http://www.jdmautoimports.com' + $(elem).find('a').attr('href'),
                description: $(elem).find('font').first().text(),
                shortDescription: $(elem).find('span').eq(3).text(),
                price: $(elem).find('font').first().text().split("$")[1],
                isAvailable: $(elem).find('font:nth-child(2)').text()
            };
            if(typeof vehicle.price !== 'undefined'){
                vehicle.price = '$' + vehicle.price;
            }
            if( !vehicle.url.includes("undefined") &&
                !vehicle.shortDescription.toLowerCase().includes("sold") &&
                !vehicle.isAvailable.toLowerCase().includes("sold")){
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