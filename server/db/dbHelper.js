const mongoClient = require('./mongoClient');

module.exports = {
    InsertVehicles: function(vehicles, callback){
        mongoClient.InsertMany('vehicles', vehicles, callback);
    },
    GetVehicles: function(callback){
        mongoClient.GetCollection('vehicles', callback);
    },
    DropVehicles: function(callback){
        mongoClient.DropCollection('vehicles', callback);
    }
}
