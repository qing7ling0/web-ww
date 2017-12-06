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

 export const customerInputFields = {
  name: {type:GraphQLString, description:'姓名'},
  phone: { type: GraphQLString, description:'电话' },
  sex: { type:GraphQLString },
  birthday: { type: GraphQLString },
  weixin: { type: GraphQLString },
  country: {type:GraphQLString, description:'国家'},
  city: {type:GraphQLString, description:'城市'},
  address: {type:GraphQLString, description:'地址'},
  zipcode: {type:GraphQLString, description:'邮编'},
  vip_card_date: {type: GraphQLString, description:'开卡日期'},
  vip_card_shop: {type: GraphQLString, description:'开卡门店'},
  vip_card_guide: {type: GraphQLString, description:'开卡导购'},
  vip_level: {type: GraphQLInt},
  join_type: { type:GraphQLString, description:'加入方式' },
};
export const customerFields = {
  _id: {type:GraphQLString},
  ...customerInputFields,
  weixin_code_pic: {type:GraphQLString, description:'微信二维码图片'},
  ...commonFields.defaultCreateFields
};

export const customerType = new GraphQLObjectType({
  name: 'customer',
  fields: {
    ...customerFields
  }
});

export const customerInputType = new GraphQLInputObjectType({
  name: 'customerInput',
  fields: {
    _id: {type:GraphQLString},
    ...customerInputFields
  }
});

export const footInputFields = {
  type: {type: GraphQLString, description:'左右脚'},
  size: {type: GraphQLFloat, description:'尺码'},
  length: {type: GraphQLFloat, description:'长度'},
  zhiWei: {type: GraphQLFloat, decription:'趾围'},
  fuWei: {type: GraphQLFloat, decription:'附维'},
};
export const footType = new GraphQLObjectType({
  name: 'footType',
  fields: {
    _id: {type:GraphQLString},
    ...footInputFields,
    ...commonFields.defaultCreateFields
  }
});
export const footInputType = new GraphQLInputObjectType({
  name: 'footInputType',
  fields: {
    ...footInputFields
  }
});

// 皮带尺寸
export const beltInputFields = {
  A: {type: GraphQLFloat, description:'A'},
  B: {type: GraphQLFloat, decription:'B'},
  C: {type: GraphQLFloat, decription:'C'},
  D: {type: GraphQLFloat, decription:'D'}
};
export const beltType = new GraphQLObjectType({
  name: 'beltType',
  fields: {
    _id: {type:GraphQLString},
    ...beltInputFields,
    ...commonFields.defaultCreateFields
  }
});
export const beltInputType = new GraphQLInputObjectType({
  name: 'beltInputType',
  fields: {
    ...beltInputFields
  }
});


// 表带尺寸
export const watchStrapInputFields = {
  A: {type: GraphQLFloat, description:'A'},
  B: {type: GraphQLFloat, decription:'B'},
  C: {type: GraphQLFloat, decription:'C'},
  D: {type: GraphQLFloat, decription:'D'},
  E: {type: GraphQLFloat, decription:'E'},
  F: {type: GraphQLFloat, decription:'F'},
  G: {type: GraphQLFloat, decription:'G'},
};
export const watchStrapType = new GraphQLObjectType({
  name: 'watchStrapType',
  fields: {
    _id: {type:GraphQLString},
    ...watchStrapInputFields,
    ...commonFields.defaultCreateFields
  }
});
export const watchStrapInputType = new GraphQLInputObjectType({
  name: 'watchStrapInputType',
  fields: {
    ...watchStrapInputFields
  }
});