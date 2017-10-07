import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

const userFields = {
  _id: { type: GraphQLString },
  account: { type: GraphQLString },
  name: { type:GraphQLString },
  nickname: { type:GraphQLString },
  editer_name: { type:GraphQLString },
  last_login_time: { type:GraphQLString },
  last_login_ip: { type: GraphQLString }
};

export const userFields = userFields;

export const user = new GraphQLObjectType({
  name: 'user',
  fields: userFields
});