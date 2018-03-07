var config = {};

//Connection string for our db
config.mongodbUri = process.env.MONGODB_URI || 'uri';
//Amount of time before we scrape websites again
config.scrapeInterval = process.env.SCRAPE_INTERVAL || '15';

module.exports = config;