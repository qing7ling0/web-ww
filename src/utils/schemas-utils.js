import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';
import DB from '../db/DB'
const commonUtils = require('./common-utils')
const commonFields = require('../schemas/common/common-fields')
const utils = require('./utils')

export const createDefaultListQuery = (name, type, model, onQuery) => {
  return {
    type: new GraphQLObjectType({
      name: name,
      fields: {
        page: {type:commonFields.defaultPageType},
        list: {type:new GraphQLList(type)}
      }
    }),
    args: {
      conditions: {type:GraphQLString},
      page: {type: GraphQLInt},
      pageSize: {type: GraphQLInt},
    },
    async resolve (root, params, options) {
      if (params.conditions) {
        params.conditions = commonUtils.urlString2Conditions(params.conditions);
      }
      let ret =[];
      if (params.page > -1) {
        ret = await DB.getList(model, {conditions:params.conditions}, {page:params.page, pageSize:params.pageSize}, onQuery);
      } else {
        ret = await DB.getList(model, {conditions:params.conditions}, null, onQuery);
      }
      return ret;
    }
  }
}

export const createDefaultProfileQuery = (type, model, onQuery) => {
  return {
    type: type,
    args: {
      id: {type:GraphQLString},
      conditions: {type:GraphQLString}
    },
    async resolve (root, params, options) {
      let id = params.id || '';
      if (id) {
        return await DB.findById(model, id, onQuery);
      }
      let con = params.conditions && commonUtils.urlString2Conditions(params.conditions) || null;
      return await DB.findOne(model, con, onQuery);
    }
  };
}

export const createDefaultMutaion = (tag, type, inputType, model, resolves) => {
  let ret = {};
  ret[`${tag}Add`] = {
    type: type,
    args: {
      doc: {type:inputType},
    },
    async resolve (ctx, params, options) {
      let doc = params.doc;
      if (doc && ctx.session && ctx.session.user) {
        doc = utils.createEditorDoc(ctx.session.user, doc);
      }
      if (resolves && resolves.add) {
        return await resolves.add(doc);
      }
      return await DB.add(model, doc);
    }
  };
  ret[`${tag}Remove`] = {
    type: new GraphQLList(GraphQLString),
    args: {
      ids: {type:new GraphQLList(GraphQLString)}
    },
    async resolve (ctx, params, options) {
      let ret = null;
      if (resolves && resolves.remove) {
        ret = await resolves.remove(params.ids);
      } else {
        ret = await DB.removeByIds(model, params.ids);
      }
      if (ret) {
        try{
          ret = JSON.parse(ret);
        } catch(error) {

        }
        if (ret.ok) {
          return params.ids;
        }
      }
      return null;
    }
  };
  ret[`${tag}Update`] = {
    type: commonFields.operateResultType,
    args: {
      doc: {type:inputType},
      conditions: {type:GraphQLString},
      id: {type:GraphQLString},
    },
    async resolve (ctx, params, options) {
      let doc = params.doc;
      if (doc && ctx.session && ctx.session.user) {
        doc = utils.createEditorDoc(ctx.session.user, doc);
      }
      if (params.conditions) {
        params.conditions = commonUtils.urlString2Conditions(params.conditions);
      } else {
        params.conditions = {_id:params.id};
      }
      if (resolves && resolves.update) {
        return await resolves.update(params.conditions, doc);
      } 
      return await DB.update(model, params.conditions, doc);
    }
  };
  return ret;
}