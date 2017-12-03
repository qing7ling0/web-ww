'use strict';

var _graphql = require('graphql');

var defaultPageFields = {
  page: { type: _graphql.GraphQLInt },
  pageSize: { type: _graphql.GraphQLInt },
  total: { type: _graphql.GraphQLInt }
};

module.exports.defaultCreateFields = {
  editor_time: { type: _graphql.GraphQLString, description: '编辑时间' },
  editor_id: { type: _graphql.GraphQLString },
  editor_name: { type: _graphql.GraphQLString, description: '编辑人' },
  create_time: { type: _graphql.GraphQLString, description: '创建时间' }
};

module.exports.defaultEditerFields = {
  editor_time: { type: _graphql.GraphQLString, description: '编辑时间' },
  editor_id: { type: _graphql.GraphQLString },
  editor_name: { type: _graphql.GraphQLString, description: '编辑人' }
};

module.exports.defaultPageFields = defaultPageFields;

module.exports.defaultPageType = new _graphql.GraphQLObjectType({
  name: 'page',
  fields: defaultPageFields
});

/** 数据修改结果 */
module.exports.operateResultType = new _graphql.GraphQLObjectType({
  name: 'operateResult',
  fields: {
    n: { type: _graphql.GraphQLInt, description: '修改数量' },
    ok: { type: _graphql.GraphQLInt, description: '是否成功1:0' }
  }
});
//# sourceMappingURL=common-fields.js.map