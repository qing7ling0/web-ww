'use strict'

var mongoose = require('mongoose');

class DB {

    constructor() {}

    static async connect() {
        await mongoose.connect('mongodb://localhost:27017/web-ww',{ 
            server: { poolSize: 4 },
            useMongoClient: true,
            promiseLibrary: require('bluebird')
        });
    }

    static collection(name) {
        // return db.get(name);
    }

    static async test() {
        var kitty = new Cat({ name: 'Zildjian' });

        await kitty.save();
    }
    
    static async queryTest() {
        return await Cat.findOne({},['name']).exec();
    }

}
DB.connect();
var Cat = mongoose.model('Cat', { name: String });

module.exports = DB;