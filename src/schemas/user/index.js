import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import * as queries from './queries'
import * as mutations from './mutations'

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'userQuery',
    fields: queries
  }),

  mutation: new GraphQLObjectType({
    name: 'userMutation',
    fields: mutations
  })
});

export default schema