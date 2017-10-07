import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import * as queries from './queries'

const create = () => {
  let items = [];
  for(let key in queries) {
    items.push({query: new GraphQLObjectType({
      name: key,
      fields: queries[key]
    })});
  }

  return items;
}

export default create()