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