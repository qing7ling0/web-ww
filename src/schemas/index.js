'use strict';

import graphqlHTTP from 'koa-graphql'
var _expressGraphql = require('express-graphql');
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql';
  

import DB from '../db/DB'
import user from './user/index'
import common from './common/index'
import shop from './shop/index'
import customer from './customer/index'
import sales from './sales/index'
import analyses from './analyse/index'

function createModule(schema) {
    return graphqlHTTP(async (request, response, ctx) => {
        return {
            schema: schema,
            graphiql: false,
            rootValue: ctx,
            // context: {platform: JSON.stringify(dd)},
            formatError: error => ({
                type: 'graphql',
                path: error.path,
                name: (error.originalError && error.originalError.name) || error.name,
                message: error.message,
                code: (error.originalError && error.originalError.code) || -1,
                locations: error.locations ? error.locations[0] : null
            })
        }
    });
}

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...user.queries, 
        ...common.queries,
        ...shop.queries,
        ...customer.queries,
        ...sales.queries,
        ...analyses.queries
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...user.mutations,
        ...shop.mutations,
        ...common.mutations, 
        ...common.queries,
        ...customer.mutations,
        ...sales.mutations
    }
  })
});


let loginSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'LoginQuery',
      fields: {
          id: {type:GraphQLString}
      }
    }),
    mutation: new GraphQLObjectType({
      name: 'Login',
      fields: {
          ...user.mutations,
          ...common.queries,
      }
    })
});

function register() {
    return function (router) {
        router.all('/api', createModule(schema));
        router.post('/login', createModule(loginSchema));
    }
}


module.exports = register();