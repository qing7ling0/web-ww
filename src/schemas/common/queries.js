import {
  GraphQLList
} from 'graphql';
import * as types from './types';
import {commonData} from '../../data/index';

export const menus = {
	type: new GraphQLList(types.menu),
	async resolve (ctx, params, options) {
    	return await commonData.getMenus(ctx, params);
	}
}

export const routers = {
	type: new GraphQLList(types.router),
	async resolve (ctx, params, options) {
    	return await commonData.getRouters(ctx, params);
	}
}
