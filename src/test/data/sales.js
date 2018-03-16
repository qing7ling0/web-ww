import salesData from '../../data/sales'
import constants, { ORDER_SOURCE } from '../../constants/constants'
import { shopModel, userShopGuideModel, materialModel } from '../../models/index';

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

var addOrderTest = async function(ctx) {

  if (!materialList) {
    materialList = await materialModel.find();
  }

  let materialIndex = Math.floor(Math.random()*1000000) % materialList.length;
  let material = materialList[index];

  let shoesList = await salesData.getGoodsList(constants.GOODS_SHOES, {page:-1, pageSize:0}, {});
  let index = Math.floor(Math.random()*1000000) % CUSTOMERS.length;
  let customer = CUSTOMERS[index];

  let shopList = await shopModel.find({});
  let shopIndex = Math.floor(Math.random()*1000000) % shopList.length;
  let shopInfo = shopList[shopIndex];

  let guideList = await userShopGuideModel.find({shop:shopInfo._id});
  let guideIndex = Math.floor(Math.random()*1000000) % guideList.length;
  let guideInfo = guideList[guideIndex];
  // if (shoesList && shoesList.list.length > 0) {
    
    try {
      console.log('----test add 1 order');
      // let goodsShoes = shoesList.list[0];
      let subOrder = {};
      subOrder.NID = 'NID101';
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
        _id:'5a2a5d4b700447398cbf3e65',
        name:'楦号101',
        NID:'X1'
      };
      subOrder.s_gui_ge = {
        _id:'5a2a5d55700447398cbf3e67',
        name:'规格',
        NID:'G1'
      };
      subOrder.s_material = {
        _id:material._id,
        name:material.name,
        NID:material.NID
      };
      subOrder.s_out_color = {
        _id:'5a2a5cf7700447398cbf3e5d',
        name:'鞋面颜色',
        NID:'M1'
      };
      subOrder.s_in_color = {
        _id:'5a2a5d18700447398cbf3e5f',
        name:'里皮颜色',
        NID:'L1'
      };
      subOrder.s_bottom_color = {
        _id:'5a2a5d25700447398cbf3e61',
        name:'鞋底颜色',
        NID:'B1'
      };
      subOrder.s_bottom_side_color = {
        _id:'5a2a5d3a700447398cbf3e63',
        name:'底边颜色',
        NID:'D1'
      };
      if (customer.sex === '女') {
        subOrder.s_gen_gao = {
          _id:'5a2a5d60700447398cbf3e69',
          name:'跟高10cm',
          NID:'H1'
        };
      }
      subOrder.s_tie_di = {
        _id:'5a2a7a3123299d50e4664524',
        name:'贴底',
        NID:'T1'
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

      let order = {};
      
      order.source = constants.ORDER_SOURCE[0].value,
      order.pay = 1000,
      order.pay_type = constants.PAY_TYPE[0].value;
      order.store_card_selected = false;
      order.sub_orders = [subOrder]; 
      order.is_recharge = false;
      
      await salesData.addOrder(order);
      // console.log('----test add 2 order='  + JSON.stringify(order));
      // let newOrder = await salesData.addOrder(order);
      // console.log('----test add newOrder=' + JSON.stringify(newOrder));
    } catch (error) {
      console.log('----test add order error ' + error.message + 'stack=' + error.stack);
    }
    // order.s_customs:{type:new GraphQLList(GraphQLString)}, // 特殊定制
    // order.s_shoes: {type:GraphQLString, decription:'商品'},
  
}

module.exports.testAddOrder = (ctx) => {
  for(let i=0; i<10; i++) {
    await addOrderTest(ctx);
  }
}