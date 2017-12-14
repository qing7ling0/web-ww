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
      console.log(JSON.stringify(params));
      let ret =[];
      if (params.page > -1) {
        ret = await DB.getList(model, {conditions:params.conditions}, {page:params.page, pageSize:params.pageSize}, onQuery);
      } else {
        ret = await DB.getList(model, {conditions:params.conditions}, null, onQuery);
      }
      console.log(JSON.stringify(ret));
      return ret;
    }
  }
}

export const createDefaultProfileQuery = (type, model) => {
  return {
    type: type,
    args: {
      id: {type:GraphQLString},
    },
    async resolve (root, params, options) {
      return await DB.findById(model, params.id);
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
      if (resolves && resolves.add) {
        return await resolves.add(params.doc);
      }
      return await DB.add(model, params.doc);
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
      if (params.conditions) {
        params.conditions = commonUtils.urlString2Conditions(params.conditions);
      } else {
        params.conditions = {_id:params.id};
      }
      if (resolves && resolves.update) {
        return await resolves.update(params.conditions, params.doc);
      } 
      return await DB.update(model, params.conditions, params.doc);
    }
  };
  return ret;
}