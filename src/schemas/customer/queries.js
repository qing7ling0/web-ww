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
import * as salesTypes from '../sales/types';
import {customerData, salesData} from '../../data/index';
import { 
  footModel,
  customerModel,
  beltModel,
  watchStrapModel
} from '../../models/customer'

const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')


export const customerProfile = schemasUtils.createDefaultProfileQuery(types.customerType, customerModel);

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

export const customerOrderInfo = {
	type: salesTypes.subOrderType,
  args: {
    id:{type:GraphQLString},
    conditions: {type:GraphQLString},
    options:{type:GraphQLString}
  },
	async resolve (root, params, options) {
    if (!params.id) return null;

    try {
      if (params.conditions) {
        params.conditions = commonUtils.urlString2Conditions(params.conditions);
      } else {
        params.conditions = {};
      }
      if (params.options) {
        params.options = commonUtils.urlString2Conditions(params.options);
      } else {
        params.options = {};
      }
      params.conditions.customer = params.id;
    } catch(error) {
      console.log(error);
    }

    return await salesData.findSubOrder(params.conditions, null, params.options)
	}
}

// 获取当前导购的客户消费信息
export const customerReportList = {
  type: new GraphQLList(types.customerReportType),
  args: {
    id:{type:GraphQLString},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    if (!params.id) return null;
    try {
      if (params.conditions) {
        params.conditions = commonUtils.urlString2Conditions(params.conditions);
      } else {
        params.conditions = {};
      }

      return await salesData.getCustomerReportList(params.id, params.conditions, {page:params.page||0, pageSize:params.pageSize||0});
    } catch(error) {
      console.log(error);
    }
    return [];
	}
}