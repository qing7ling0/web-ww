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
//  import  * as salesTypes from '../sales/types'


 export const customerInputFields = {
  name: {type:GraphQLString, description:'姓名'},
  phone: { type: GraphQLString, description:'电话' },
  sex: { type:GraphQLString },
  birthday: { type: GraphQLString },
  weixin: { type: GraphQLString },
  weixin_code_pic: {type:GraphQLString, description:'微信二维码图片'},
  country: {type:GraphQLString, description:'国家'},
  city: {type:GraphQLString, description:'城市'},
  address: {type:GraphQLString, description:'地址'},
  zipcode: {type:GraphQLString, description:'邮编'},
  vip_card_date: {type: GraphQLString, description:'开卡日期'},
  vip_level: {type: GraphQLInt},
  vip_exp:{type:GraphQLInt},
  balance:{type:GraphQLFloat},
  point:{type:GraphQLFloat},
  join_type: { type:GraphQLString, description:'加入方式' },
};
export const customerFields = {
  _id: {type:GraphQLString},
  ...customerInputFields,
  ...commonFields.defaultCreateFields
};

export const customerType = new GraphQLObjectType({
  name: 'customer',
  fields: {
    ...customerFields,
    vip_card_shop: {type: shopTypes.shopType, description:'开卡门店'},
    vip_card_guide: {type: userTypes.userShopGuideType, description:'开卡导购'},
    tags:{type:new GraphQLList(new GraphQLObjectType({
      name: 'vipTagsType',
      fields: {
        tag:{type:GraphQLString, decription:'标签'}
      }
    }))},
  }
});

export const customerInputType = new GraphQLInputObjectType({
  name: 'customerInput',
  fields: {
    _id: {type:GraphQLString},
    ...customerInputFields,
    vip_card_shop: {type: GraphQLString, description:'开卡门店'},
    vip_card_guide: {type: GraphQLString, description:'开卡导购'},
    tags:{type:new GraphQLList(new GraphQLInputObjectType({
        name: 'vipTagsInputType',
        fields: {
          tag:{type:GraphQLString, decription:'标签'},
        }
      }
    ))}
  }
});

export const customerReportBaseType = new GraphQLObjectType({
  name: 'customerReportBase',
  fields: {
    totalCount: {type:GraphQLInt},
    monthCount: {type:GraphQLInt},
    yearCount: {type:GraphQLInt},
    notBuyCount: {type:GraphQLInt}
  }
});

export const customerReportType = new GraphQLObjectType({
  name: 'customerReport',
  fields: {
    customer:{type:customerType},
    lastCostTime: {type: GraphQLString, description:'最后一次消费日期'},
    costCount: {type:GraphQLInt},
    costAmount: {type:GraphQLFloat},
  }
});

export const customerShopReportType = new GraphQLObjectType({
  name: 'customerShopReport',
  fields: {
    guide:{type:userTypes.userType},
    shop:{type:shopTypes.shopType},
    totalCount: {type:GraphQLInt},
    monthCount: {type:GraphQLInt},
    yearCount: {type:GraphQLInt},
    notBuyCount: {type:GraphQLInt}
  }
});

const orderFooterType = new GraphQLObjectType({
  name: 'orderFooterType',
  fields: {
    s_foot_size: {type: GraphQLFloat, description:'尺码'},
    s_left_length: {type: GraphQLFloat, description:'左脚长度'},
    s_left_zhiWei: {type: GraphQLFloat, decription:'左脚趾围'},
    s_left_fuWei: {type: GraphQLFloat, decription:'左脚附维'},
    s_right_length: {type: GraphQLFloat, description:'右脚长度'},
    s_right_zhiWei: {type: GraphQLFloat, decription:'右脚趾围'},
    s_right_fuWei: {type: GraphQLFloat, decription:'右脚附维'},
  }
});

export const customerVipFooterType = new GraphQLObjectType({
  name: 'customerVipFooterType',
  fields: {
    _id:{type: GraphQLString, description:"id"},
    name:{type: GraphQLString, description:"姓名"},
    phone: {type: GraphQLString, description:"手机"},
    s_foot_size: {type: GraphQLFloat, description:'尺码'},
    s_left_length: {type: GraphQLFloat, description:'左脚长度'},
    s_left_zhiWei: {type: GraphQLFloat, decription:'左脚趾围'},
    s_left_fuWei: {type: GraphQLFloat, decription:'左脚附维'},
    s_right_length: {type: GraphQLFloat, description:'右脚长度'},
    s_right_zhiWei: {type: GraphQLFloat, decription:'右脚趾围'},
    s_right_fuWei: {type: GraphQLFloat, decription:'右脚附维'},
  }
});

export const customerVipShoesOrderType = new GraphQLObjectType({
  name: 'customerVipShoesOrderType',
  fields: {
    _id:{type: GraphQLString, description:"id"},
    date:{type: GraphQLString, description:"姓名"},
    sub_order_id: {type: GraphQLString, description:"订单号"},
    NID: {type: GraphQLString, description:"货号"},
    s_xuan_hao_name: {type: GraphQLString, description:"货号"},
    shop_name: {type: GraphQLString, description:'店铺'},
    s_yang_ban: {type:GraphQLString, decription:'样板'},
    s_tie_xuan: {type:GraphQLString, decription:'贴楦'},
    s_tie_fa: {type:GraphQLString, decription:'贴法'},
    s_mark: {type:GraphQLString, decription:'备注'},
    s_feedback_list : {type: new GraphQLList(new GraphQLObjectType({
      name: 'customerVipFooterType',
      fields: {
        _id:{type: GraphQLString, description:"id"},
        message:{type: GraphQLString, description:"内容"},
        editor_time: {type: GraphQLString, description:"时间"},
      }
    })), decription:'试脚鞋反馈列表'}
  }
});

export const customerVipShoesOrderInputType = new GraphQLInputObjectType({
  name: 'customerVipShoesOrderInputType',
  fields: {
    s_yang_ban: {type:GraphQLString, decription:'样板'},
    s_tie_xuan: {type:GraphQLString, decription:'贴楦'},
    s_tie_fa: {type:GraphQLString, decription:'贴法'},
    s_mark: {type:GraphQLString, decription:'备注'}
  }
});
