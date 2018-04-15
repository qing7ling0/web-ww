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



/**
 * 复购率
 */
const repeatBuyPerType = new GraphQLObjectType({
  name: 'repeatBuyPerType',
  fields: {
    all_count: {type: GraphQLFloat, description:'总会员数量'},
    old_count: {type: GraphQLFloat, description:'老会员消费人数'},
    current_count: {type: GraphQLFloat, description:'复购人数'},
    last_count: {type: GraphQLFloat, description:'上一复购人数'},
    last_all_count: {type: GraphQLFloat, description:'上一总会员数量'},
  }
});
/**
 * 复购次数
 */
const repeatBuyCountType = new GraphQLObjectType({
  name: 'repeatBuyCountType',
  fields: {
    current_all_count: {type: GraphQLFloat, description:'当前总有效会员数量'},
    current: {type: GraphQLFloat, description:'总购买次数'},
    last_all_count: {type: GraphQLFloat, description:'上一总有效会员数量'},
    last: {type: GraphQLFloat, description:'上衣总购买次数'},
    highest: {type: GraphQLFloat, description:'最高消费次数'},
  }
});

/**
 * 有效会员
 */
const vaildVipType = new GraphQLObjectType({
  name: 'vaildVipType',
  fields: {
    all_count: {type: GraphQLFloat, description:'总会员数量'},
    vaild_count: {type: GraphQLFloat, description:'有效会员数量'}
  }
});

const baseAnalyseType = new GraphQLObjectType({
  name: 'baseAnalyseType',
  fields: {
    name: {type: GraphQLString, description:'名称'},
    value: {type: GraphQLFloat, description:'值'}
  }
});

/**
 * 会员分析
 */
export const analyseVipShopType = new GraphQLObjectType({
  name: 'analyseVipShopType',
  fields: {
    shop: {type: shopTypes.shopType},
    count: {type: GraphQLFloat, description:'新会员数量'},
    total_count: {type: GraphQLFloat, description:'总会员数量'},
  }
});

/**
 * 日
 */
export const analyseVipDayType = new GraphQLObjectType({
  name: 'analyseVipDayType',
  fields: {
    newAndOldAmount: {type: new GraphQLList(GraphQLFloat), description:'新老会员销售额'},
    countAndAmountPer: {type: new GraphQLList(GraphQLFloat), description:'客单价和客单价'},
  }
});

/**
 * 周
 */
export const analyseVipWeekType = new GraphQLObjectType({
  name: 'analyseVipWeekType',
  fields: {
    newAndOldAmount: {type: new GraphQLList(GraphQLFloat), description:'新老会员销售额'},
    countAndAmountPer: {type: new GraphQLList(GraphQLFloat), description:'客单价和客单价'},
    repeatBuyPer: {type: repeatBuyPerType, description:'复购率'},
  }
});

/**
 * 月
 */
export const analyseVipMonthType = new GraphQLObjectType({
  name: 'analyseVipMonthType',
  fields: {
    newAndOldAmount: {type: new GraphQLList(GraphQLFloat), description:'新老会员销售额'},
    countAndAmountPer: {type: new GraphQLList(GraphQLFloat), description:'客单价和客单价'},
    repeatBuyPer: {type: repeatBuyPerType, description:'复购率'},
    vaildVip: {type: vaildVipType, description:'有效会员'},
    monthBuyCountList: {type: new GraphQLList(GraphQLFloat), description:'最近5个月老会员消费次数'},
  }
});

/**
 * 年
 */
export const analyseVipYearType = new GraphQLObjectType({
  name: 'analyseVipYearType',
  fields: {
    newAndOldAmount: {type: new GraphQLList(GraphQLFloat), description:'新老会员销售额'},
    countAndAmountPer: {type: new GraphQLList(GraphQLFloat), description:'客单价和客单价'},
    repeatBuyPer: {type: repeatBuyPerType, description:'复购率'},
    repeatBuyCount: {type: repeatBuyCountType, description:'复购率'},
    vaildVip: {type: vaildVipType, description:'有效会员'},
    quarterBuyCountList: {type: new GraphQLList(GraphQLFloat), description:'本年4个季度老会员消费次数'},
    buyCount: {type: new GraphQLList(baseAnalyseType), description:'消费次数分布'},
  }
});
