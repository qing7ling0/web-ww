'use strict';

import graphqlHTTP from 'koa-graphql'

import DB from '../db/DB'
import user from './user/index'

function createModule(schema) {
    return graphqlHTTP((request) => ({
        schema: schema,
        graphiql: true,
        // context: { token: request.header.authorization, platform: request.query.platform },
        formatError: error => ({
            type: 'graphql',
            path: error.path,
            message: error.message + JSON.stringify(request),
            locations: error.locations ? error.locations[0] : null
        })
    }));
}

function register() {
    return function (router) {
        router.all('/api', createModule(user));
    }
}


module.exports = register();