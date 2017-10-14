import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import * as types from './types';
import { userModel } from '../../models/index.js'

export const add = {
  type: types.user,
  args: {
    info: {
      name: 'info',
      type: new GraphQLNonNull(types.userInput)
    }
  },
  async resolve (root, params, options) {

    const user = new userModel(params.info);
    const newUser = await user.save();

    if (!newUser) {
      return false;
    }

    return newUser;
  }
};

export const login = {
  type: types.user,
  args: {
    account: {
      name: 'account',
      type: GraphQLString
    },
    password: {
      name: 'password',
      type: GraphQLString
    },
  },
  async resolve (root, params, options) {
    console.log(params.account+ ";" + params.password)
    const user = await userModel.findOne({account:params.account, password:params.password});
    if (!user) {
      return false;
    }

    return user;
  }
};