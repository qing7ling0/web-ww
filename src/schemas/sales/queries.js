import {
	GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql';

import * as types from './types';
import {salesData} from '../../data/index';
import { 
  materialModel, 
  goodsModel,
  orderModel,
  tryFeedbackModel,
  sampleGoodsModel,
  shoesColorPaletteModel
} from '../../models/sales'

const DB = require('../../db/DB')
const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')
const schemasUtils = require('../../utils/schemas-utils')

const TEST = require('../../test/test')

export const colorPaletteList = schemasUtils.createDefaultListQuery('colorPaletteList', types.colorPaletteType, shoesColorPaletteModel, (query) =>{
  return query.populate('out_color').populate('in_color').populate('bottom_color').populate('bottom_side_color')
});
export const materialList = schemasUtils.createDefaultListQuery('materialList', types.materialType, materialModel, (query) =>{
  return query.populate('color')
});
export const tryFeedbackList = schemasUtils.createDefaultListQuery('tryFeedbackList', types.tryFeedbackType, tryFeedbackModel);
export const sampleGoodsList = schemasUtils.createDefaultListQuery('sampleGoodsList', types.sampleGoodsType, sampleGoodsModel, (query) =>{
  return query.populate('shop')
  .populate('s_material').populate('s_out_color').populate('s_in_color').populate('s_color_palette')
  .populate('s_bottom_color').populate('s_bottom_side_color').populate('s_xuan_hao').populate('s_gen_gao').populate('s_tie_di')
  .populate('b_material').populate('b_color')
  .populate('ws_material').populate('ws_style').populate('ws_color')
});
export const sampleGoodsProfile = schemasUtils.createDefaultProfileQuery(types.sampleGoodsType, sampleGoodsModel, (query) =>{
  return query.populate('shop')
  .populate('s_material').populate('s_out_color').populate('s_in_color').populate('s_color_palette')
  .populate('s_bottom_color').populate('s_bottom_side_color').populate('s_xuan_hao').populate('s_gen_gao').populate('s_tie_di')
  .populate('b_material').populate('b_color')
  .populate('ws_material').populate('ws_style').populate('ws_color')
});

export const goodsProfile = {
  type: types.goodsType,
  args: {
    id: {type:GraphQLString},
  },
  async resolve (root, params, options) {
    return await salesData.getGoodsProfile(params.id);
  }
};

export const goodsProfileByNID = {
  type: types.goodsType,
  args: {
    nid: {type:GraphQLString},
  },
  async resolve (root, params, options) {
    return await salesData.getGoodsProfileByNID(params.nid);
  }
};

export const goodsList = {
	type: new GraphQLObjectType({
    name: 'goodsList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.goodsType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    if (params.conditions) {
      params.conditions = commonUtils.urlString2Conditions(params.conditions);
    } else {
      params.conditions = {};
    }
    return await salesData.getGoodsList(null, {page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const orderList = {
	type: new GraphQLObjectType({
    name: 'orderList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.orderType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    if (params.conditions) {
      params.conditions = commonUtils.urlString2Conditions(params.conditions);
    }

    return await salesData.getOrderList({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}
export const reportOrderList = {
	type: new GraphQLObjectType({
    name: 'reportOrderList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.orderType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    if (params.conditions) {
      params.conditions = commonUtils.urlString2Conditions(params.conditions);
    }

    return await salesData.getOrderListByReport({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const subOrderList = {
	type: new GraphQLObjectType({
    name: 'subOrderList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.subOrderType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    if (params.conditions) {
      params.conditions = commonUtils.urlString2Conditions(params.conditions);
    }
    // TEST();
    // console.log(JSON.stringify(params.conditions));
    return await salesData.getSubOrderList({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const suborderProfile = {
  type: types.subOrderType,
  args: {
    id: {type:GraphQLString},
  },
  async resolve (root, params, options) {
    return await salesData.getSuborderProfile(params.id);
  }
};

export const sampleAllotList = {
	type: new GraphQLObjectType({
    name: 'sampleAllotList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.sampleAllotType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}  
  },
	async resolve (root, params, options) {
    if (params.conditions) {
      params.conditions = commonUtils.urlString2Conditions(params.conditions);
    }
    // TEST();
    // console.log(JSON.stringify(params.conditions));
    return await salesData.getSampleAllotList({page:params.page, pageSize:params.pageSize}, {conditions:params.conditions})
	}
}

export const sampleAllotProfile = {
	type: types.sampleAllotType,
  args: {
    id: {type:GraphQLString},
  },
	async resolve (root, params, options) {
    return await salesData.getSampleAllotProfile(params.id);
	}
}

