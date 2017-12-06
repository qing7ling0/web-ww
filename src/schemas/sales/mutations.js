import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList
} from 'graphql';

import { 
  materialModel, 
  colorModel, 
  goodsStyleModel, 
  goodsSeasonModel, 
  goodsTypeModel,
  goodsShoesModel,
  maintainPriceModel,
  orderShoesModel,
  orderModel
} from '../../models/sales'
import {salesData} from '../../data/index';
import * as types from './types';
const DB = require('../../db/DB')
const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')

const material = schemasUtils.createDefaultMutaion('material', types.materialType, types.materialInputType, materialModel);
const color = schemasUtils.createDefaultMutaion('color', types.colorType, types.colorInputType, colorModel);
const goodsStyle = schemasUtils.createDefaultMutaion('goodsStyle', types.baseType, types.baseInputType, goodsStyleModel);
const goodsSeason = schemasUtils.createDefaultMutaion('goodsSeason', types.baseType, types.baseInputType, goodsSeasonModel);
const goodsType = schemasUtils.createDefaultMutaion('goodsType', types.baseType, types.baseInputType, goodsTypeModel);
const goodsShoes = schemasUtils.createDefaultMutaion('goodsShoes', types.goodsShoesType, types.goodsShoesInputType, goodsShoesModel);
const maintainPrice = schemasUtils.createDefaultMutaion('maintainPrice', types.maintainPriceType, types.maintainPriceInputType, maintainPriceModel);
const orderShoes = schemasUtils.createDefaultMutaion('orderShoes', types.orderShoesType, types.orderShoesInputType, orderShoesModel);
// const order = schemasUtils.createDefaultMutaion('order', types.orderType, types.orderInputType, orderModel);


const orderAdd = {
  type: types.orderType,
  args: {
    doc: {
      name: 'doc',
      type: new GraphQLNonNull(types.orderInputType)
    }
  },
  async resolve (ctx, params, options) {
    const shop = await salesData.addOrder(params.doc)
    ctx.result = '添加成功！';
    return shop;
  }
};

const orderRemove = {
  type: new GraphQLList(GraphQLString),
  args: {
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (ctx, params, options) {
    const ret = await salesData.removeOrderByIds(params.ids);
    if (ret) {
      let res = JSON.parse(ret);
      if (ret.ok === 1) return params.ids;
      return null;
    }
    return null;
  }
}

const orderUpdate = {
  type: commonFields.operateResultType,
  args: {
    doc: {type: types.orderInputType},
  },
  async resolve (ctx, params, options) {
    return await salesData.updateOrder({_id:params.doc._id}, params.doc);
  }
}

let mutations = {
  ...material, ...color, ...goodsStyle, 
  ...goodsSeason, ...goodsType, ...goodsShoes, 
  ...maintainPrice, ...orderShoes,
  orderAdd, orderRemove, orderUpdate
};
export default mutations;