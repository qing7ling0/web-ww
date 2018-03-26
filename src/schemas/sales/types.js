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

export const colorPaletteInputFields = {
  _id: {type:GraphQLString},
  name: {type:GraphQLString, description:'名称'},
  NID: {type:GraphQLString, description:'编号'},
};
export const colorPaletteType = new GraphQLObjectType({
  name: 'colorPaletteType',
  fields: {
    _id: {type:GraphQLString},
    name: {type:GraphQLString, description:'名称'},
    NID: {type:GraphQLString, description:'编号'},
    out_color: {type:commonType, description:'颜色'},
    in_color: {type:commonType, description:'内里颜色'},
    bottom_color: {type:commonType, description:'底侧颜色'},
    bottom_side_color: {type:commonType, description:'底板颜色'},
    ...commonFields.defaultCreateFields
  }
});
export const colorPaletteInputType = new GraphQLInputObjectType({
  name: 'colorPaletteInputType',
  fields: {
    name: {type:new GraphQLNonNull(GraphQLString), description:'名称'},
    NID: {type:new GraphQLNonNull(GraphQLString), description:'编号'},
    out_color: {type:new GraphQLNonNull(GraphQLString), description:'颜色'},
    in_color: {type:new GraphQLNonNull(GraphQLString), description:'内里颜色'},
    bottom_color: {type:new GraphQLNonNull(GraphQLString), description:'底侧颜色'},
    bottom_side_color: {type:new GraphQLNonNull(GraphQLString), description:'底板颜色'}
  }
});

export const materialInputFields = {
  _id: {type:GraphQLString},
  name: {type:GraphQLString, description:'名称'},
  NID: {type:GraphQLString, description:'编号'},
  count: {type:GraphQLInt, description:'数量'},
  maintain_cycle: {type:GraphQLInt, decription:'保养周期'}
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

export const tryFeedbackInputFields = {
  _id: {type:GraphQLString},
  suborder_id: {type:GraphQLString, description:'id'},
  message: {type:GraphQLString, description:'反馈内容'},
  transport_id : {type:GraphQLString, description:'快递单号'},
  status:{type:GraphQLInt}
};
export const tryFeedbackType = new GraphQLObjectType({
  name: 'tryFeedbackType',
  fields: {
    ...tryFeedbackInputFields,
    ...commonFields.defaultCreateFields
  }
});
export const tryFeedbackInputType = new GraphQLInputObjectType({
  name: 'tryFeedbackInputType',
  fields: {
    ...tryFeedbackInputFields,
  }
});

const orderBaseCommonFields = {
  _id: {type:GraphQLString, decription:'ID'},
  name: {type:GraphQLString, decription:'名称'},
  NID: {type:GraphQLString, decription:'编号'},
  color: {type:GraphQLString, decription:'颜色'},
  price: {type:GraphQLFloat, decription:'价格'},
  day: {type:GraphQLInt, decription:'天数'},
  maintain_cycle: {type:GraphQLInt, decription:'保养周期'},
};
const orderBaseCommonType = new GraphQLObjectType({
  name: 'orderBaseCommonType',
  fields: {
    ...orderBaseCommonFields
  }
});
const orderBaseCommonInputType = new GraphQLInputObjectType({
  name: 'orderBaseCommonInputType',
  fields: {
    ...orderBaseCommonFields
  }
});

const goodsBaseFields = {
  _id: {type:GraphQLString},
  NID: {type:GraphQLString, description:'编号'},
  name: {type:GraphQLString, description:'名称'},
  goods: {type:GraphQLString, description:'商品（鞋皮带表带）'},
  put_date: {type:GraphQLString, decription:'上架时间'},
  sex: {type:GraphQLString, decription:'男女'},
  price: {type:GraphQLInt, decription:'价格'}
};
const goodsFields = {
  ...goodsBaseFields,
  type: {type:orderBaseCommonType, description:'大分类'},
  style: {type:orderBaseCommonType, decription:'系列'},
  season: {type:orderBaseCommonType, decription:'季节'},
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
  s_material: {type:orderBaseCommonType, decription:'材质'},
  s_xuan_hao: {type:orderBaseCommonType, decription:'楦号'},
  s_gui_ge: {type:orderBaseCommonType, decription:'规格'},
  s_color_palette: {type:orderBaseCommonType, decription:'颜色搭配'},
  s_out_color: {type:orderBaseCommonType, decription:'鞋面颜色'},
  s_in_color: {type:orderBaseCommonType, decription:'里皮颜色'},
  s_bottom_color: {type:orderBaseCommonType, decription:'鞋底颜色'},
  s_bottom_side_color: {type:orderBaseCommonType, decription:'底边颜色'},
  s_gen_gao: {type:orderBaseCommonType, decription:'跟高'},
  s_tie_di:{type:orderBaseCommonType, decription:'贴底'},
}
const goodsShoesInputFields = {
  ...goodsShoesBaseFields,
  s_material: {type:GraphQLString, decription:'材质'},
  s_xuan_hao: {type:GraphQLString, decription:'楦号'},
  s_color_palette: {type:GraphQLString, decription:'颜色搭配'},
  s_out_color: {type:GraphQLString, decription:'鞋面颜色'},
  s_in_color: {type:GraphQLString, decription:'里皮颜色'},
  s_bottom_color: {type:GraphQLString, decription:'鞋底颜色'},
  s_bottom_side_color: {type:GraphQLString, decription:'底边颜色'},
  s_gen_gao: {type:GraphQLString, decription:'跟高'},
  s_tie_di:{type:GraphQLString, decription:'贴底'},
}

// 皮带
const goodsBeltBaseFields = {
};
const goodsBeltFields = {
  ...goodsBeltBaseFields,
  b_material: {type:orderBaseCommonType, decription:'材质'},
  b_color: {type:orderBaseCommonType, decription:'颜色'},
}
const goodsBeltInputFields = {
  ...goodsBeltBaseFields,
  b_material: {type:GraphQLString, decription:'材质'},
  b_color: {type:GraphQLString, decription:'颜色'},
}

// 表带
const goodsWatchStrapBaseFields = {
};
const goodsWatchStrapFields = {
  ...goodsWatchStrapBaseFields,
  ws_material: {type:orderBaseCommonType, decription:'材质'},
  ws_style: {type:orderBaseCommonType, decription:'类型'},
  ws_color: {type:orderBaseCommonType, decription:'颜色'},
}
const goodsWatchStrapInputFields = {
  ...goodsWatchStrapBaseFields,
  ws_material: {type:GraphQLString, decription:'材质'},
  ws_style: {type:GraphQLString, decription:'类型'},
  ws_color: {type:GraphQLString, decription:'颜色'},
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

const sampleGoodsInputFields = {
  NID: {type:GraphQLString, description:'编号'},
  type: {type: GraphQLString, decription:'类型'},
  shop: {type: GraphQLString, decription:'店铺'},
  sex: {type: GraphQLString, decription:'性别'},
  count: {type: GraphQLInt, decription:'数量'},
  left_count: {type: GraphQLInt},
  right_count: {type: GraphQLInt},
  pics:{type:new GraphQLList(GraphQLString)},
}

// 样品鞋数据
const sampleShoesFields = {
  s_right: {type:GraphQLBoolean, decription:'右脚'},
  s_foot_size: {type:GraphQLFloat, decription:'尺码'},
  s_length: {type: GraphQLFloat, description:'长度'},
  s_zhiWei: {type: GraphQLFloat, decription:'趾围'},
  s_fuWei: {type: GraphQLFloat, decription:'附维'},
}
const sampleBeltFields = {
  b_A: {type: GraphQLFloat, decription:'皮带测量数据A'},
  b_B: {type: GraphQLFloat, decription:'皮带测量数据B'},
  b_C: {type: GraphQLFloat, decription:'皮带测量数据C'},
  b_D: {type: GraphQLFloat, decription:'皮带测量数据D'},
}
const sampleWatchStrapFields = {
  ws_A: {type: GraphQLFloat, decription:'表带测量数据A'},
  ws_B: {type: GraphQLFloat, decription:'表带测量数据B'},
  ws_C: {type: GraphQLFloat, decription:'表带测量数据C'},
  ws_D: {type: GraphQLFloat, decription:'表带测量数据D'},
  ws_E: {type: GraphQLFloat, decription:'表带测量数据E'},
  ws_F: {type: GraphQLFloat, decription:'表带测量数据F'},
  ws_G: {type: GraphQLFloat, decription:'表带测量数据G'},
}
const sampleOrnamentFields = {
  o_name: {type: GraphQLString, decription:'名称'},
}

export const sampleGoodsType = new GraphQLObjectType({
  name: 'sampleGoodsType',
  fields: {
    _id: {type:GraphQLString},
    ...sampleGoodsInputFields,
    ...sampleBeltFields,
    ...sampleShoesFields,
    ...sampleWatchStrapFields,
    ...sampleOrnamentFields,
    shop: {type:shopTypes.shopType, ref:'shop', decription:'店铺'},
    ...commonFields.defaultCreateFields,
  }
})
export const sampleGoodsInputType = new GraphQLInputObjectType({
  name: 'sampleGoodsInputType',
  fields: {
    _id: {type:GraphQLString},
    ...sampleGoodsInputFields,
    ...sampleBeltFields,
    ...sampleShoesFields,
    ...sampleWatchStrapFields,
    ...sampleOrnamentFields,
    shop: {type:GraphQLString}
  }
})

// 库存调拨记录
const sampleAllotBaseType = new GraphQLObjectType({
  name: 'sampleAllotBaseType',
  fields: {
    _id: {type:GraphQLString},
    name: {type:GraphQLString},
    phone: {type:GraphQLString}
  }
})

// 库存调拨记录
export const sampleAllotType = new GraphQLObjectType({
  name: 'sampleAllotType',
  fields: {
    _id: {type:GraphQLString},
    sample: {type:sampleGoodsType},
    left_count: {type: GraphQLInt, decription:'左脚数量'},
    right_count: {type: GraphQLInt, decription:'右脚数量'},
    status: {type: GraphQLInt, decription:'状态'},
    apply_shop: {type:sampleAllotBaseType, decription:'申请的店铺'},
    apply_shop_guide: {type:sampleAllotBaseType, decription:'申请人'},
    goods_user: {type:sampleAllotBaseType, decription:'商品部跟进人'},
    accept_shop: {type:sampleAllotBaseType, decription:'申请的店铺'},
    accept_shop_guide: {type:sampleAllotBaseType, decription:'店铺负责人'},
    transport_company: {type:GraphQLString, decription:'快递公司'},
    transport_id: {type:GraphQLString, decription:'快递单号'},
    transport_phone: {type:GraphQLString, decription:'联系电话'},
    ...commonFields.defaultCreateFields,
  }
})
export const sampleAllotInputType = new GraphQLInputObjectType({
  name: 'sampleAllotInputType',
  fields: {
    _id: {type:GraphQLString},
    sample: {type:new GraphQLNonNull(GraphQLString)},
    left_count: {type: new GraphQLNonNull(GraphQLInt), decription:'左脚数量'},
    right_count: {type: new GraphQLNonNull(GraphQLInt), decription:'右脚数量'},
    status: {type: GraphQLInt, decription:'状态'},
    apply_shop: {type:new GraphQLNonNull(GraphQLString), decription:'申请的店铺'},
    apply_shop_guide: {type:new GraphQLNonNull(GraphQLString), decription:'申请人'},
    goods_user: {type:GraphQLString, decription:'商品部跟进人'},
    transport_company: {type:GraphQLString, decription:'快递公司'},
    transport_id: {type:GraphQLString, decription:'快递单号'},
    transport_phone: {type:GraphQLString, decription:'联系电话'},
  }
})
export const sampleAllotUpdateInputType = new GraphQLInputObjectType({
  name: 'sampleAllotUpdateInputType',
  fields: {
    status: {type: GraphQLInt, decription:'状态'},
    goods_user: {type:GraphQLString, decription:'商品部跟进人'},
    transport_company: {type:GraphQLString, decription:'快递公司'},
    transport_id: {type:GraphQLString, decription:'快递单号'},
    transport_phone: {type:GraphQLString, decription:'联系电话'},
  }
})

const orderCustomMaterialType = new GraphQLObjectType({
  name: 'orderCustomMaterialType',
  fields: {
    _id: {type:GraphQLString, decription:'ID'},
    name: {type:GraphQLString, decription:'名称'},
    NID: {type:GraphQLString, decription:'编号'},
  }
})
const orderCustomMaterialInputType = new GraphQLInputObjectType({
  name: 'orderCustomMaterialInputType',
  fields: {
    _id: {type:GraphQLString, decription:'ID'},
    name: {type:GraphQLString, decription:'名称'},
    NID: {type:GraphQLString, decription:'编号'},
  }
})

const orderCustomType = new GraphQLObjectType({
  name: 'orderCustomType',
  fields: {
    _id: {type:GraphQLString, decription:'ID'},
    name: {type:GraphQLString, decription:'名称'},
    price: {type:GraphQLFloat, decription:'价格'},
    NID: {type:GraphQLString, decription:'编号'},
    n_material:{type:orderCustomMaterialType, decription:'内增高皮料'},
    d_material:{type:orderCustomMaterialType, decription:'内增高皮料'}
  }
});
const orderCustomInputType = new GraphQLInputObjectType({
  name: 'orderCustomInputType',
  fields: {
    _id: {type:GraphQLString, decription:'ID'},
    name: {type:GraphQLString, decription:'名称'},
    price: {type:GraphQLFloat, decription:'价格'},
    NID: {type:GraphQLString, decription:'编号'},
    n_material:{type:orderCustomMaterialInputType, decription:'内增高皮料'},
    d_material:{type:orderCustomMaterialInputType, decription:'内增高皮料'}
  }
});
// 鞋
const orderShoesBaseFields = {
  s_foot_size: {type: GraphQLFloat, description:'尺码'},
  s_left_length: {type: GraphQLFloat, description:'左脚长度'},
  s_left_zhiWei: {type: GraphQLFloat, decription:'左脚趾围'},
  s_left_fuWei: {type: GraphQLFloat, decription:'左脚附维'},
  s_right_length: {type: GraphQLFloat, description:'右脚长度'},
  s_right_zhiWei: {type: GraphQLFloat, decription:'右脚趾围'},
  s_right_fuWei: {type: GraphQLFloat, decription:'右脚附维'},
  s_design_self: {type: GraphQLBoolean, decription:'是否来样设计'},
  s_production_step: {type: GraphQLInt, decription:'正品鞋制作环境'},
}
const orderShoesFields = {
  ...orderShoesBaseFields,
  s_xuan_hao:{type:orderBaseCommonType, decription:'鞋楦型'},
  s_gen_gao:{type:orderBaseCommonType, decription:'跟高'},
  s_material:{type:orderBaseCommonType, decription:'材料'},
  s_color_palette:{type:GraphQLString, decription:'颜色搭配'},
  s_out_color:{type:orderBaseCommonType, decription:'鞋面颜色'},
  s_in_color:{type:orderBaseCommonType, decription:'内里颜色'},
  s_bottom_color:{type:orderBaseCommonType, decription:'鞋底颜色'},
  s_bottom_side_color:{type:orderBaseCommonType, decription:'底边颜色'},
  s_tie_di:{type:orderBaseCommonType, decription:'贴底'},
  s_customs:{type:new GraphQLList(orderCustomType)}, // 特殊定制
  s_shoes: {type:goodsType, decription:'商品'}
}
const orderShoesInputFields = {
  ...orderShoesBaseFields,
  s_xuan_hao:{type:orderBaseCommonInputType, decription:'鞋楦型'},
  s_material:{type:orderBaseCommonInputType, decription:'材料'},
  s_color_palette:{type:GraphQLString, decription:'颜色搭配'},
  s_out_color:{type:orderBaseCommonInputType, decription:'鞋面颜色'},
  s_in_color:{type:orderBaseCommonInputType, decription:'内里颜色'},
  s_bottom_color:{type:orderBaseCommonInputType, decription:'鞋底颜色'},
  s_bottom_side_color:{type:orderBaseCommonInputType, decription:'底边颜色'},
  s_gen_gao:{type:orderBaseCommonInputType, decription:'跟高'},
  s_tie_di:{type:orderBaseCommonInputType, decription:'贴底'},
  s_customs:{type:new GraphQLList(orderCustomInputType)}, // 特殊定制
  s_shoes: {type:GraphQLString, decription:'商品'},
}

// 皮带
const orderBeltBaseFields = {
  b_A: {type: GraphQLFloat, decription:'皮带测量数据A'},
  b_B: {type: GraphQLFloat, decription:'皮带测量数据B'},
  b_C: {type: GraphQLFloat, decription:'皮带测量数据C'},
  b_D: {type: GraphQLFloat, decription:'皮带测量数据D'},
  b_size_remark: {type: GraphQLString, decription:'皮带测量备注'}
}
const orderBeltFields = {
  ...orderBeltBaseFields,
  b_material:{type:orderBaseCommonType, decription:'材质'},
  b_color:{type:orderBaseCommonType, decription:'颜色'},
  b_belt: {type:goodsType, decription:'皮带'}
}
const orderBeltInputFields = {
  ...orderBeltBaseFields,
  b_material:{type:orderBaseCommonInputType, decription:'材质'},
  b_color:{type:orderBaseCommonInputType, decription:'颜色'},
  b_belt:{type:GraphQLString, decription:'皮带'},
}

// 表带
const orderWatchStrapBaseFields = {
  ws_A: {type: GraphQLFloat, decription:'表带测量数据A'},
  ws_B: {type: GraphQLFloat, decription:'表带测量数据B'},
  ws_C: {type: GraphQLFloat, decription:'表带测量数据C'},
  ws_D: {type: GraphQLFloat, decription:'表带测量数据D'},
  ws_E: {type: GraphQLFloat, decription:'表带测量数据E'},
  ws_F: {type: GraphQLFloat, decription:'表带测量数据F'},
  ws_G: {type: GraphQLFloat, decription:'表带测量数据G'},
  ws_watch_brand:{type: GraphQLString, decription:'手表品牌'},
  ws_size_remark: {type: GraphQLString, decription:'表带测量备注'},
}
const orderWatchStrapFields = {
  ...orderWatchStrapBaseFields,
  ws_watchStrap: {type:goodsType, decription:'表带'},
  ws_material:{type:orderBaseCommonType, decription:'材质'},
  ws_style:{type:orderBaseCommonType, decription:'类别，男女'},
  ws_color:{type:orderBaseCommonType, decription:'颜色'},
}
const orderWatchStrapInputFields = {
  ...orderWatchStrapBaseFields,
  ws_watchStrap:{type:GraphQLString, decription:'表带'},
  ws_material:{type:orderBaseCommonInputType, decription:'材质'},
  ws_style:{type:orderBaseCommonInputType, decription:'类别，男女'},
  ws_color:{type:orderBaseCommonInputType, decription:'颜色'},
}

// 护理
const orderMaintainBaseFields = {
  m_name:{type:GraphQLString, decription:'护理内容'},
  m_price:{type:GraphQLFloat, decription:'护理价格'},
  m_time:{type:GraphQLFloat, decription:'护理时间'},
  m_color:{type:GraphQLString, decription:'颜色'},
  m_demo:{type:GraphQLString, decription:'样品'},
  m_wash:{type:GraphQLBoolean, decription:'是否水洗'},
}
const orderMaintainFields = {
  ...orderMaintainBaseFields,
  m_maintain: {type:GraphQLString, decription:'护理'},
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
  o_name:{type:GraphQLString, decription:'配饰'},
}
const orderOrnamentFields = {
  ...orderOrnamentBaseFields,
  o_ornament:{type:GraphQLString, decription:'配饰'},
}
const orderOrnamentInputFields = {
  ...orderOrnamentBaseFields,
  o_ornament:{type:GraphQLString, decription:'配饰'},
}

// 子订单
const subOrderBaseFields = {
  NID:{type:GraphQLString, decription:'编号'},
  sex:{type:GraphQLString, decription:'性别'},
  name:{type:GraphQLString, decription:'名称'},
  price:{type:GraphQLFloat, decription:'价格'},
  count:{type:GraphQLInt, decription:'数量'},
  type: {type:GraphQLString, decription:'类型'},
  state: {type:GraphQLInt, decription:'订单状态'},
  transport_company: {type:GraphQLString, decription:'快递公司'},
  transport_id:{type:GraphQLString, decription:'快递单号'},
  transport_name: {type:GraphQLString, decription:'收货人'},
  transport_phone: {type:GraphQLString, decription:'电话'},
  transport_address: {type:GraphQLString, decription:'收货地址'},
  transport_zipcode: {type:GraphQLString, decription:'邮编'},
  transport_price:{type:GraphQLFloat, decription:'快递费用'},
  remark:{type:GraphQLString, ddecription:'备注'},
}

export const orderPicType = new GraphQLObjectType({
    name: 'orderPicType',
    fields: {
      file:{type:GraphQLString, decription:'图片'},
      desc:{type:GraphQLString, decription:'说明'}
    }
  }
)

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
    urgent:{type:orderBaseCommonType, decription:'加急'},
    pics:{type:new GraphQLList(orderPicType)},
    file:{type:GraphQLString, decription:'工程文件'},
    sub_order_id:{type:GraphQLString, decription:'子订单id'},
    order:{type:GraphQLString},
    shop: {type:shopTypes.shopType, ref:'shop', decription:'店铺'},
    guide: {type:userTypes.userShopGuideType, ref:'user_shop_guide', decription:'导购'},
    customer: {type:customerTypes.customerType, ref:'customer', decription:'客户'},
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
    urgent:{type:orderBaseCommonInputType, ddecription:'加急'},
    shop: {type:GraphQLString, decription:'店铺'},
    guide: {type:GraphQLString, decription:'导购'},
    file: {type:GraphQLString, decription:'工程文件'},
    customer: {type:customerTypes.customerInputType, decription:'客户id'},
    pics:{type:new GraphQLList(new GraphQLInputObjectType({
        name: 'orderPicInputType',
        fields: {
          file:{type:GraphQLString, decription:'图片'},
          desc:{type:GraphQLString, decription:'说明'}
        }
      }
    ))}
  }
});

// 订单
const orderBaseFields = {
  source: {type:GraphQLString, description:'来源'},
  pay:{type:GraphQLFloat, decription:'支付金额'},
  pay_type:{type:GraphQLString, decription:'支付方式'},
  store_card_selected:{type:GraphQLBoolean, decription:'储值卡是否选择'},
  cash_ticket_NID:{type:GraphQLString, decription:'代金券ID', default:''},
  is_recharge:{type:GraphQLBoolean, decription:'是否充值订单', default:''},
  signature_pic: {type:GraphQLString},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}
export const orderType = new GraphQLObjectType({
  name: 'orderType',
  fields: {
    _id: {type:GraphQLString},
    ...orderBaseFields,
    shop: {type:shopTypes.shopType, ref:'shop', decription:'店铺'},
    guide: {type:userTypes.userShopGuideType, ref:'user_shop_guide', decription:'导购'},
    customer: {type:customerTypes.customerType, ref:'customer', decription:'客户'},
    system_price:{type:GraphQLFloat, decription:'吊牌价格'},
    real_pay_price:{type:GraphQLFloat, decription:'实际支付价格'},
    discount_price:{type:GraphQLFloat, decription:'实际优惠了多少'},
    sub_orders:{type:new GraphQLList(GraphQLString)},
    ...commonFields.defaultCreateFields
  }
});
export const orderDetailType = new GraphQLObjectType({
  name: 'orderDetailType',
  fields: {
    _id: {type:GraphQLString},
    ...orderBaseFields,
    sub_orders:{type:new GraphQLList(subOrderType)},
    ...commonFields.defaultCreateFields
  }
});
export const orderInputType = new GraphQLInputObjectType({
  name: 'orderInputType',
  fields: {
    ...orderBaseFields,
    sub_orders:{type:new GraphQLList(subOrderInputType)},
  }
});

