import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLUnionType,
  GraphQLInputObjectType,
  GraphQLList
} from 'graphql';

 import commonFields from '../common/common-fields'
 import constants from '../../constants/constants'
 import  * as shopTypes from '../shop/types'
 import  * as userTypes from '../user/types'


export const analysePriceType = new GraphQLObjectType({
  name: 'analysePriceType',
  fields: {
    shop: {type: new GraphQLObjectType({
      name: 'analyseShop',
      fields: {
        ...shopTypes.shopFields,
        region_id: {type: GraphQLString, description:'区域'},
      }
    }), description:'门店'},
    amount: {type: GraphQLFloat, description:'销售额'},
    count: {type: GraphQLInt, description:'订单数量'},
    sub_count: {type: GraphQLInt, description:'子订单数量'}
  }
});

export const analyseShopType = new GraphQLObjectType({
  name: 'analyseShopType',
  fields: {
    shop: {type: shopTypes.shopType, description:'门店'},
    amount: {type: GraphQLFloat, description:'销售额'},
    count: {type: GraphQLInt, description:'订单数量'},
    sub_count: {type: GraphQLInt, description:'子订单数量'}
  }
});
