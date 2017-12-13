import salesData from '../../data/sales'
import constants, { ORDER_SOURCE } from '../../constants/constants'

var addOrderTest = async function() {
  let shoesList = await salesData.getGoodsList(constants.GOODS_SHOES, {page:-1, pageSize:0}, {});

  if (shoesList && shoesList.list.length > 0) {
    
    try {
      console.log('----test add 1 order');
      let goodsShoes = shoesList.list[0];
      let subOrder = {};
      subOrder.NID = 'NID101';
      subOrder.name = goodsShoes.name;
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
        name:'楦号101'
      };
      subOrder.s_gui_ge = {
        _id:'5a2a5d55700447398cbf3e67',
        name:'规格'
      };
      subOrder.s_material = {
        _id:'5a2a5d4b700447398cbf3e65',
        name:'原材料'
      };
      subOrder.s_out_color = {
        _id:'5a2a5cf7700447398cbf3e5d',
        name:'鞋面颜色'
      };
      subOrder.s_in_color = {
        _id:'5a2a5d18700447398cbf3e5f',
        name:'里皮颜色'
      };
      subOrder.s_bottom_color = {
        _id:'5a2a5d25700447398cbf3e61',
        name:'鞋底颜色'
      };
      subOrder.s_bottom_side_color = {
        _id:'5a2a5d3a700447398cbf3e63',
        name:'底边颜色'
      };
      subOrder.s_gen_gao = {
        _id:'5a2a5d60700447398cbf3e69',
        name:'跟高10cm'
      };
      subOrder.s_tie_di = {
        _id:'5a2a7a3123299d50e4664524',
        name:'贴底'
      };
      subOrder.s_customs = [
        {
          _id: '5a2a5e04700447398cbf3e6b',
          "type" : "9",
          "name" : "鞋面皮护理",
          "price" : 150,
          "time" : 20,
        },
        {
          "_id" : "5a2a5e12700447398cbf3e6c",
          "type" : "9",
          "name" : "鳄鱼皮护理",
          "price" : 2650,
          "time" : 10,
        }
      ]
      subOrder.customer = {
        _id: '5a24fde67d72b74d6019aeaa',
        name: '马云',
        phone: '13666951413',
        sex: '男',
        weixin: 'weixin',
        birthday: '2014-11-02'
      }
      subOrder.shop = '5a24fd9a7d72b74d6019aea7',
      subOrder.guide = '5a24fdbc7d72b74d6019aea9',
      subOrder.customer ={
        "_id" : "5a24fde67d72b74d6019aeaa",
        "name" : "马云",
        "phone" : "13666951413",
        "sex" : "男",
        "vip_card_date" : "2017-12-04",
        "birthday" : "2017-12-27",
        "weixin" : "微信号2"
      };
      subOrder.urgent = {
        _id: '5a2a58efa543457088e165f6',
        day: 10,
        price: 3688
      }

      let order = {};
      
      order.source = constants.ORDER_SOURCE[0].value,
      order.pay = 1000,
      order.pay_type = constants.PAY_TYPE[0].value;
      order.sub_orders = [subOrder];    

      console.log('----test add 2 order='  + JSON.stringify(order));
      let newOrder = await salesData.addOrder(order);
      console.log('----test add newOrder=' + JSON.stringify(newOrder));
    } catch (error) {
      console.log('----test add order error ' + error.message + 'stack=' + error.stack);
    }
    // order.s_customs:{type:new GraphQLList(GraphQLString)}, // 特殊定制
    // order.s_shoes: {type:GraphQLString, decription:'商品'},
  } 
}

module.exports.testAddOrder = addOrderTest