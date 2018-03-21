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
  type: new GraphQLList(GraphQLInt),
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesListLast5Week();
	}
}

export const analyseLast12Month = {
  type: new GraphQLList(GraphQLInt),
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesListLast12Month();
	}
}
export const analyseLast2Year12Month = {
  type: new GraphQLObjectType({
    name: 'analyseLast2Year12Month',
    fields: {
      year:{type:new GraphQLList(GraphQLInt)},
      yesteryear: {type:new GraphQLList(GraphQLInt)}
    }
  }),
  args: {
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesListLast2Year12Month();
	}
}
export const analyseLast5Year = {
  type: new GraphQLList(GraphQLInt),
  args: {
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesListLast5Year();
	}
}
export const analyse4Quarter = {
  type: new GraphQLList(GraphQLInt),
  args: {
  },
	async resolve (root, params, options) {
    return await analyseData.getAnalyseSalesList4Quarter();
	}
}