import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql';

export const userFields = {
  _id: { type: GraphQLString },
  account: { type: GraphQLString },
  password: { type:GraphQLString },
  name: {type:GraphQLString},
  nickname: { type:GraphQLString },
  editer_name: { type:GraphQLString },
  last_login_time: { type:GraphQLString },
  last_login_ip: { type: GraphQLString }
};

export const user = new GraphQLObjectType({
  name: 'user',
  fields: userFields
});

export const userInput = new GraphQLInputObjectType({
  name: 'userInput',
  fields: {
    account: { type: GraphQLString },
    password: { type:GraphQLString },
    name: {type:GraphQLString},
    nickname: { type:GraphQLString },
  }
});