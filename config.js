var config = {};

config.mongodbUri = process.env.MONGODB_URI || 'uri';

module.exports = config;