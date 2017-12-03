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

 export const shopInputFields = {
  name: {type:GraphQLString, description:'门店名称'},
  open_date: { type: GraphQLString, description:'开业时间' },
  rents_expire_date: {type: GraphQLString, description:'房租到期时间'},
  rent: { type:GraphQLString, description:'租金'},
  area: {type: GraphQLFloat, description:'面积'},
  country: { type:GraphQLString, description:'国家' },
  region:{ type:GraphQLString, description:'大区ID'},
  province: { type:GraphQLString, description:'省' },
  marketLevel: { type:GraphQLString, description:'市场级别' },
  property:{type:GraphQLString, description:'店铺性质，是否特卖等'},
  phone: { type: GraphQLString, description:'电话' },
  address: { type:GraphQLString, description:'地址' },
  zipcode: { type:GraphQLString, description:'邮编'},
  close_date: { type:GraphQLString, description:'关店时间'},
  close_reason: { type:GraphQLString, description:'关店原因'}
};
export const shopFields = {
  _id: {type:GraphQLString},
  ...shopInputFields,
  ...commonFields.defaultCreateFields
};

export const shopType = new GraphQLObjectType({
  name: 'shop',
  fields: {
    ...shopFields,
    isNew:{type:GraphQLBoolean}
  }
});

export const shopInputType = new GraphQLInputObjectType({
  name: 'shopInput',
  fields: {
    _id: {type:GraphQLString},
    ...shopInputFields
  }
});
