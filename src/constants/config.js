const {MENU_IDS} = require('./constants')

module.exports.Menus = [
  {
    id:MENU_IDS.sales, 
    name: '进销存管理',
    icon: 'database',
    subMenus: [
      {id:MENU_IDS.salesItems, name:'商品'},
      {id:MENU_IDS.salesOrder, name:'订单'},
      {id:MENU_IDS.salesMaterial, name:'原材料'},
      {id:MENU_IDS.salesMaintainPrices, name:'维修保养'},
      {id:MENU_IDS.salesItemsBase, name:'基础数据管理'},
    ]
  },
  {
    id:MENU_IDS.customer, 
    name: '客户管理',
    icon: 'idcard',
    subMenus: [
      {id:MENU_IDS.customerInfo, name:'客户VIP'},
      {id:MENU_IDS.customerBuy, name:'消费记录'},
      {id:MENU_IDS.customerOrder, name:'维修保养订单'},
      {id:MENU_IDS.customerFeedback, name:'客户反馈'},
    ]
  },
  {
    id:MENU_IDS.shop, 
    name: '门店管理',
    icon: 'shop',
    subMenus: [
      {id:MENU_IDS.shopInfo, name:'门店'},
      {id:MENU_IDS.shopGuide, name:'导购'},
      {id:MENU_IDS.shopSales, name:'促销信息'}
    ]
  },
  {
    id:MENU_IDS.system, 
    name:'系统管理',
    icon: 'setting',
    subMenus: [
      {id:MENU_IDS.systemSetting, name:'设置'},
      {id:MENU_IDS.systemAdmin, name:'管理员账号'}
    ]
  },
]

module.exports.Routers = [
  { id:0, name:'首页', url: '/home' },
  { id:MENU_IDS.sales, name:'进销存管理', url: '/home/sales' },
  { id:MENU_IDS.salesItems, name:'商品', url: '/home/sales/items' },
  { id:MENU_IDS.salesOrder, name:'订单', url: '/home/sales/order' },
  { id:MENU_IDS.salesMaterial, name:'原材料', url: '/home/sales/material' },
  { id:MENU_IDS.salesItemsBase, name:'基础数据管理', url: '/home/sales/base' },

  { id:MENU_IDS.customer, name: '客户管理', url: '/home/customer' },
  { id:MENU_IDS.customerInfo, name:'客户VIP', url: '/home/curstomer/info'},
  { id:MENU_IDS.customerBuy, name:'消费记录', url: '/home/curstomer/buy' },
  { id:MENU_IDS.customerOrder, name:'维修保养订单', url: '/home/curstomer/order' },
  { id:MENU_IDS.customerFeedback, name:'客户反馈', url: '/home/curstomer/feedback' },

  { id:MENU_IDS.shop, name: '门店管理', url: '/home/shop' },
  { id:MENU_IDS.shopInfo, name:'门店', url: '/home/shop/info' },
  { id:MENU_IDS.shopGuide, name:'导购', url: '/home/shop/guide' },
  { id:MENU_IDS.shopSales, name:'促销信息', url: '/home/shop/sales' },
  
  { id:MENU_IDS.system, url: '/home/system', name:'系统管理' },
  { id:MENU_IDS.systemSetting, name:'设置', url: '/home/system/setting' },
  { id:MENU_IDS.systemAdmin, name:'管理员账号', url: '/home/system/admins' },
]