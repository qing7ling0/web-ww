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
  orderShoesModel
} from '../../models/sales'
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

let mutations = {...material, ...color, ...goodsStyle, ...goodsSeason, ...goodsType, ...goodsShoes, ...maintainPrice, ...orderShoes};
export default mutations;

// export const addGoods = {
//   type: types.goodsType,
//   args: {
//     doc: {
//       name: 'doc',
//       type: new GraphQLNonNull(types.goodsInputType)
//     }
//   },
//   async resolve (ctx, params, options) {
//     const shop = await shopData.add(params.doc)
//     ctx.result = '添加成功！';
//     return shop;
//   }
// };

// export const deleteShop = {
//   type: new GraphQLList(GraphQLString),
//   args: {
//     ids: {type: new GraphQLList(GraphQLString)}
//   },
//   async resolve (ctx, params, options) {
//     const ret = await shopData.removeByIds(params.ids);
//     if (ret) {
//       let res = JSON.parse(ret);
//       console.log('ret=' + JSON.stringify(res));
//       if (ret.ok === 1) return params.ids;
//       return null;
//     }
//     return null;
//   }
// }

// export const updateShop = {
//   type: commonFields.operateResultType,
//   args: {
//     doc: {type: types.shopInputType},
//   },
//   async resolve (ctx, params, options) {
//     return await shopData.update({_id:params.doc._id}, params.doc);
//   }
// }