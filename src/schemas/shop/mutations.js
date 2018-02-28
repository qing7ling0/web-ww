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

import * as types from './types';
import {userData, shopData} from '../../data/index';
const commonFields = require('../common/common-fields')
const utils = require('../../utils/utils')


export const addShop = {
  type: types.shopType,
  args: {
    doc: {
      name: 'doc',
      type: new GraphQLNonNull(types.shopInputType)
    }
  },
  async resolve (ctx, params, options) {
    if (params.doc && ctx.session && ctx.session.user) {
      params.doc = utils.createEditorDoc(ctx.session.user, params.doc);
    }
    const shop = await shopData.add(params.doc)
    ctx.result = '添加成功！';
    return shop;
  }
};

export const deleteShop = {
  type: new GraphQLList(GraphQLString),
  args: {
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (ctx, params, options) {
    const ret = await shopData.removeByIds(params.ids);
    if (ret) {
      let res = JSON.parse(ret);
      console.log('ret=' + JSON.stringify(res));
      if (ret.ok === 1) return params.ids;
      return null;
    }
    return null;
  }
}

export const updateShop = {
  type: commonFields.operateResultType,
  args: {
    doc: {type: types.shopInputType},
  },
  async resolve (ctx, params, options) {
    if (params.doc && ctx.session && ctx.session.user) {
      params.doc = utils.createEditorDoc(ctx.session.user, params.doc);
    }
    return await shopData.update({_id:params.doc._id}, params.doc);
  }
}
