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
import {userData} from '../../data/index';
const commonFields = require('../common/common-fields')
const commonUtils = require('../../utils/common-utils')

// export const adminList = {
// 	type: new GraphQLList(types.userType),
//   args: {
//     page: {type: GraphQLInt},
//     pageSize: {type: GraphQLInt},
//   },
// 	async resolve (root, params, options) {
// 		params.user_type = userData.types().admin;
// 		var users = await userData.getUserList(root, params);
// 		return users;
// 	}
// }

export const userList = {
	type: new GraphQLObjectType({
    name: 'userList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.userType)}
    }
  }),
  args: {
    user_type: {type: GraphQLInt},
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
  },
	async resolve (root, params, options) {
		// params.user_type = userData.types().admin;
		var ret = await userData.getUserList(root, params);
		return ret;
	}
}


export const userProfile = {
	type: types.userType,
  args: {
    conditions: {type:GraphQLString},
    user_type: {type: GraphQLInt},
  },
	async resolve (root, params, options) {
    params.conditions = commonUtils.urlString2Conditions(params.conditions);
    var ret = await userData.getUserByConditions(params.user_type, params.conditions);
    console.log("userProfile" + JSON.stringify(ret));
		return ret;
	}
}

export const shopGuideList = {
	type: new GraphQLObjectType({
    name: 'shopGuideList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.userType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
		params.user_type = userData.types().shopGuide;
    params.conditions = commonUtils.urlString2Conditions(params.conditions);
		var ret = await userData.getUserList(root, params);
		return ret;
	}
}

export const operateList = {
	type: new GraphQLObjectType({
    name: 'operateList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.userType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
  },
	async resolve (root, params, options) {
		params.user_type = userData.types().operate;
		var ret = await userData.getUserList(root, params);
		return ret;
	}
}

export const productionList = {
	type: new GraphQLObjectType({
    name: 'productionList',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.userType)}
    }
  }),
  args: {
    page: {type: GraphQLInt},
    pageSize: {type: GraphQLInt},
    conditions: {type:GraphQLString}
  },
	async resolve (root, params, options) {
		params.user_type = userData.types().production;
		var ret = await userData.getUserList(root, params);
		return ret;
	}
}

export const getLast3MonthWork = {
	type: new GraphQLObjectType({
    name: 'getLast3MonthWork',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.workCalendarType)}
    }
  }),
  args: {
    id: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    return await userData.getLast3MonthWork(params.id);
  }
}

export const getGuideMessage = {
	type: new GraphQLObjectType({
    name: 'getGuideMessage',
    fields: {
      page: {type:commonFields.defaultPageType},
      list: {type:new GraphQLList(types.workMessageType)}
    }
  }),
  args: {
    id: {type:GraphQLString},
    date: {type:GraphQLString}
  },
	async resolve (root, params, options) {
    return await userData.getGuideMessage(params.id);
  }
}