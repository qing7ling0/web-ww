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
import {salesData} from '../../data/index';
import { 
  materialModel, 
  goodsModel,
  orderModel,
} from '../../models/sales'

const DB = require('../../db/DB')
const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')

const TEST = require('../../test/test')

export const materialList = schemasUtils.createDefaultListQuery('materialList', types.materialType, materialModel, (query) =>{
  return query.populate('color')
});

export const goodsProfile = {
  type: types.goodsType,
  args: {
    id: {type:GraphQLString},
  },
  async resolve (root, params, options) {
    return await salesData.getGoodsProfile(params.id);
  }
};

export const goodsList = {
	type: new GraphQLObjectType({
    name: 'goodsList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.goodsType)}
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
    } else {
      params.conditions = {};
    }
    return await salesData.getGoodsList(null, {page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const orderList = {
	type: new GraphQLObjectType({
    name: 'orderList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.orderDetailType)}
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

    return await salesData.getOrderList({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const subOrderList = {
	type: new GraphQLObjectType({
    name: 'subOrderList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.subOrderType)}
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
    // TEST();
    return await salesData.getSubOrderList({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}