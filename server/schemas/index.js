'use strict';

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';
import DB from '../lib/db/DB'

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

module.exports = schema