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
  colorModel, 
  goodsStyleModel, 
  goodsSeasonModel, 
  goodsTypeModel,
  goodsShoesModel,
  maintainPriceModel,
  orderShoesModel,
  customModel,
  urgentModel
} from '../../models/sales'

const DB = require('../../db/DB')
const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')

export const materialList = schemasUtils.createDefaultListQuery('materialList', types.materialType, materialModel, (query) =>{
  return query.populate('color')
});
export const colorList = schemasUtils.createDefaultListQuery('colorList', types.colorType, colorModel);
export const goodsStyleList = schemasUtils.createDefaultListQuery('goodsStyleList', types.baseType, goodsStyleModel);
export const goodsSeasonList = schemasUtils.createDefaultListQuery('goodsSeasonList', types.baseType, goodsSeasonModel);
export const goodsTypeList = schemasUtils.createDefaultListQuery('goodsTypeList', types.baseType, goodsTypeModel);
export const maintainPriceList = schemasUtils.createDefaultListQuery('maintainPriceList', types.maintainPriceType, maintainPriceModel);
export const orderShoesList = schemasUtils.createDefaultListQuery('orderShoesList', types.orderShoesType, orderShoesModel);
export const customList = schemasUtils.createDefaultListQuery('customList', types.customType, customModel);
export const urgentList = schemasUtils.createDefaultListQuery('urgentList', types.urgentType, urgentModel);

export const goodsShoesProfile = {
  type: types.goodsShoesType,
  args: {
    id: {type:GraphQLString},
  },
  async resolve (root, params, options) {
    return await salesData.getGoodsShoesProfile(params.id);
  }
};

export const goodsShoesList = {
	type: new GraphQLObjectType({
    name: 'goodsShoesList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.goodsShoesType)}
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
    return await salesData.getGoodsShoesList({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const orderList = {
	type: new GraphQLObjectType({
    name: 'orderList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.orderType)}
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