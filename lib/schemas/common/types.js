'use strict';

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

module.exports.menu = new _graphql.GraphQLObjectType({
  name: 'menu',
  fields: _extends({}, MenuItem, {
    subMenus: { type: new _graphql.GraphQLList(SubMenuItem) }
  })
});

module.exports.router = new _graphql.GraphQLObjectType({
  name: 'router',
  fields: {
    id: { type: _graphql.GraphQLInt },
    name: { type: _graphql.GraphQLString },
    url: { type: _graphql.GraphQLString }
  }
});
//# sourceMappingURL=types.js.map