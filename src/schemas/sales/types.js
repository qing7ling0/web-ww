import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLUnionType,
  GraphQLInputObjectType
} from 'graphql';

import commonFields from '../common/common-fields'
import constants from '../../constants/constants'
import * as shopTypes from '../shop/types'
import * as customerTypes from '../customer/types'
import * as userTypes from '../user/types'

export const colorInputFields = {
  name: {type:GraphQLString, description:'名称'},
  type: { type: GraphQLString, description:'类型' },
};
export const colorType = new GraphQLObjectType({
  name: 'colorType',
  fields: {
    _id: {type:GraphQLString},
    ...colorInputFields,
    ...commonFields.defaultCreateFields
  }
});
export const colorInputType = new GraphQLInputObjectType({
  name: 'colorInputType',
  fields: {
    ...colorInputFields
  }
});

export const materialInputFields = {
  _id: {type:GraphQLString},
  name: {type:GraphQLString, description:'名称'},
  count: {type:GraphQLInt, description:'数量'}
};
export const materialType = new GraphQLObjectType({
  name: 'materialType',
  fields: {
    ...materialInputFields,
    color: { type: colorType, description:'颜色' },
    ...commonFields.defaultCreateFields
  }
});
export const materialInputType = new GraphQLInputObjectType({
  name: 'materialInputType',
  fields: {
    ...materialInputFields,
    color: { type: GraphQLString, description:'颜色' },
  }
});

export const baseInputFields = {
  name: {type:GraphQLString, description:'名称'},
};
export const baseType = new GraphQLObjectType({
  name: 'baseType',
  fields: {
    _id: {type:GraphQLString},
    ...baseInputFields,
    ...commonFields.defaultCreateFields
  }
});
export const baseInputType = new GraphQLInputObjectType({
  name: 'baseInputType',
  fields: {
    ...baseInputFields
  }
});

export const goodsShoesBaseFields = {
  _id: {type:GraphQLString},
  name: {type:GraphQLString, description:'名称'},
  property: {type:GraphQLString, description:'属性'},
  put_date: {type:GraphQLString, decription:'上架时间'},
  sex: {type:GraphQLString, decription:'男女'},
  height: {type:GraphQLFloat, decription:'跟高'},
  price: {type:GraphQLInt, decription:'价格'},
  xuan_hao: {type:GraphQLString, decription:'楦号'},
  maintain_cycle: {type:GraphQLInt, decription:'保养周期'}
};
export const goodsShoesFields = {
  ...goodsShoesBaseFields,
  type: {type: baseType, description:'大分类'},
  style: {type: baseType, decription:'系列'},
  season: {type: baseType, decription:'季节'},
  out_color: {type:colorType, decription:'鞋面颜色'},
  in_color: {type:colorType, decription:'里皮颜色'},
  bottom_color: {type:colorType, decription:'鞋底颜色'},
  bottom_side_color: {type:colorType, decription:'底边颜色'},
};
export const goodsShoesInputFields = {
  ...goodsShoesBaseFields,
  type: {type: GraphQLString, description:'大分类'},
  style: {type: GraphQLString, decription:'系列'},
  season: {type: GraphQLString, decription:'季节'},
  out_color: {type:GraphQLString, decription:'鞋面颜色'},
  in_color: {type:GraphQLString, decription:'里皮颜色'},
  bottom_color: {type:GraphQLString, decription:'鞋底颜色'},
  bottom_side_color: {type:GraphQLString, decription:'底边颜色'},
};
export const goodsShoesType = new GraphQLObjectType({
  name: 'goodsShoesType',
  fields: {
    ...goodsShoesFields,
    ...commonFields.defaultCreateFields
  }
});
export const goodsShoesInputType = new GraphQLInputObjectType({
  name: 'goodsShoesInputType',
  fields: {
    ...goodsShoesInputFields
  }
});

export const maintainPriceInputFields = {
  type: {type: GraphQLString, description:'类型'},
  NID: {type: GraphQLString, description:'编号'},
  name: {type: GraphQLString, decription:'项目名称'},
  price: {type: GraphQLInt, decription:'价格'},
  time: {type:GraphQLInt, decription:'时间'},
};
export const maintainPriceType = new GraphQLObjectType({
  name: 'maintainPriceType',
  fields: {
    _id: {type:GraphQLString},
    ...maintainPriceInputFields,
    ...commonFields.defaultCreateFields
  }
});
export const maintainPriceInputType = new GraphQLInputObjectType({
  name: 'maintainPriceInputType',
  fields: {
    ...maintainPriceInputFields
  }
});

export const orderShoesInputFields = {
  type: {type:GraphQLString, description:'类型'},
  source: {type:GraphQLString, description:'来源'},
  count: {type:GraphQLInt, decription:'数量'},
  pay: {type:GraphQLFloat, decription:'支付金额'},
  pay_type: {type:GraphQLString, decription:'支付方式'},
  xieXuan: {type:GraphQLString, decription:'鞋楦型'},
  xieGen: {type:GraphQLString, decription:'鞋跟型'},
  order_state: {type:GraphQLString, decription:'订单状态'},
  transport_company: {type:GraphQLString, decription:'快递公司'},
  transport_id: {type:GraphQLString, decription:'快递单号'},
  transport_price: {type:GraphQLFloat, decription:'快递费用'},
  remark: {type:GraphQLString, ddecription:'备注'},
};
export const orderShoesType = new GraphQLObjectType({
  name: 'orderShoesType',
  fields: {
    _id: {type:GraphQLString},
    shop: {type:shopTypes.shopType, decription:'店铺'},
    guide: {type:userTypes.userShopGuideType, decription:'导购'},
    customer: {type:customerTypes.customerType, decription:'客户'},
    goods: {type:goodsShoesType, decription:'商品'},
    left_foot: {type:customerTypes.footType, decription:'左脚'},
    right_foot: {type:customerTypes.footType, decription:'右脚'},
    ...orderShoesInputFields,
    ...commonFields.defaultCreateFields
  }
});
export const orderShoesInputType = new GraphQLInputObjectType({
  name: 'orderShoesInputType',
  fields: {
    shop: {type:GraphQLString, decription:'店铺'},
    guide: {type:GraphQLString, decription:'导购'},
    customer: {type:GraphQLString, decription:'客户'},
    goods: {type:GraphQLString, decription:'商品'},
    left_foot: {type:GraphQLString, decription:'左脚'},
    right_foot: {type:GraphQLString, decription:'右脚'},
    ...orderShoesInputFields
  }
});