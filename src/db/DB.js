'use strict'

var logUtils = require('../utils/log-utils')
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
        DB.test();
        return await Cat.findOne({},['name']).exec();
    }

    static addPost(schema, options) {
        for(let op of options) {
            schema.post(op.name, op.fn ? on.fn : (doc) => {
                DB.post(op.name, doc);
            });
        }
    }

    static post(name, doc) {
        logUtils.logUserModify(name, doc, Date.now)
    }
    
    static addPre(schema, options) {
        for(let op of options) {
            schema.pre(op.name, op.fn ? on.fn : (doc) => {
                DB.pre(op.name, doc);
            });
        }
    }

    static pre(name, doc) {
        logUtils.logUserModify(name, doc, Date.now)
        logUtils.logDebug(name, Date.now);
    }

}
DB.connect();
var Cat = mongoose.model('Cat', { name: String });

module.exports = DB;