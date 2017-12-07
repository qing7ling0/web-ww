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
  orderModel,
  goodsModel
} from '../../models/sales'
import {salesData} from '../../data/index';
import * as types from './types';
const DB = require('../../db/DB')
const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')

const material = schemasUtils.createDefaultMutaion('material', types.materialType, types.materialInputType, materialModel);
const goods = schemasUtils.createDefaultMutaion('goods', types.goodsType, types.goodsInputType, goodsModel);

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
  ...material, orderAdd, orderRemove, orderUpdate
};
export default mutations;