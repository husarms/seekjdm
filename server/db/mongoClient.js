const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../../config');

// Connection URL
const url = config.mongodb.uri;

// Database Name - After last slash in url
const dbName = /[^/]*$/.exec(url)[0];

module.exports = {
    InsertMany: function(collectionName, data, callback){
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            collection.insertMany(data, function(err, result) {
                assert.equal(err, null);
                client.close();
                callback(result);
            });
        });
    },
    GetCollection: function(collectionName, callback){
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            collection.find().toArray(function(err, result){
                assert.equal(err, null);
                client.close();
                callback(result);
            });
        });
    },
    DropCollection: function(collectionName, callback){
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            collection.drop();
            callback("Collection '" + collectionName + "' dropped.");
        });
    }
}
