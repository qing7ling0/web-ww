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
  NID: {type:new GraphQLNonNull(GraphQLString), description:'编号'},
};

// 颜色（斜面颜色，内里颜色，鞋底颜色，底边颜色，原材料颜色）
const colorFields = {
  name:{type:GraphQLString, description:'名字'}
}

const customMaterialType = new GraphQLObjectType({
  name: 'customMaterialType',
  fields: {
    _id:{type:GraphQLString, description:''},
    name: {type:GraphQLString, description:'名称'},
    NID: {type:GraphQLString, description:'编号'},
    maintain_cycle: {type:GraphQLInt, decription:'保养周期'}
  }
})

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

// 充值奖励
const rechargeRewardFields = {
  mount: {type:GraphQLInt, description:'梯次'},
  reward: {type:GraphQLInt, description:'奖励'},
}

// vip等级
const VIPFields = {
  level: {type:GraphQLInt}, // 等级
  exp: {type:GraphQLInt}, // 升级经验
  discount:{type:GraphQLFloat}, // 享受的折扣
}

// 会员分析柱状图颜色
const customerAnalyseFields = {
  analyse_id: {type:GraphQLString, description:'分析的类型'},
  color_css: {type:GraphQLInt, description:'css颜色'},
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
  ...watchStrapStyleFields,
  ...rechargeRewardFields,
  ...customerAnalyseFields,
  ...VIPFields
}

export const commonType = new GraphQLObjectType({
  name: 'commonType',
  fields: {
    _id: { type: GraphQLString },
    hide: {type:GraphQLBoolean, description:'是否删除了'},
    n_material:{type: customMaterialType, decription:'内增皮料'},
    d_material:{type: customMaterialType, decription:'特大码皮料'},
    ...commonTypeFields,
    ...commonFields.defaultCreateFields
  }
});

export const commonInputType = new GraphQLInputObjectType({
  name: 'commonInputType',
  fields: {
    _id: { type: GraphQLString },
    n_material:{type: GraphQLString, decription:'内增皮料'},
    d_material:{type: GraphQLString, decription:'特大码皮料'},
    ...commonTypeFields,
  }
});

export const appVersionType = new GraphQLObjectType({
  name: 'appVersionType',
  fields: {
    _id: { type: GraphQLString },
    version:{type: GraphQLInt, decription:'版本号'},
    update_url:{type: GraphQLString, decription:'下载链接'},
    force:{type:GraphQLBoolean, decription:'是否强制更新'}
  }
});