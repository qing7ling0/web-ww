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