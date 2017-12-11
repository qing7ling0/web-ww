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
import * as commonTypes from '../common/types'
import { customerType } from '../customer/types';
import { commonType } from '../common/types';

export const materialInputFields = {
  _id: {type:GraphQLString},
  name: {type:GraphQLString, description:'名称'},
  count: {type:GraphQLInt, description:'数量'}
};
export const materialType = new GraphQLObjectType({
  name: 'materialType',
  fields: {
    ...materialInputFields,
    color: { type: commonTypes.commonType, description:'颜色' },
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

const goodsBaseFields = {
  _id: {type:GraphQLString},
  NID: {type:GraphQLString, description:'编号'},
  name: {type:GraphQLString, description:'名称'},
  goods: {type:GraphQLString, description:'商品（鞋皮带表带）'},
  put_date: {type:GraphQLString, decription:'上架时间'},
  sex: {type:GraphQLString, decription:'男女'},
  price: {type:GraphQLInt, decription:'价格'},
  maintain_cycle: {type:GraphQLInt, decription:'保养周期'}
};
const goodsFields = {
  ...goodsBaseFields,
  type: {type:commonTypes.commonType, description:'大分类'},
  style: {type:commonTypes.commonType, decription:'系列'},
  season: {type:commonTypes.commonType, decription:'季节'},
  pics:{type:new GraphQLList(GraphQLString)},
}
const goodsInputFields = {
  ...goodsBaseFields,
  type: {type:GraphQLString, description:'大分类'},
  style: {type:GraphQLString, decription:'系列'},
  season: {type:GraphQLString, decription:'季节'},
  pics:{type:new GraphQLList(GraphQLString)},
}

// 鞋
const goodsShoesBaseFields = {};
const goodsShoesFields = {
  ...goodsShoesBaseFields,
  s_material: {type:materialType, decription:'材质'},
  s_xuan_hao: {type:commonTypes.commonType, decription:'楦号'},
  s_gui_ge: {type:commonTypes.commonType, decription:'规格'},
  s_out_color: {type:commonTypes.commonType, decription:'鞋面颜色'},
  s_in_color: {type:commonTypes.commonType, decription:'里皮颜色'},
  s_bottom_color: {type:commonTypes.commonType, decription:'鞋底颜色'},
  s_bottom_side_color: {type:commonTypes.commonType, decription:'底边颜色'},
  s_gen_gao: {type:commonTypes.commonType, decription:'跟高'},
}
const goodsShoesInputFields = {
  ...goodsShoesBaseFields,
  s_material: {type:GraphQLString, decription:'材质'},
  s_xuan_hao: {type:GraphQLString, decription:'楦号'},
  s_gui_ge: {type:GraphQLString, decription:'规格'},
  s_out_color: {type:GraphQLString, decription:'鞋面颜色'},
  s_in_color: {type:GraphQLString, decription:'里皮颜色'},
  s_bottom_color: {type:GraphQLString, decription:'鞋底颜色'},
  s_bottom_side_color: {type:GraphQLString, decription:'底边颜色'},
  s_gen_gao: {type:GraphQLString, decription:'跟高'},
}

// 皮带
const goodsBeltBaseFields = {
};
const goodsBeltFields = {
  ...goodsBeltBaseFields,
  b_material: {type:materialType, decription:'材质'},
  b_color: {type:commonTypes.commonType, decription:'颜色'},
}
const goodsBeltInputFields = {
  ...goodsBeltBaseFields,
  b_material: {type:GraphQLString, decription:'材质'},
  b_color: {type:GraphQLString, decription:'颜色'},
}

// 表带
const goodsWatchStrapBaseFields = {};
const goodsWatchStrapFields = {
  ...goodsWatchStrapBaseFields,
  ws_material: {type:materialType, decription:'材质'},
  ws_style: {type:commonTypes.commonType, decription:'类型'},
}
const goodsWatchStrapInputFields = {
  ...goodsWatchStrapBaseFields,
  ws_material: {type:GraphQLString, decription:'材质'},
  ws_style: {type:GraphQLString, decription:'类型'},
}

// 配饰
const goodsOrnamentBaseFields = {};
const goodsOrnamentFields = {
  ...goodsOrnamentBaseFields,
}
const goodsOrnamentInputFields = {
  ...goodsOrnamentBaseFields,
}

export const goodsType = new GraphQLObjectType({
  name: 'goodsType',
  fields: {
    _id: {type:GraphQLString},
    ...goodsFields,
    ...goodsShoesFields,
    ...goodsBeltFields,
    ...goodsWatchStrapFields,
    ...goodsOrnamentFields,
    ...commonFields.defaultCreateFields
  }
})
export const goodsInputType = new GraphQLInputObjectType({
  name: 'goodsInputType',
  fields: {
    _id: {type:GraphQLString},
    ...goodsInputFields,
    ...goodsShoesInputFields,
    ...goodsBeltInputFields,
    ...goodsWatchStrapInputFields,
    ...goodsOrnamentInputFields
  }
})

// 鞋
const orderShoesBaseFields = {
  s_count: {type:GraphQLInt, decription:'数量'},
  s_NID:{type:GraphQLString, decription:'编号'},
  s_foot_size: {type: GraphQLFloat, description:'尺码'},
  s_left_length: {type: GraphQLFloat, description:'左脚长度'},
  s_left_zhiWei: {type: GraphQLFloat, decription:'左脚趾围'},
  s_left_fuWei: {type: GraphQLFloat, decription:'左脚附维'},
  s_right_length: {type: GraphQLFloat, description:'右脚长度'},
  s_right_zhiWei: {type: GraphQLFloat, decription:'右脚趾围'},
  s_right_fuWei: {type: GraphQLFloat, decription:'右脚附维'},
  s_design_self: {type: GraphQLBoolean, decription:'是否来样设计'}
}
const orderShoesFields = {
  ...orderShoesBaseFields,
  s_xuan_hao:{type:commonTypes.commonType, decription:'鞋楦型'},
  s_gui_ge:{type:commonTypes.commonType, decription:'规格'},
  s_gen_gao:{type:commonTypes.commonType, decription:'跟高'},
  s_tie_di:{type:commonTypes.commonType, decription:'贴底'},
  s_material:{type:commonTypes.commonType, decription:'材料'},
  s_out_color:{type:commonTypes.commonType, decription:'鞋面颜色'},
  s_in_color:{type:commonTypes.commonType, decription:'内里颜色'},
  s_bottom_color:{type:commonTypes.commonType, decription:'鞋底颜色'},
  s_bottom_side_color:{type:commonTypes.commonType, decription:'底边颜色'},
  s_customs:{type:new GraphQLList(commonTypes.commonType)}, // 特殊定制
  s_shoes: {type:goodsType, decription:'商品'}
}
const orderShoesInputFields = {
  ...orderShoesBaseFields,
  s_xuan_hao:{type:GraphQLString, decription:'鞋楦型'},
  s_gui_ge:{type:GraphQLString, decription:'规格'},
  s_material:{type:GraphQLString, decription:'材料'},
  s_out_color:{type:GraphQLString, decription:'鞋面颜色'},
  s_in_color:{type:GraphQLString, decription:'内里颜色'},
  s_bottom_color:{type:GraphQLString, decription:'鞋底颜色'},
  s_bottom_side_color:{type:GraphQLString, decription:'底边颜色'},
  s_gen_gao:{type:GraphQLString, decription:'跟高'},
  s_tie_di:{type:GraphQLString, decription:'贴底'},
  s_customs:{type:new GraphQLList(GraphQLString)}, // 特殊定制
  s_shoes: {type:GraphQLString, decription:'商品'},
}

// 皮带
const orderBeltBaseFields = {
  b_NID:{type:GraphQLString, decription:'编号'},
  b_material:{type:GraphQLString, decription:'材质'},
  b_color:{type:GraphQLString, decription:'颜色'},
  b_A: {type: GraphQLFloat, decription:'皮带测量数据A'},
  b_B: {type: GraphQLFloat, decription:'皮带测量数据B'},
  b_C: {type: GraphQLFloat, decription:'皮带测量数据C'},
  b_D: {type: GraphQLFloat, decription:'皮带测量数据D'},
  b_size_remark: {type: GraphQLString, decription:'皮带测量备注'}
}
const orderBeltFields = {
  ...orderBeltBaseFields,
  b_belt: {type:goodsType, decription:'皮带'}
}
const orderBeltInputFields = {
  ...orderBeltBaseFields,
  b_belt:{type:GraphQLString, decription:'皮带'},
}

// 表带
const orderWatchStrapBaseFields = {
  ws_NID:{type:GraphQLString, decription:'编号'},
  ws_A: {type: GraphQLFloat, decription:'表带测量数据A'},
  ws_B: {type: GraphQLFloat, decription:'表带测量数据B'},
  ws_C: {type: GraphQLFloat, decription:'表带测量数据C'},
  ws_D: {type: GraphQLFloat, decription:'表带测量数据D'},
  ws_E: {type: GraphQLFloat, decription:'表带测量数据E'},
  ws_F: {type: GraphQLFloat, decription:'表带测量数据F'},
  ws_G: {type: GraphQLFloat, decription:'表带测量数据G'},
  ws_watch_brand:{type: GraphQLString, decription:'手表品牌'},
  ws_size_remark: {type: GraphQLString, decription:'表带测量备注'}
}
const orderWatchStrapFields = {
  ...orderWatchStrapBaseFields,
  ws_watchStrap: {type:goodsType, decription:'表带'},
  ws_material:{type:materialType, decription:'材质'},
  ws_style:{type:commonTypes.commonType, decription:'类别，男女'},
}
const orderWatchStrapInputFields = {
  ...orderWatchStrapBaseFields,
  ws_watchStrap:{type:GraphQLString, decription:'表带'},
  ws_material:{type:GraphQLString, decription:'材质'},
  ws_style:{type:GraphQLString, decription:'类别，男女'},
}

// 护理
const orderMaintainBaseFields = {
  m_NID:{type:GraphQLString, decription:'编号'},
  m_name:{type:GraphQLString, decription:'护理内容'},
  m_price:{type:GraphQLString, decription:'护理价格'},
  m_time:{type:GraphQLFloat, decription:'护理时间'},
  m_color:{type:GraphQLString, decription:'颜色'},
  m_demo:{type:GraphQLString, decription:'样品'},
  m_wash:{type:GraphQLBoolean, decription:'是否水洗'},
}
const orderMaintainFields = {
  ...orderMaintainBaseFields,
  m_maintain: {type:commonTypes.commonType, decription:'护理'},
}
const orderMaintainInputFields = {
  ...orderMaintainBaseFields,
  m_maintain: {type:GraphQLString, decription:'护理'},
}

// 充值
const orderRechargeBaseFields = {
  r_amount:{type:GraphQLFloat, decription:'充值金额'},
}
const orderRechargeFields = {
  ...orderRechargeBaseFields
}
const orderRechargeInputFields = {
  ...orderRechargeBaseFields
}

// 配饰
const orderOrnamentBaseFields = {
  o_NID:{type:GraphQLString, decription:'编号'},
  o_name:{type:GraphQLString, decription:'配饰'},
}
const orderOrnamentFields = {
  ...orderOrnamentBaseFields,
  o_ornament:{type:goodsType, decription:'配饰'},
}
const orderOrnamentInputFields = {
  ...orderOrnamentBaseFields,
  o_ornament:{type:GraphQLString, decription:'配饰'},
}

// 子订单
const subOrderBaseFields = {
  type: {type:GraphQLString, decription:'类型'},
  state: {type:GraphQLString, decription:'订单状态'},
  transport_company: {type:GraphQLString, decription:'快递公司'},
  transport_id:{type:GraphQLString, decription:'快递单号'},
  transport_price:{type:GraphQLFloat, decription:'快递费用'},
  remark:{type:GraphQLString, ddecription:'备注'},
  urgent_day: {type: GraphQLInt, decription:'加急天数'},
  urgent_price: {type: GraphQLFloat, decription:'加急价格'},
}

export const subOrderType = new GraphQLObjectType({
  name: 'subOrderType',
  fields: {
    _id: {type:GraphQLString},
    ...subOrderBaseFields,
    ...orderShoesFields,
    ...orderBeltFields,
    ...orderWatchStrapFields,
    ...orderMaintainFields,
    ...orderRechargeFields,
    ...orderOrnamentFields,
    pics:{type:new GraphQLList(new GraphQLObjectType({
        name: 'orderPicType',
        fields: {
          file:{type:GraphQLString, decription:'图片'},
          desc:{type:GraphQLString, decription:'说明'}
        }
      }
    ))},
    sub_order_id:{type:GraphQLString, decription:'子订单id'},
    ...commonFields.defaultCreateFields
  }
});
export const subOrderInputType = new GraphQLInputObjectType({
  name: 'subOrderInputType',
  fields: {
    ...subOrderBaseFields,
    ...orderShoesInputFields,
    ...orderBeltInputFields,
    ...orderWatchStrapInputFields,
    ...orderMaintainInputFields,
    ...orderRechargeInputFields,
    ...orderOrnamentInputFields,
    pics:[{type:new GraphQLList(new GraphQLInputObjectType({
        name: 'orderPicInputType',
        fields: {
          file:{type:GraphQLString, decription:'图片'},
          desc:{type:GraphQLString, decription:'说明'}
        }
      }
    ))}],
    ...commonFields.defaultCreateFields
  }
});

// 订单
const orderBaseFields = {
  source: {type:GraphQLString, description:'来源'},
  pay:{type:GraphQLFloat, decription:'支付金额'},
  pay_type:{type:GraphQLString, decription:'支付方式'},
  transport_name: {type:GraphQLString, decription:'收货人'},
  transport_phone: {type:GraphQLString, decription:'电话'},
  transport_address: {type:GraphQLString, decription:'收货地址'},
  transport_zipcode: {type:GraphQLString, decription:'邮编'}
}
export const orderType = new GraphQLObjectType({
  name: 'orderType',
  fields: {
    _id: {type:GraphQLString},
    ...orderBaseFields,
    shop: {type:shopTypes.shopType, ref:'shop', decription:'店铺'},
    guide: {type:userTypes.userShopGuideType, ref:'user_shop_guide', decription:'导购'},
    customer: {type:customerTypes.customerType, ref:'customer', decription:'客户'},
    sub_order:{type:new GraphQLList(subOrderType)},
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
    ...commonFields.defaultCreateFields
  }
});