import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql';

const defaultPageFields = {
  page              : {type:GraphQLInt},
  pageSize          : {type:GraphQLInt},
  total             : {type:GraphQLInt},
}

module.exports.defaultCreateFields = {
  editor_time       : { type:GraphQLString, description:'编辑时间' },
  editor_id         : { type:GraphQLString },
  editor_name       : { type:GraphQLString, description:'编辑人' },
  create_time       : { type:GraphQLString, description:'创建时间' }
}

module.exports.defaultEditerFields = {
  editor_time       : { type:GraphQLString, description:'编辑时间' },
  editor_id         : { type:GraphQLString },
  editor_name       : { type:GraphQLString, description:'编辑人' },
}

module.exports.defaultPageFields = defaultPageFields;

module.exports.defaultPageType = new GraphQLObjectType({
  name: 'page',
  fields: defaultPageFields
})

/** 数据修改结果 */
module.exports.operateResultType = new GraphQLObjectType({
  name: 'operateResult',
  fields: {
    n : { type:GraphQLInt, description:'修改数量' },
    ok : { type:GraphQLInt, description:'是否成功1:0' },
  }
})