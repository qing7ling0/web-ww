import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
} from 'graphql';
import commonFields from '../common/common-fields'

const MenuItem = {
  id: { type: GraphQLInt },
  name: { type: GraphQLString },
}

var SubMenuItem = new GraphQLObjectType({
  name: 'subMenu',
  fields: MenuItem
});

export const menu = new GraphQLObjectType({
  name: 'menu',
  fields: {
    ...MenuItem,
    subMenus: {type:new GraphQLList(SubMenuItem)},
  }
});

export const router = new GraphQLObjectType({
  name: 'router',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    url: { type: GraphQLString}
  }
});


const commonBaseFields = {
  type: {type:new GraphQLNonNull(GraphQLString), description:'类型'},
};

// 颜色（斜面颜色，内里颜色，鞋底颜色，底边颜色，原材料颜色）
const colorFields = {
  name:{type:GraphQLString, description:'名字'}
}

// 特殊定制
const customFields = {
  name:{type:GraphQLString, description:'名字'},
  price:{type:GraphQLFloat, description:'价格'},
}

// 加急
const urgentFields = {
  day:{type:GraphQLFloat, description:'天数'},
  price:{type:GraphQLFloat, description:'价格'},
}

// 项目护理
const maintainFields = {
  name: {type: GraphQLString, decription:'项目名称'},
  price: {type: GraphQLFloat, decription:'价格'},
  time: {type:GraphQLFloat, decription:'时间'},
}

// 商品大类
const goodsTypeFields = {
  name:{type:GraphQLString, description:'名称'}
}

// 商品系列
const goodsStyleFields = {
  name:{type:GraphQLString, description:'名称'}
}

// 商品季节
const goodsSeasonFields = {
  name:{type:GraphQLString, description:'名称'}
}

// 鞋子楦号
const xuanHaoFields = {
  name:{type:GraphQLString, description:'名称'}
}

// 表带类型
const watchStrapStyleFields = {
  name:{type:GraphQLString, description:'名称'}
}

const commonTypeFields = {
  ...commonBaseFields,
  ...colorFields,
  ...customFields,
  ...urgentFields,
  ...maintainFields,
  ...goodsTypeFields,
  ...goodsStyleFields,
  ...goodsSeasonFields,
  ...xuanHaoFields,
  ...watchStrapStyleFields
}

export const commonType = new GraphQLObjectType({
  name: 'commonType',
  fields: {
    _id: { type: GraphQLString },
    ...commonTypeFields,
    ...commonFields.defaultCreateFields
  }
});

export const commonInputType = new GraphQLInputObjectType({
  name: 'commonInputType',
  fields: {
    _id: { type: GraphQLString },
    ...commonTypeFields,
  }
});