'use strict'

const config = require('../../config/index')
    // const monk = require('monk')

// const db = monk(config.mongodb_url);

class DB {

    constructor() {}

    static collection(name) {
        // return db.get(name);
    }

}

module.exports = DB;