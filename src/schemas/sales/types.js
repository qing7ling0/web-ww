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
  GraphQLList,
} from 'graphql';

import commonFields from '../common/common-fields'
import constants from '../../constants/constants'
import * as shopTypes from '../shop/types'
import * as customerTypes from '../customer/types'
import * as userTypes from '../user/types'
import { customerType } from '../customer/types';

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

export const goodsBaseFields = {
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
  order_state: {type:GraphQLString, decription:'订单状态'},
  transport_company: {type:GraphQLString, decription:'快递公司'},
  transport_id: {type:GraphQLString, decription:'快递单号'},
  transport_price: {type:GraphQLFloat, decription:'快递费用'},
  transport_name: {type:GraphQLString, decription:'收货人'},
  transport_phone: {type:GraphQLString, decription:'电话'},
  transport_address: {type:GraphQLString, decription:'收货地址'},
  transport_zipcode: {type:GraphQLString, decription:'邮编'},
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
    xieXuan: {type:GraphQLString, decription:'鞋楦型'},
    xieGen: {type:GraphQLString, decription:'鞋跟型'},
    foot_size: {type: GraphQLFloat, description:'尺码'},
    left_length: {type: GraphQLFloat, description:'左脚长度'},
    left_zhiWei: {type: GraphQLFloat, decription:'左脚趾围'},
    left_fuWei: {type: GraphQLFloat, decription:'左脚附维'},
    right_length: {type: GraphQLFloat, description:'右脚长度'},
    right_zhiWei: {type: GraphQLFloat, decription:'右脚趾围'},
    right_fuWei: {type: GraphQLFloat, decription:'右脚附维'},
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
    xieXuan: {type:GraphQLString, decription:'鞋楦型'},
    xieGen: {type:GraphQLString, decription:'鞋跟型'},
    foot_size: {type: GraphQLFloat, description:'尺码'},
    left_length: {type: GraphQLFloat, description:'左脚长度'},
    left_zhiWei: {type: GraphQLFloat, decription:'左脚趾围'},
    left_fuWei: {type: GraphQLFloat, decription:'左脚附维'},
    right_length: {type: GraphQLFloat, description:'右脚长度'},
    right_zhiWei: {type: GraphQLFloat, decription:'右脚趾围'},
    right_fuWei: {type: GraphQLFloat, decription:'右脚附维'},
    ...orderShoesInputFields
  }
});

export const customFields = {
  NID: {type: GraphQLString, description:'内容'},
  name: {type: GraphQLString, description:'内容'},
  price: {type: GraphQLFloat, decription:'价格'},
};
export const customType = new GraphQLObjectType({
  name: 'customType',
  fields: {
    _id: {type:GraphQLString},
    ...customFields,
    ...commonFields.defaultCreateFields
  }
});
export const customInputType = new GraphQLInputObjectType({
  name: 'customInputType',
  fields: {
    ...customFields
  }
});

export const urgentFields = {
  day: {type: GraphQLFloat, description:'天数'},
  price: {type: GraphQLFloat, decription:'价格'},
};
export const urgentType = new GraphQLObjectType({
  name: 'urgentType',
  fields: {
    _id: {type:GraphQLString},
    ...urgentFields,
    ...commonFields.defaultCreateFields
  }
});
export const urgentInputType = new GraphQLInputObjectType({
  name: 'urgentInputType',
  fields: {
    ...urgentFields
  }
});

// 鞋
const shoesBaseFields = {
  s_count: {type:GraphQLInt, decription:'数量'},
  s_kuanhao:{type:GraphQLString, decription:'款号'},
  s_xieXuan:{type:GraphQLString, decription:'鞋楦型'},
  s_xieGen:{type:GraphQLString, decription:'鞋跟型'},
  s_guiGe:{type:GraphQLString, decription:'规格'},
  s_material:{type:GraphQLString, decription:'材料'},
  s_xiemian_color:{type:GraphQLString, decription:'鞋面颜色'},
  s_neili_color:{type:GraphQLString, decription:'内里颜色'},
  s_foot_size: {type: GraphQLFloat, description:'尺码'},
  s_left_length: {type: GraphQLFloat, description:'左脚长度'},
  s_left_zhiWei: {type: GraphQLFloat, decription:'左脚趾围'},
  s_left_fuWei: {type: GraphQLFloat, decription:'左脚附维'},
  s_right_length: {type: GraphQLFloat, description:'右脚长度'},
  s_right_zhiWei: {type: GraphQLFloat, decription:'右脚趾围'},
  s_right_fuWei: {type: GraphQLFloat, decription:'右脚附维'},
  s_urgent_day: {type: GraphQLInt, decription:'加急天数'},
  s_urgent_price: {type: GraphQLFloat, decription:'加急价格'}
}

const shoesFields = {
  ...shoesBaseFields,
  s_customs:{type:new GraphQLList(customType)}, // 特殊定制
  s_shoes: {type:goodsShoesType, decription:'商品'}
}

const shoesInputFields = {
  ...shoesBaseFields,
  s_customs:{type:new GraphQLList(customInputType)}, // 特殊定制
  s_shoes: {type:GraphQLString, decription:'商品'},
}

// 皮带
const beltBaseFields = {
  // b_belt: {type:Schema.Types.ObjectId, ref:'goods_shoes', decription:'商品'},
  b_NID:{type:GraphQLString, decription:'编号'},
  b_kuanhao:{type:GraphQLString, decription:'款号'},
  b_material:{type:GraphQLString, decription:'材质'},
  b_color:{type:GraphQLString, decription:'颜色'},
  b_A: {type: GraphQLFloat, decription:'皮带测量数据A'},
  b_B: {type: GraphQLFloat, decription:'皮带测量数据B'},
  b_C: {type: GraphQLFloat, decription:'皮带测量数据C'},
  b_D: {type: GraphQLFloat, decription:'皮带测量数据D'},
  b_size_remark: {type: GraphQLString, decription:'皮带测量备注'},
}
const beltFields = {
  ...beltBaseFields
}
const beltInputFields = {
  ...beltBaseFields
}

// 表带
const watchStrapBaseFields = {
  bs_NID:{type:GraphQLString, decription:'编号'},
  bs_kuanhao:{type:GraphQLString, decription:'款号'},
  bs_material:{type:GraphQLString, decription:'材质'},
  bs_color:{type:GraphQLString, decription:'颜色'},
  bs_type:{type:GraphQLString, decription:'类别，男女'},
  bs_A: {type: GraphQLFloat, decription:'表带测量数据A'},
  bs_B: {type: GraphQLFloat, decription:'表带测量数据B'},
  bs_C: {type: GraphQLFloat, decription:'表带测量数据C'},
  bs_D: {type: GraphQLFloat, decription:'表带测量数据D'},
  bs_E: {type: GraphQLFloat, decription:'表带测量数据E'},
  bs_F: {type: GraphQLFloat, decription:'表带测量数据F'},
  bs_G: {type: GraphQLFloat, decription:'表带测量数据G'},
  bs_watch_brand:{type: GraphQLString, decription:'手表品牌'},
  bs_size_remark: {type: GraphQLString, decription:'表带测量备注'},
}
const watchStrapFields = {
  ...watchStrapBaseFields
}
const watchStrapInputFields = {
  ...watchStrapBaseFields
}

// 护理
const maintainBaseFields = {
  m_NID:{type:GraphQLString, decription:'编号'},
  m_name:{type:GraphQLString, decription:'护理内容'},
  m_price:{type:GraphQLString, decription:'护理价格'},
  m_time:{type:GraphQLFloat, decription:'护理时间'},
  m_color:{type:GraphQLString, decription:'颜色'},
  m_demo:{type:GraphQLString, decription:'样品'},
  m_wash:{type:GraphQLBoolean, decription:'是否水洗'}
}
const maintainFields = {
  ...maintainBaseFields
}
const maintainInputFields = {
  ...maintainBaseFields
}

// 辅料
const fuliaoBaseFields = {
  f_NID:{type:GraphQLString, decription:'编号'},
  f_name:{type:GraphQLString, decription:'名称'},
  f_kuanhao:{type:GraphQLString, decription:'款号'},
}
const fuliaoFields = {
  ...fuliaoBaseFields
}
const fuliaoInputFields = {
  ...fuliaoBaseFields
}

// 配饰
const ornamentBaseFields = {
  o_NID:{type:GraphQLString, decription:'编号'},
  o_name:{type:GraphQLString, decription:'名称'},
  o_kuanhao:{type:GraphQLString, decription:'款号'},
}
const ornamentFields = {
  ...ornamentBaseFields
}
const ornamentInputFields = {
  ...ornamentBaseFields
}

const orderBaseFields = {
  type: {type:GraphQLString, description:'类型'},
  source: {type:GraphQLString, description:'来源'},
  pay:{type:GraphQLFloat, decription:'支付金额'},
  pay_type:{type:GraphQLString, decription:'支付方式'},
  order_state: {type:GraphQLString, decription:'订单状态'},
  transport_company: {type:GraphQLString, decription:'快递公司'},
  transport_id:{type:GraphQLString, decription:'快递单号'},
  transport_price:{type:GraphQLFloat, decription:'快递费用'},
  transport_name: {type:GraphQLString, decription:'收货人'},
  transport_phone: {type:GraphQLString, decription:'电话'},
  transport_address: {type:GraphQLString, decription:'收货地址'},
  transport_zipcode: {type:GraphQLString, decription:'邮编'},
  remark:{type:GraphQLString, ddecription:'备注'},
}

export const orderType = new GraphQLObjectType({
  name: 'orderType',
  fields: {
    _id: {type:GraphQLString},
    ...orderBaseFields,
    shop: {type:shopTypes.shopType, ref:'shop', decription:'店铺'},
    guide: {type:userTypes.userShopGuideType, ref:'user_shop_guide', decription:'导购'},
    customer: {type:customerTypes.customerType, ref:'customer', decription:'客户'},
    ...shoesFields,
    ...beltFields,
    ...watchStrapFields,
    ...maintainFields,
    ...fuliaoFields,
    ...ornamentFields,
    ...commonFields.defaultCreateFields
  }
});

export const orderInputType = new GraphQLInputObjectType({
  name: 'orderInputType',
  fields: {
    ...orderBaseFields,
    shop: {type:GraphQLString, decription:'店铺'},
    guide: {type:GraphQLString, decription:'导购'},
    customer: {type:customerTypes.customerInputType, decription:'客户id'},
    ...shoesInputFields,
    ...beltInputFields,
    ...watchStrapInputFields,
    ...maintainInputFields,
    ...fuliaoInputFields,
    ...ornamentInputFields,
    ...commonFields.defaultCreateFields
  }
});