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
import {commonData} from '../../data/index';

const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')

export const menus = {
	type: new GraphQLList(types.menu),
	async resolve (ctx, params, options) {
    return await commonData.getMenus(ctx.session.user);
	}
}

export const routers = {
	type: new GraphQLList(types.router),
	async resolve (ctx, params, options) {
    return await commonData.getRouters(ctx, params);
	}
}

export const commonList = {
	type: new GraphQLObjectType({
    name: 'commonList',
    fields: {
      page: {type:commonFields.defaultPageType},
			list: {type:new GraphQLList(types.commonType)}
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
		let page = {page:-1, pageSize:0};
		if (params.page && params.pageSize) {
			page.page = params.page;
			page.pageSize = params.pageSize;
		}
    return await commonData.getCommonList(null, {conditions:params.conditions}, page)
	}
}

export const commonDataModify = {
  type: GraphQLInt,
  args: {},
  async resolve (ctx, params, options) {
    let vipImport = require('../../tools/import/vip-import');
    if (vipImport) {
      // await vipImport(ctx);
    }

    return 1;
  }
}
