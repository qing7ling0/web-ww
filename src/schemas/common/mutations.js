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
import { goodsModel, materialModel, appPlatformModel } from '../../models/index';



const constants = require('../../constants/constants')
const commonFields = require('../common/common-fields')
const schemasUtils = require('../../utils/schemas-utils')
const utils = require('../../utils/utils')

const appVersion = schemasUtils.createDefaultMutaion('appVersion', types.appVersionType, types.appVersionInputType, appPlatformModel);

const menuAdd = {
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

const commonAdd = {
  type: types.commonType,
  args: {
    doc: {
      name: 'doc', type: new GraphQLNonNull(types.commonInputType)
    }
  },
  async resolve (ctx, params, options) {
    if (ctx.session.user) {
      if (params.doc && ctx.session && ctx.session.user) {
        params.doc = utils.createEditorDoc(ctx.session.user, params.doc);
      }
      const common = await commonData.addCommon(params.doc)
      ctx.result = '添加成功！';
      return common;
    } else {
      throw new ApiError(ApiErrorNames.ACCOUNT_SESSION_EXPIRE);
    }
  }
};
const commonRemove = {
  type: new GraphQLList(GraphQLString),
  args: {
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (ctx, params, options) {
    let ret = await commonData.removeByIdsCommon(params.ids);
    if (ret) {
      try {
        ret = JSON.parse(ret);
      } catch (error) {
      }
      if (ret.ok == 1) {
        return params.ids;
      }
      return null;
    }
    return null;
  }
}
const commonUpdate = {
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
    if (params.doc && ctx.session && ctx.session.user) {
      params.doc = utils.createEditorDoc(ctx.session.user, params.doc);
    }
    return await commonData.updateCommon(params.conditions, params.doc);
  }
}

export default {...appVersion, commonAdd, commonUpdate, commonRemove};