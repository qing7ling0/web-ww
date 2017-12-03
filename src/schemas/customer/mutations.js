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
import {userData, customerData} from '../../data/index';
import { 
  footModel,
  customerModel,
  beltModel,
  watchStrapModel
} from '../../models/customer'
const commonFields = require('../common/common-fields')
const schemasUtils = require('../../utils/schemas-utils')

const foot = schemasUtils.createDefaultMutaion('foot', types.footType, types.footInputType, footModel);
const belt = schemasUtils.createDefaultMutaion('belt', types.beltType, types.beltInputType, beltModel);
const watchStrap = schemasUtils.createDefaultMutaion('watchStrap', types.watchStrapType, types.watchStrapInputType, watchStrapModel);

export const addCustomer = {
  type: types.customerType,
  args: {
    doc: {
      name: 'doc',
      type: new GraphQLNonNull(types.customerInputType)
    }
  },
  async resolve (ctx, params, options) {
    const customer = await customerData.add(params.doc)
    ctx.result = '添加成功！';
    return customer;
  }
};

export const deleteCustomer = {
  type: new GraphQLList(GraphQLString),
  args: {
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (ctx, params, options) {
    const ret = await customerData.removeByIds(params.ids);
    if (ret) {
      let res = JSON.parse(ret);
      if (ret.ok === 1) return params.ids;
      return null;
    }
    return null;
  }
}

export const updateCustomer = {
  type: commonFields.operateResultType,
  args: {
    doc: {type: types.customerInputType},
  },
  async resolve (ctx, params, options) {
    return await customerData.update({_id:params.doc._id}, params.doc);
  }
}

let mutations = {
  addCustomer,
  deleteCustomer,
  updateCustomer,
  ...foot, 
  ...belt, 
  ...watchStrap
};
export default mutations;