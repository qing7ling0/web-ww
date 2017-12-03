import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import * as types from './types';
import {commonData} from '../../data/index';

export const menuAdd = {
  type: types.menu,
  args: {
    info: {
      name: 'info',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
  }
};
