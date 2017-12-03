import {
	GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql';

import * as types from './types';
import {shopData} from '../../data/index';
const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')

export const shopList = {
	type: new GraphQLObjectType({
    name: 'shopList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.shopType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    if (params.conditions) {
      console.log(decodeURIComponent(params.conditions));
      params.conditions = commonUtils.urlString2Conditions(params.conditions);
      console.log(JSON.stringify(params.conditions));
    }
    return await shopData.getList({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const shopDetail = {
	type: types.shopType,
  args: {
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    return await shopData.find(conditions)
	}
}