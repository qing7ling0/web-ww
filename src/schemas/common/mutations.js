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

export const addCommon = {
  type: types.commonType,
  args: {
    doc: {
      name: 'doc', type: new GraphQLNonNull(types.commonInputType)
    }
  },
  async resolve (ctx, params, options) {
    const common = await commonData.addCommon(params.doc)
    ctx.result = '添加成功！';
    return common;
  }
};
export const deleteCommon = {
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
export const updateCommon = {
  type: commonFields.operateResultType,
  args: {
    doc: {type: types.commonInputType},
  },
  async resolve (ctx, params, options) {
    return await commonData.updateCommon({_id:params.doc._id}, params.doc);
  }
}
