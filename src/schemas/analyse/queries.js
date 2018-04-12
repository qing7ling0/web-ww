import {
	GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql';

import * as types from './types';
import * as salesTypes from '../sales/types';
import { analyseData } from '../../data/index';
import { 
  footModel,
  customerModel,
  beltModel,
  watchStrapModel
} from '../../models/customer'

const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')

export const analyseShopList = {
  type: new GraphQLList(types.analysePriceType),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseShopSalesList(params);
	}
}

export const analyseLast5Week = {
  type: new GraphQLList(GraphQLFloat),
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesListLast5Week();
	}
}

export const analyseLast12Month = {
  type: new GraphQLList(GraphQLFloat),
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesListLast12Month();
	}
}
export const analyseLast2Year12Month = {
  type: new GraphQLObjectType({
    name: 'analyseLast2Year12Month',
    fields: {
      year:{type:new GraphQLList(GraphQLFloat)},
      yesteryear: {type:new GraphQLList(GraphQLFloat)}
    }
  }),
  args: {
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesListLast2Year12Month();
	}
}
export const analyseLast5Year = {
  type: new GraphQLList(GraphQLFloat),
  args: {
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesListLast5Year();
	}
}
export const analyse4Quarter = {
  type: new GraphQLList(GraphQLFloat),
  args: {
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesList4Quarter();
	}
}

// 商品分析

export const analyseGoodsTop10 = {
  type: new GraphQLList(types.analyseGoodsType),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseGoodsTop10(params);
	}
}
export const analyseGoodsSalesPer = {
  type: new GraphQLList(GraphQLFloat),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseGoodsSalesPer(params);
	}
}
export const analyseGoodsMaterial = {
  type: new GraphQLList(types.analyseGoodsMaterialType),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseGoodsMaterial(params);
	}
}
export const analyseGoodsSex = {
  type: new GraphQLList(types.analyseGoodsSexType),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseGoodsSex(params);
	}
}
export const analyseGoodsPrice = {
  type: new GraphQLList(types.analyseGoodsPriceType),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseGoodsPrice(params);
	}
}
export const analyseGoodsMaterialList4Quarter = {
  type: new GraphQLList(new GraphQLList(types.analyseGoodsQuarterMaterialType)),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseGoodsMaterialList4Quarter(params);
	}
}
export const analyseGoodsSexList4Quarter = {
  type: new GraphQLList(types.analyseGoodsQuarterSexType),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseGoodsSexList4Quarter(params);
	}
}
export const analyseGoodsPriceList4Quarter = {
  type: new GraphQLObjectType({
    name: 'analyseGoodsPriceList4Quarter',
    fields: {
      list: {type:new GraphQLList(types.analyseGoodsQuarterPriceType)},
      types: {type:new GraphQLList(GraphQLFloat)},
    }
  }),
  args: {
    date_type:{type:GraphQLInt}
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseGoodsPriceList4Quarter(params);
	}
}