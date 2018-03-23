const {MENU_IDS, POWER_TYPES} = require('./constants')

module.exports.Menus = [
  {
    id:MENU_IDS.report, 
    name: '销售报表',
    icon: 'database',
    subMenus: [
      {id:MENU_IDS.reportTable, name:'销售报表'},
    ]
  },
  {
    id:MENU_IDS.sales, 
    name: '进销存管理',
    icon: 'database',
    subMenus: [
      {id:MENU_IDS.salesItems, name:'商品'},
      {id:MENU_IDS.salesOrder, name:'订单'},
      {id:MENU_IDS.salesMaterial, name:'原材料'},
      {id:MENU_IDS.salesSampleGoods, name:'库存'},
      {id:MENU_IDS.salesSampleAllot, name:'调拨管理'},
      {id:MENU_IDS.salesShoesColorPalette, name:'鞋颜色搭配'},
      {id:MENU_IDS.salesItemsBase, name:'基础数据管理'}
    ]
  },
  {
    id:MENU_IDS.customer, 
    name: '客户管理',
    icon: 'idcard',
    subMenus: [
      {id:MENU_IDS.customerInfo, name:'客户VIP'},
      {id:MENU_IDS.customerTags, name:'客户标签'},
      {id:MENU_IDS.customerAnalyse, name:'客户分析配置'},
      // {id:MENU_IDS.customerBuy, name:'消费记录'},
      // {id:MENU_IDS.customerOrder, name:'维修保养订单'},
      // {id:MENU_IDS.customerFeedback, name:'客户反馈'},
    ]
  },
  {
    id:MENU_IDS.shop, 
    name: '门店管理',
    icon: 'shop',
    subMenus: [
      {id:MENU_IDS.shopInfo, name:'门店'},
      {id:MENU_IDS.shopGuide, name:'导购'},
      {id:MENU_IDS.shopRegion, name:'区域管理'}
      // {id:MENU_IDS.shopSales, name:'促销信息'}
    ]
  },
  {
    id:MENU_IDS.activity, 
    name: '活动管理',
    icon: 'activity',
    subMenus: [
      {id:MENU_IDS.activityRecharge, name:'充值奖励'},
      {id:MENU_IDS.activityVIP, name:'VIP等级'}
    ]
  },
  {
    id:MENU_IDS.system, 
    name:'系统管理',
    icon: 'setting',
    subMenus: [
      // {id:MENU_IDS.systemSetting, name:'设置'},
      {id:MENU_IDS.systemAdmin, name:'管理员账号'}
    ]
  },
]

module.exports.Routers = [
  { id:0, name:'首页', url: '/home' },

  { id:MENU_IDS.report, name:'报表系统', url: '/home/report' },
  { id:MENU_IDS.reportTable, name:'销售报表', url: '/home/report/table' },

  { id:MENU_IDS.sales, name:'进销存管理', url: '/home/sales' },
  { id:MENU_IDS.salesItems, name:'商品', url: '/home/sales/items' },
  { id:MENU_IDS.salesOrder, name:'订单', url: '/home/sales/order' },
  { id:MENU_IDS.salesMaterial, name:'原材料', url: '/home/sales/material' },
  { id:MENU_IDS.salesSampleGoods, name:'库存', url: '/home/sales/sample' },
  { id:MENU_IDS.salesSampleAllot, name:'调拨管理', url: '/home/sales/sample-allot' },
  { id:MENU_IDS.salesShoesColorPalette, name:'鞋颜色搭配', url: '/home/sales/color-palette' },
  { id:MENU_IDS.salesItemsBase, name:'基础数据管理', url: '/home/sales/base' },

  { id:MENU_IDS.customer, name: '客户管理', url: '/home/customer' },
  { id:MENU_IDS.customerInfo, name:'客户VIP', url: '/home/curstomer/info'},
  { id:MENU_IDS.customerBuy, name:'消费记录', url: '/home/curstomer/buy' },
  { id:MENU_IDS.customerOrder, name:'维修保养订单', url: '/home/curstomer/order' },
  { id:MENU_IDS.customerFeedback, name:'客户反馈', url: '/home/curstomer/feedback' },
  { id:MENU_IDS.customerTags, name:'客户标签', url: '/home/curstomer/tag' },
  { id:MENU_IDS.customerAnalyse, name:'客户分析配置', url: '/home/curstomer/analyse' },

  { id:MENU_IDS.shop, name: '门店管理', url: '/home/shop' },
  { id:MENU_IDS.shopInfo, name:'门店', url: '/home/shop/info' },
  { id:MENU_IDS.shopGuide, name:'导购', url: '/home/shop/guide' },
  { id:MENU_IDS.shopSales, name:'促销信息', url: '/home/shop/sales' },
  { id:MENU_IDS.shopRegion, name:'区域管理', url: '/home/shop/region' },
  
  { id:MENU_IDS.system, url: '/home/system', name:'系统管理' },
  { id:MENU_IDS.systemSetting, name:'设置', url: '/home/system/setting' },
  { id:MENU_IDS.systemAdmin, name:'管理员账号', url: '/home/system/admins' },

  { id:MENU_IDS.activity, url: '/home/activity', name:'活动管理' },
  { id:MENU_IDS.activityRecharge, name:'充值奖励', url: '/home/activity/recharge' },
  { id:MENU_IDS.activityVIP, name:'VIP等级管理', url: '/home/activity/vip' },
]

module.exports.Powers = [
  { 
    id:MENU_IDS.reportTable, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:false} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:false} },
    ]
  },
  { 
    id:MENU_IDS.salesItems, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:true} },
    ]
  },
  { 
    id:MENU_IDS.salesOrder, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:true} },
    ]
  },
  { 
    id:MENU_IDS.salesMaterial, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true}, add:true, edit:true },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:true, add:true, edit:true} },
    ]
  },
  { 
    id:MENU_IDS.salesSampleGoods, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:true} },
    ]
  },
  { 
    id:MENU_IDS.salesSampleAllot, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:true} },
    ]
  },
  { 
    id:MENU_IDS.salesItemsBase, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:true} },
    ]
  },
  { 
    id:MENU_IDS.salesShoesColorPalette, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:true} },
    ]
  },
  
  { 
    id:MENU_IDS.customerInfo, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:false} },
    ]
  },
  { 
    id:MENU_IDS.customerBuy, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:false} },
    ]
  },
  { 
    id:MENU_IDS.customerTags, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:false} },
    ]
  },
  { 
    id:MENU_IDS.customerAnalyse, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:false} },
    ]
  },

  { 
    id:MENU_IDS.shopInfo, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:false} },
    ]
  },
  { 
    id:MENU_IDS.shopGuide, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:false} },
    ]
  },
  { 
    id:MENU_IDS.shopRegion, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
      { id:POWER_TYPES.FACTORY_PRODUCTION, power:{view:false} },
    ]
  },

  { 
    id:MENU_IDS.activityRecharge, 
    powers:[
      { id:POWER_TYPES.SALE_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_MANAGER, power:{view:true} },
      { id:POWER_TYPES.SHOP_GUIDE, power:{view:true} },
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
    ]
  },
  { 
    id:MENU_IDS.activityVIP, 
    powers:[
      { id:POWER_TYPES.MANAGER_NORMAL, power:{view:true} },
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
    ]
  },

  { 
    id:MENU_IDS.systemSetting, 
    powers:[
      { id:POWER_TYPES.MANAGER_SENIOR, power:{view:true, add:true, edit:true} },
    ]
  },
  { 
    id:MENU_IDS.systemAdmin, 
    powers:[]
  }
]