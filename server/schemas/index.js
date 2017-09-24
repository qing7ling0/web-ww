'use strict';

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'rootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                }
            }
        }
    })
});

module.exports = schema