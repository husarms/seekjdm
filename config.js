var config = {};

config.mongodbUri = process.env.MONGODB_URI || 'url';
config.apiKey = process.env.API_KEY || 'apiKey';

module.exports = config;