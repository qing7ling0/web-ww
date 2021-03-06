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
  customerModel
} from '../../models/customer'
const commonFields = require('../common/common-fields')
const schemasUtils = require('../../utils/schemas-utils')
const utils = require('../../utils/utils')

const addCustomer = {
  type: types.customerType,
  args: {
    doc: {
      name: 'doc',
      type: new GraphQLNonNull(types.customerInputType)
    }
  },
  async resolve (ctx, params, options) {
    if (params.doc && ctx.session && ctx.session.user) {
      params.doc = utils.createEditorDoc(ctx.session.user, params.doc);
    }
    const customer = await customerData.add(params.doc)
    ctx.result = '添加成功！';
    return customer;
  }
};

const deleteCustomer = {
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

const updateCustomer = {
  type: commonFields.operateResultType,
  args: {
    doc: {type: types.customerInputType},
  },
  async resolve (ctx, params, options) {
    if (params.doc && ctx.session && ctx.session.user) {
      params.doc = utils.createEditorDoc(ctx.session.user, params.doc);
    }
    return await customerData.update({_id:params.doc._id}, params.doc);
  }
}

const customerVipFooterOrderUpdate = {
  type: new GraphQLList(GraphQLString),
  args: {
    id: {type:GraphQLString},
    doc: {type: types.customerVipShoesOrderInputType},
  },
  async resolve (ctx, params, options) {
    return await customerData.updateVipFooterOrder(params.id, params.doc);  
  }
}

let mutations = {
  addCustomer,
  deleteCustomer,
  updateCustomer,
  customerVipFooterOrderUpdate
};
export default mutations;