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

const MenuItem = {
  id: { type: GraphQLInt },
  name: { type: GraphQLString },
}

var SubMenuItem = new GraphQLObjectType({
  name: 'subMenu',
  fields: MenuItem
});

module.exports.menu = new GraphQLObjectType({
  name: 'menu',
  fields: {
    ...MenuItem,
    subMenus: {type:new GraphQLList(SubMenuItem)},
  }
});

module.exports.router = new GraphQLObjectType({
  name: 'router',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    url: { type: GraphQLString}
  }
});