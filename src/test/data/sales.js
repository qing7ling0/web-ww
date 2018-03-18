import moment from 'moment'

import salesData from '../../data/sales'
import constants, { ORDER_SOURCE } from '../../constants/constants'
import { shopModel, userShopGuideModel, materialModel, commonModel, orderModel } from '../../models/index';
import * as commonUtils from '../../utils/common-utils';

var materialList= null;

const CUSTOMERS = [
  {name:'张三', phone:'13012121212', sex:'男'},
  {name:'李四', phone:'13112121212', sex:'男'},
  {name:'王二', phone:'13212121212', sex:'男'},
  {name:'麻子', phone:'13512121212', sex:'男'},
  {name:'小红', phone:'13099999999', sex:'女'},
  {name:'丽丽', phone:'13199999999', sex:'女'},
  {name:'露西', phone:'13399999999', sex:'女'},
  {name:'芙蓉', phone:'13899999999', sex:'女'},
]

var addOrderTest = async function(ctx, time) {

  let order = {};
  
  order.source = constants.ORDER_SOURCE[0].value,
  order.pay = 1000,
  order.pay_type = constants.PAY_TYPE[0].value;
  order.store_card_selected = false;
  order.is_recharge = false;
  order.sub_orders = [];

  try {
    let subCount = Math.floor(Math.random()*1000000) % 100;
    if (subCount < 80) {
      subCount = 1;
    } else if (subCount < 90) {
      subCount = 2;
    } else if (subCount < 98) {
      subCount = 3;
    } else {
      subCount = 4;
    }
    for(let i=0; i<subCount; i++) {

      if (!materialList) {
        materialList = await materialModel.find();
      }
    
      let materialIndex = Math.floor(Math.random()*1000000) % materialList.length;
      let material = materialList[materialIndex];
    
      let shoesList = await salesData.getGoodsList(constants.GOODS_SHOES, {page:-1, pageSize:0}, {});
      let index = Math.floor(Math.random()*1000000) % CUSTOMERS.length;
      let customer = CUSTOMERS[index];
    
      let shopList = await shopModel.find({});
      let shopIndex = Math.floor(Math.random()*1000000) % shopList.length;
      let shopInfo = shopList[shopIndex];
    
      let guideList = await userShopGuideModel.find({shop:shopInfo._id});
      let guideIndex = Math.floor(Math.random()*1000000) % guideList.length;
      let guideInfo = guideList[guideIndex];
    
      let xuanHaoList = await commonModel.find({type:constants.COMMON_DATA_TYPES.XUAN_HAO});
      let guigeList = await commonModel.find({type:constants.COMMON_DATA_TYPES.SHOES_GUI_GE});
      let tiebianList = await commonModel.find({type:constants.COMMON_DATA_TYPES.SHOES_TIE_BIAN});
      let genGaoList = await commonModel.find({type:constants.COMMON_DATA_TYPES.SHOES_GEN_GAO});
      let inColorList = await commonModel.find({type:constants.COMMON_DATA_TYPES.SHOES_IN_COLOR});
      let outColorList = await commonModel.find({type:constants.COMMON_DATA_TYPES.SHOES_OUT_COLOR});
      let bottomColorList = await commonModel.find({type:constants.COMMON_DATA_TYPES.SHOES_BOTTOM_COLOR});
      let bottomSideColorList = await commonModel.find({type:constants.COMMON_DATA_TYPES.SHOES_BOTTOM_SIDE_COLOR});
    // if (shoesList && shoesList.list.length > 0) {
      
      console.log('----test add 1 order');
      // let goodsShoes = shoesList.list[0];
      let subOrder = {};
      // subOrder.NID = 'NID101';
      subOrder.name = '';
      subOrder.price = 1000+2000*Math.random();
      subOrder.count = 1;
      console.log('----test add 2 order');
      subOrder.type = constants.E_ORDER_TYPE.SHOES;
      subOrder.transport_name = '吴飞';
      subOrder.transport_address = '上海市陆家嘴';
      subOrder.remark = '备注啊';
      
      subOrder.s_foot_size = 22;
      subOrder.s_left_length = 22.5;
      subOrder.s_left_zhiWei = 22.5;
      subOrder.s_left_fuWei = 22.5;
      subOrder.s_right_length = 12.5;
      subOrder.s_right_zhiWei = 12.5;
      subOrder.s_right_fuWei = 12.5;
      subOrder.s_design_self = false;
      
      subOrder.s_xuan_hao = {
        _id:xuanHaoList[0]._id,
        name:xuanHaoList[0].name,
        NID:xuanHaoList[0].NID
      };
      subOrder.s_gui_ge = {
        _id:guigeList[0]._id,
        name:guigeList[0].name,
        NID:guigeList[0].NID
      };
      subOrder.s_material = {
        _id:material._id,
        name:material.name,
        NID:material.NID
      };
      subOrder.s_out_color = {
        _id:outColorList[0]._id,
        name:outColorList[0].name,
        NID:outColorList[0].NID
      };
      subOrder.s_in_color = {
        _id:inColorList[0]._id,
        name:inColorList[0].name,
        NID:inColorList[0].NID
      };
      subOrder.s_bottom_color = {
        _id:bottomColorList[0]._id,
        name:bottomColorList[0].name,
        NID:bottomColorList[0].NID
      };
      subOrder.s_bottom_side_color = {
        _id:bottomSideColorList[0]._id,
        name:bottomSideColorList[0].name,
        NID:bottomSideColorList[0].NID
      };
      if (customer.sex === '女') {
        subOrder.s_gen_gao = {
          _id:genGaoList[0]._id,
          name:genGaoList[0].name,
          NID:genGaoList[0].NID
        };
      }
      subOrder.s_tie_di = {
        _id:tiebianList[0]._id,
        name:tiebianList[0].name,
        NID:tiebianList[0].NID
      };
      // subOrder.s_customs = [
      //   {
      //     _id: '5a2a5e04700447398cbf3e6b',
      //     "type" : "9",
      //     "name" : "鞋面皮护理",
      //     "price" : 150,
      //     "time" : 20,
      //     NID:'CD01'
      //   },
      //   {
      //     "_id" : "5a2a5e12700447398cbf3e6c",
      //     "type" : "9",
      //     "name" : "鳄鱼皮护理",
      //     "price" : 2650,
      //     "time" : 10,
      //     NID:'CD02'
      //   }
      // ]
      subOrder.customer = {
        // _id: '5a24fde67d72b74d6019aeaa',
        ...customer,
        weixin: 'weixin',
        birthday: '2014-11-02'
      }
      subOrder.shop = shopInfo._id;
      subOrder.guide = guideInfo._id;
      // subOrder.urgent = {
      //   _id: '5a2a58efa543457088e165f6',
      //   day: 10,
      //   price: 3688,
      //   NID:'JD01'
      // }
      subOrder.NID = commonUtils.createGoodsNID(subOrder.type, subOrder, subOrder.customer.sex);
      order.sub_orders.push(subOrder);
    }
    

    let newOrder = await salesData.addOrder(order);
    if (time) {
      console.log('----test add 1 order time='  + time);
      await orderModel.findByIdAndUpdate(newOrder._id, {create_time:time})
    }
    // console.log('----test add 2 order='  + JSON.stringify(order));
    // let newOrder = await salesData.addOrder(order);
    // console.log('----test add newOrder=' + JSON.stringify(newOrder));
  } catch (error) {
    console.log('----test add order error ' + error.message + 'stack=' + error.stack);
  }
  // order.s_customs:{type:new GraphQLList(GraphQLString)}, // 特殊定制
  // order.s_shoes: {type:GraphQLString, decription:'商品'},
  
}

module.exports.testAddOrder = async function(ctx) {
  let xiaoshi = 24*12*30;
  for(let i=0; i<5000; i++) {
    let h = Math.floor(Math.random()*100000000) % xiaoshi;
    let time = moment().subtract(h,'h');
    await addOrderTest(ctx, time.format("YYYY-MM-DD HH:mm:ss"));
  }
  
  for(let i=0; i<3000; i++) {
    let h = Math.floor(Math.random()*100000000) % xiaoshi + xiaoshi;
    let time = moment().subtract(h,'h');
    await addOrderTest(ctx, time.format("YYYY-MM-DD HH:mm:ss"));
  }

  for(let i=0; i<2000; i++) {
    let h = Math.floor(Math.random()*100000000) % xiaoshi + xiaoshi*2;
    let time = moment().subtract(h,'h');
    await addOrderTest(ctx, time.format("YYYY-MM-DD HH:mm:ss"));
  }

  for(let i=0; i<3687; i++) {
    let h = Math.floor(Math.random()*100000000) % xiaoshi + xiaoshi*3;
    let time = moment().subtract(h,'h');
    await addOrderTest(ctx, time.format("YYYY-MM-DD HH:mm:ss"));
  }

  for(let i=0; i<2589; i++) {
    let h = Math.floor(Math.random()*100000000) % xiaoshi + xiaoshi*4;
    let time = moment().subtract(h,'h');
    await addOrderTest(ctx, time.format("YYYY-MM-DD HH:mm:ss"));
  }
}