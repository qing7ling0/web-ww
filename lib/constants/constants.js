'use strict';

var transportCompanys = require('./transport');

// 菜单标识
module.exports.MENU_IDS = {
  orga: 1, // 组织架构
  shop: 2, // 门店
  shopInfo: 201, // 门店信息
  shopGuide: 202, // 门店导购
  shopSales: 203, // 门店促销
  customer: 3, // 客户
  customerInfo: 301, // 客户信息
  customerBuy: 302, // 客户消费表
  customerOrder: 303, // 客户订单
  customerFeedback: 304, // 客户反馈记录
  sales: 4, // 进销存管理【商品，原材料，保养维护价目表】
  salesMaterial: 401, // 原材料
  salesItems: 402, // 商品
  salesOrder: 403, // 订单
  salesMaintainPrices: 404, // 保养价目
  salesItemsBase: 405, // 商品基础数据
  system: 9, // 系统管理
  systemSetting: 901, // 系统设置
  systemAdmin: 902 // 管理员账号管理


  /**
   * 用户类型
   */
};module.exports.USER_TYPES = {
  shopGuide: 1, // 导购
  operate: 2, // 运营
  production: 3, // 生产人员
  admin: 4 // 管理员


  /** 性别数据 */
};module.exports.SEX_DATA = [{ id: 0, value: '男', label: '男' }, { id: 1, value: '女', label: '女' }];

/** 商品属性，左脚，右脚，一双，一个 */
module.exports.GOODS_PROPERTY = [{ value: '左脚', label: '左脚' }, { value: '右脚', label: '右脚' }, { value: '一双', label: '一双' }, { value: '一个', label: '一个' }];

/** 店铺市场级别 */
module.exports.MARKET_LEVEL = [{ id: 1, value: '1', label: '级别1' }, { id: 2, value: '2', label: '级别2' }, { id: 3, value: '3', label: '级别3' }];

module.exports.SHOP_PRO = [{ id: 1, value: '1', 'label': '非特卖' }, { id: 2, value: '2', 'label': '特卖' }];

/** 客户来源 */
module.exports.CUSTOMER_TYPE = [{ value: '1', label: '订单' }, { value: '2', label: '网站' }, { value: '99', label: '其他' }];

/** 维修保养改型 */
module.exports.MAINTAIN_PRICE_TYPE = [{ value: '1', label: '维修' }, { value: '2', label: '保养' }, { value: '3', label: '改型' }];

/** 订单来源 */
module.exports.ORDER_SOURCE = [{ value: '1', label: '店铺' }, { value: '2', label: '其他' }];

/** 支付方式 */
module.exports.PAY_TYPE = [{ value: '1', label: '支付宝' }, { value: '2', label: '微信' }, { value: '3', label: '刷卡' }, { value: '4', label: '现金' }, { value: '5', label: '其他' }];

module.exports.COLOR_TYPE = [{ value: '1', label: '鞋面' }, { value: '2', label: '里皮' }, { value: '3', label: '鞋底' }, { value: '4', label: '底边' }, { value: '5', label: '原材料' }];

var E_ORDER_TYPE = {
  shoes: '1', belt: '2', watchStrap: '3', maintain: '4', fuliao: '5', ornament: '6'
};
module.exports.E_ORDER_TYPE = E_ORDER_TYPE;

// order type
module.exports.ORDER_TYPE = [{ value: E_ORDER_TYPE.shoes, label: '鞋' }, { value: E_ORDER_TYPE.belt, label: '皮带' }, { value: E_ORDER_TYPE.watchStrap, label: '表带' }, { value: E_ORDER_TYPE.maintain, label: '护理' }, { value: E_ORDER_TYPE.fuliao, label: '辅料' }, { value: E_ORDER_TYPE.ornament, label: '配饰' }];

module.exports.TRANSPORT_COMPANYS = transportCompanys.companys; // 快递公司
module.exports.ACCOUNT_MAX_LENGTH = 20; // 账号密码最大长度
module.exports.ACCOUNT_MIN_LENGTH = 5; // 账号密码最小长度
module.exports.ACCCOUNT_NAME_MAX_LENGTH = 10; // 账号真实名称最大长度

module.exports.COLOR_TYPE_OUT = '1';
module.exports.COLOR_TYPE_IN = '2';
module.exports.COLOR_TYPE_BOTTOM = '3';
module.exports.COLOR_TYPE_BOTTOM_SIDE = '4';
module.exports.COLOR_TYPE_MATERIAL = '5';

module.exports.GOODS_SHOES = '1'; // 鞋
module.exports.GOODS_BELT = '2'; // 皮带
module.exports.GOODS_WATCH_STRAP = '3'; // 表带

module.exports.RIGHT_FOOT_ID = '1';
module.exports.LEFT_FOOT_ID = '2';

// 基础数据类型
module.exports.COMMON_DATA_TYPES = {
  SHOES_OUT_COLOR: '1', // 鞋面颜色
  SHOES_IN_COLOR: '2', // 内里颜色
  SHOES_BOTTOM_COLOR: '3', // 鞋底颜色
  SHOES_BOTTOM_SIDE_COLOR: '4', // 鞋底边颜色
  MATERIAL_COLOR: '5', // 原材料颜色
  MATERIAL: '6', // 原材料
  CUSTOM: '7', // 特殊定制
  URGENT: '8', // 加急
  MAINTAIN: '9', // 护理
  GOODS_TYPE: '10', // 商品分类
  GOODS_STYLE: '11', // 商品系列
  GOODS_SEASON: '12', // 商品季节
  XUAN_HAO: '13', // 楦号
  WATCH_STRAP_STYLE: '14', // 表带类型
  SHOES_GEN_GAO: '15', // 跟高
  SHOES_GUI_GE: '16' // 规格
};
//# sourceMappingURL=constants.js.map