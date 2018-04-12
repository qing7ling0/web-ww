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


export const analyseGoodsType = new GraphQLObjectType({
  name: 'analyseGoodsType',
  fields: {
    NID: {type: GraphQLString, description:'区域'},
    s_material: {type: GraphQLString, description:'材质'},
    b_material: {type: GraphQLString, description:'材质'},
    ws_material: {type: GraphQLString, description:'材质'},
    amount: {type: GraphQLFloat, description:'销售额'},
    count: {type: GraphQLInt, description:'数量'},
  }
});
export const analyseGoodsQuarterMaterialType = new GraphQLObjectType({
  name: 'analyseGoodsQuarterMaterialType',
  fields: {
    s_material: {type: GraphQLString, description:'材质'},
    b_material: {type: GraphQLString, description:'材质'},
    ws_material: {type: GraphQLString, description:'材质'},
    count: {type: GraphQLInt, description:'数量'},
  }
});

export const analyseGoodsMaterialType = new GraphQLObjectType({
  name: 'analyseGoodsMaterialType',
  fields: {
    _id: {type: GraphQLString, description:'id'},
    value: {type: GraphQLFloat, description:'值'},
  }
});

export const analyseGoodsSexType = new GraphQLObjectType({
  name: 'analyseGoodsSexType',
  fields: {
    name: {type: GraphQLString, description:'名称'},
    value: {type: GraphQLFloat, description:'值'},
    color: {type: GraphQLString, description:'颜色'},
  }
});
export const analyseGoodsQuarterSexType = new GraphQLObjectType({
  name: 'analyseGoodsQuarterSexType',
  fields: {
    name: {type: GraphQLString, description:'名称'},
    value: {type: new GraphQLList(GraphQLFloat), description:'值'},
    color: {type: GraphQLString, description:'颜色'},
  }
});
export const analyseGoodsPriceType = new GraphQLObjectType({
  name: 'analyseGoodsPriceType',
  fields: {
    price: {type: GraphQLFloat, description:'价格区间'},
    value: {type: GraphQLFloat, description:'值'},
  }
});
export const analyseGoodsQuarterPriceType = new GraphQLObjectType({
  name: 'analyseGoodsQuarterPriceType',
  fields: {
    price: {type: GraphQLFloat, description:'价格区间'},
    value: {type: new GraphQLList(GraphQLFloat), description:'值'},
  }
});
