import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import * as types from './types';
import {commonData} from '../../data/index';
import { 
  commonModel
} from '../../models'
import { ApiError, ApiErrorNames } from '../../error/api-errors'
const commonFields = require('../common/common-fields')
const schemasUtils = require('../../utils/schemas-utils')

export const menuAdd = {
  type: types.menu,
  args: {
    info: {
      name: 'info',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
  }
};

export const commonAdd = {
  type: types.commonType,
  args: {
    doc: {
      name: 'doc', type: new GraphQLNonNull(types.commonInputType)
    }
  },
  async resolve (ctx, params, options) {
    if (ctx.session.user) {
      const common = await commonData.addCommon(params.doc)
      ctx.result = '添加成功！';
      return common;
    } else {
      throw new ApiError(ApiErrorNames.ACCOUNT_SESSION_EXPIRE);
    }
  }
};
export const commonRemove = {
  type: new GraphQLList(GraphQLString),
  args: {
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (ctx, params, options) {
    const ret = await commonData.removeCommonByIds(params.ids);
    if (ret) {
      let res = JSON.parse(ret);
      if (ret.ok === 1) return params.ids;
      return null;
    }
    return null;
  }
}
export const commonUpdate = {
  type: commonFields.operateResultType,
  args: {
    doc: {type: types.commonInputType},
    conditions: {type:GraphQLString},
    id: {type:GraphQLString},
  },
  async resolve (ctx, params, options) {
    if (params.conditions) {
      params.conditions = commonUtils.urlString2Conditions(params.conditions);
    } else {
      params.conditions = {_id:params.id};
    }
    return await commonData.updateCommon(params.conditions, params.doc);
  }
}
