'use strict';

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
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
        },
    }),
    query: new GraphQLObjectType({
        name: 'test',
        fields: {
            hello: {
                type: GraphQLString,
                async resolve() {
                    let a = await DB.queryTest();
                    return 'test' + a.name + a.id;
                }
            }
        },
    }),
    query: new GraphQLObjectType({
        name: 'query3',
        fields: {
            hello: {
                type: GraphQLString,
                async resolve() {
                    let a = await DB.queryTest();
                    return 'query3' + a.name + a.id;
                }
            }
        },
    }),
});

module.exports = schema