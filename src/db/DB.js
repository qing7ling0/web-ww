'use strict'

var logUtils = require('../utils/log-utils')
var mongoose = require('mongoose');

import { ApiError, ApiErrorNames } from '../error/api-errors'

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
        // var kitty = new Cat({ name: 'Zildjian' });

        // await kitty.save();
    }
    
    static async queryTest() {
        // DB.test();
        // return await Cat.findOne({},['name']).exec();
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

    static async getList(model, options, page, onQuery) {
        if (model) {
            let findOptions = options.options || {};
            let newPage = {page:-1, pageSize:0, total:0};
            if (page && page.pageSize>-1) {
                let skip = 0;
                let limit = page.page || 100;
                if (page.page) {
                    skip = Math.max(page.page-1,0) * limit;
                }
                findOptions.limit = limit;
                findOptions.skip = skip;
                newPage.page = page.page;
                newPage.pageSize = limit;
            }

            let conditions = options.conditions || {};
            if (page && page.page>-1) {
                newPage.total = await model.find(conditions).count();
            }
            let datas = null;
            if (onQuery) {
                let query = model.find(conditions, null, findOptions);
                datas = await onQuery(query);
            } else {
                datas = await model.find(conditions, null, findOptions);
            }
            return {list:datas, page:newPage};
        } else {
            throw new ApiError(ApiErrorNames.GET_FAIL);
        }
    }

    static async add(model, doc, options={}) {
        if (doc && model) {
            let data = await new model(doc).save(options);
            if (data) {
            return data;
            } else {
            throw new ApiError(ApiErrorNames.ADD_FAIL);
            }
        } else {
            throw new ApiError(ApiErrorNames.ADD_FAIL);
        }
    }

    static async update(model, conditions, doc, options) {
        if (doc && conditions && model) {
            return await model.update(conditions, doc, options);
        } else {
            throw new ApiError(ApiErrorNames.UPDATE_FAIL);
        }
    }

    static async remove(model, conditions) {
        if (conditions && model) {
            return await model.deleteMany(conditions);
        } else {
            throw new ApiError(ApiErrorNames.DELETE_FAIL);
        }
    }
    
    static async removeByIds(model, ids) {
        if (ids && ids.length > 0 && model) {
            return await DB.remove(model, {_id:{$in:ids}});
        } else {
            throw new ApiError(ApiErrorNames.DELETE_FAIL);
        }
    }
    
    static async find(model, conditions, onQuery) {
        if (conditions && model) {
            if (onQuery) {
                let query = model.find(conditions);
                return await onQuery(query);
            } else {
                return await model.find(conditions);
            }
        } else {
            throw new ApiError(ApiErrorNames.DELETE_FAIL);
        }
    }

    static async findById(model, id, onQuery) {
        if (id && model) {
            if (onQuery) {
                let query = model.findById(id);
                return await onQuery(query);
            } else {
                return await model.findById(id);
            }
        } else {
            throw new ApiError(ApiErrorNames.GET_FAIL);
        }
    }

}
DB.connect();
// var Cat = mongoose.model('Cat', { name: String });

module.exports = DB;