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
import { ApiError, ApiErrorNames } from '../../error/api-errors'
import utils from '../../utils/utils'

export const add = {
  type: types.user,
  args: {
    info: {
      name: 'info',
      type: new GraphQLNonNull(types.userInput)
    }
  },
  async resolve (root, params, options) {
    if (!utils.isAccountValid(params.info.account) || !utils.isPasswordValid(params.info.password)) {
      throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
    }

    var user = await userModel.findOne({account:params.account});
    if (user) {
      throw new ApiError(ApiErrorNames.ACCOUNT_EXIST);
    }

    params.info.password = utils.sha1(params.info.password);
    user = new userModel(params.info);
    const newUser = await user.save();

    if (!newUser) {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
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
  async resolve (root, params, ctx) {
    console.log(JSON.stringify(root.session))
    console.log(JSON.stringify(params))
    if (root.session.user){
      console.log('login user session====' + JSON.stringify(root.session.user))
      return root.session.user;
    }

    if (!utils.isAccountValid(params.account) || !utils.isPasswordValid(params.password)) {
      throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
    }

    const user = await userModel.findOne({account:params.account, password:utils.sha1(params.password)});
    if (!user) {
      throw new ApiError(ApiErrorNames.ACCOUNT_PASSWORD_ERROR);
    }
    root.session.user = user;
    return user;
  }
};