'use strict';

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import graphqlHTTP from 'koa-graphql';

import DB from '../db/DB'
import user from './user'

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'rootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                async resolve() {
                    let a = await DB.queryTest();
                    return 'world' + a.name + a.id;
                }
            }
        }
    })
});

const graphqlModule = graphqlHTTP((request) => ({
    schema: Schemas,
    graphiql: true,
    // context: { token: request.header.authorization, platform: request.query.platform },
    formatError: error => ({
        type: 'graphql',
        path: error.path,
        message: error.message + JSON.stringify(request),
        locations: error.locations ? error.locations[0] : null
    })
}));

module.exports = schema