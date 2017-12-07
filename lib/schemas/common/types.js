'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonInputType = exports.commonType = exports.router = exports.menu = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var MenuItem = {
  id: { type: _graphql.GraphQLInt },
  name: { type: _graphql.GraphQLString }
};

var SubMenuItem = new _graphql.GraphQLObjectType({
  name: 'subMenu',
  fields: MenuItem
});

var menu = exports.menu = new _graphql.GraphQLObjectType({
  name: 'menu',
  fields: _extends({}, MenuItem, {
    subMenus: { type: new _graphql.GraphQLList(SubMenuItem) }
  })
});

var router = exports.router = new _graphql.GraphQLObjectType({
  name: 'router',
  fields: {
    id: { type: _graphql.GraphQLInt },
    name: { type: _graphql.GraphQLString },
    url: { type: _graphql.GraphQLString }
  }
});

var commonBaseFields = {
  type: { type: _graphql.GraphQLString, description: '类型' }
};

// 颜色（斜面颜色，内里颜色，鞋底颜色，底边颜色，原材料颜色）
var colorFields = {
  name: { type: _graphql.GraphQLString, description: '名字' }

  // 特殊定制
};var customFields = {
  name: { type: _graphql.GraphQLString, description: '名字' },
  price: { type: _graphql.GraphQLFloat, description: '价格' }

  // 加急
};var urgentFields = {
  day: { type: _graphql.GraphQLFloat, description: '天数' },
  price: { type: _graphql.GraphQLFloat, description: '价格' }

  // 项目护理
};var maintainFields = {
  name: { type: _graphql.GraphQLString, decription: '项目名称' },
  price: { type: _graphql.GraphQLFloat, decription: '价格' },
  time: { type: _graphql.GraphQLFloat, decription: '时间' }

  // 商品大类
};var goodsTypeFields = {
  name: { type: _graphql.GraphQLString, description: '名称' }

  // 商品系列
};var goodsStyleFields = {
  name: { type: _graphql.GraphQLString, description: '名称' }

  // 商品季节
};var goodsSeasonFields = {
  name: { type: _graphql.GraphQLString, description: '名称' }

  // 鞋子楦号
};var xuanHaoFields = {
  name: { type: _graphql.GraphQLString, description: '名称' }

  // 表带类型
};var watchStrapStyleFields = {
  name: { type: _graphql.GraphQLString, description: '名称' }
};

var commonTypeFields = _extends({}, commonBaseFields, colorFields, customFields, urgentFields, maintainFields, goodsTypeFields, goodsStyleFields, goodsSeasonFields, xuanHaoFields, watchStrapStyleFields);

var commonType = exports.commonType = new _graphql.GraphQLObjectType({
  name: 'commonType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, commonTypeFields)
});

var commonInputType = exports.commonInputType = new _graphql.GraphQLInputObjectType({
  name: 'commonInputType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, commonTypeFields)
});
//# sourceMappingURL=types.js.map