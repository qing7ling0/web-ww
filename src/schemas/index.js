'use strict';

import graphqlHTTP from 'koa-graphql'
import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';
  

import DB from '../db/DB'
import user from './user/index'

function createModule(schema) {
    return graphqlHTTP((request, response, ctx) => ({
        schema: schema,
        graphiql: false,
        rootValue: ctx,
        // context: { token: request.header.authorization, platform: request.query.platform },
        formatError: error => ({
            type: 'graphql',
            path: error.path,
            name: (error.originalError && error.originalError.name) || error.name,
            message: error.message,
            code: (error.originalError && error.originalError.code) || -1,
            locations: error.locations ? error.locations[0] : null
        })
    }));
}

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {...user.queries}
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {...user.mutations}
  })
});

function register() {
    return function (router) {
        router.all('/api', createModule(schema));
    }
}


module.exports = register();