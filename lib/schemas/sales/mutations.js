'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _sales = require('../../models/sales');

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DB = require('../../db/DB');
var commonFields = require('../common/common-fields');
var commonUtils = require('../../utils/common-utils');
var schemasUtils = require('../../utils/schemas-utils');

var material = schemasUtils.createDefaultMutaion('material', types.materialType, types.materialInputType, _sales.materialModel);
var color = schemasUtils.createDefaultMutaion('color', types.colorType, types.colorInputType, _sales.colorModel);
var goodsStyle = schemasUtils.createDefaultMutaion('goodsStyle', types.baseType, types.baseInputType, _sales.goodsStyleModel);
var goodsSeason = schemasUtils.createDefaultMutaion('goodsSeason', types.baseType, types.baseInputType, _sales.goodsSeasonModel);
var goodsType = schemasUtils.createDefaultMutaion('goodsType', types.baseType, types.baseInputType, _sales.goodsTypeModel);
var goodsShoes = schemasUtils.createDefaultMutaion('goodsShoes', types.goodsShoesType, types.goodsShoesInputType, _sales.goodsShoesModel);
var maintainPrice = schemasUtils.createDefaultMutaion('maintainPrice', types.maintainPriceType, types.maintainPriceInputType, _sales.maintainPriceModel);
var orderShoes = schemasUtils.createDefaultMutaion('orderShoes', types.orderShoesType, types.orderShoesInputType, _sales.orderShoesModel);

var mutations = _extends({}, material, color, goodsStyle, goodsSeason, goodsType, goodsShoes, maintainPrice, orderShoes);
exports.default = mutations;

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
//# sourceMappingURL=mutations.js.map