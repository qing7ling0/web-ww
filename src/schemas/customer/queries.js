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
import {customerData} from '../../data/index';
import { 
  footModel,
  customerModel,
  beltModel,
  watchStrapModel
} from '../../models/customer'

const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')

export const customerList = {
	type: new GraphQLObjectType({
    name: 'customerList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.customerType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    if (params.conditions) {
      params.conditions = commonUtils.urlString2Conditions(params.conditions);
    }
    return await customerData.getList({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const customerDetail = {
	type: types.customerType,
  args: {
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    return await customerData.find(conditions)
	}
}