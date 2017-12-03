'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutType = exports.accountInputType = exports.productionInputType = exports.operateInputType = exports.shopGuideInputType = exports.adminInputType = exports.userInputType = exports.IDType = exports.userType = exports.userAdminType = exports.userProductionType = exports.userOperateType = exports.userShopGuideType = exports.accountType = exports.userFields = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _commonFields = require('../common/common-fields');

var _commonFields2 = _interopRequireDefault(_commonFields);

var _constants = require('../../constants/constants');

var _constants2 = _interopRequireDefault(_constants);

var _types = require('../shop/types');

var shopTypes = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userFields = exports.userFields = _extends({
  _id: { type: _graphql.GraphQLString },
  account: { type: _graphql.GraphQLString, description: '账号' },
  password: { type: _graphql.GraphQLString, description: '密码' },
  name: { type: _graphql.GraphQLString, description: '姓名' },
  last_login_time: { type: _graphql.GraphQLString, description: '最后登陆时间' },
  last_login_ip: { type: _graphql.GraphQLString, description: '最后登陆IP' },
  detail_id: { type: _graphql.GraphQLString },
  user_type: { type: _graphql.GraphQLString }
}, _commonFields2.default.defaultCreateFields);

var _accountType = new _graphql.GraphQLObjectType({
  name: 'account',
  fields: {
    _id: { type: _graphql.GraphQLString },
    account: { type: _graphql.GraphQLString, description: '账号' },
    password: { type: _graphql.GraphQLString, description: '密码' }
  }
});

var _accountInputType = new _graphql.GraphQLInputObjectType({
  name: 'accountInput',
  fields: {
    _id: { type: _graphql.GraphQLString },
    account: { type: _graphql.GraphQLString, description: '账号' },
    password: { type: _graphql.GraphQLString, description: '密码' }
  }
});

var userCommonFields = {
  name: { type: _graphql.GraphQLString },
  sex: { type: _graphql.GraphQLString }, // 性别
  account: { type: _accountType },
  editor_name: { type: _graphql.GraphQLString },
  editor_time: { type: _graphql.GraphQLString }
};

var userCommonInputFields = {
  name: { type: _graphql.GraphQLString },
  sex: { type: _graphql.GraphQLString }, // 性别
  account: { type: _accountInputType },
  editor_name: { type: _graphql.GraphQLString },
  editor_time: { type: _graphql.GraphQLString }
};

var userShopGuideFields = {
  manager: { type: _graphql.GraphQLBoolean }, // 是否店长
  birthday: { type: _graphql.GraphQLString }, // 生日
  height: { type: _graphql.GraphQLInt }, // 身高
  weight: { type: _graphql.GraphQLFloat }, // 体重
  entry_time: { type: _graphql.GraphQLString }, // 入职日期
  leave_time: { type: _graphql.GraphQLString // 离职日期
  } };

var userOperateFields = {};

var userProductionFields = {
  step: { type: _graphql.GraphQLString }
};

var userAdminFields = {};

var accountType = exports.accountType = _accountType;

var userShopGuideType = exports.userShopGuideType = new _graphql.GraphQLObjectType({
  name: 'userShopGuide',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, userCommonFields, userShopGuideFields, {
    shop: { type: shopTypes.shopType } // 店铺
  })
});

var userOperateType = exports.userOperateType = new _graphql.GraphQLObjectType({
  name: 'userOperate',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, userCommonFields, userOperateFields)
});

var userProductionType = exports.userProductionType = new _graphql.GraphQLObjectType({
  name: 'userProduction',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, userCommonFields, userProductionFields)
});

var userAdminType = exports.userAdminType = new _graphql.GraphQLObjectType({
  name: 'userAdmin',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, userCommonFields, userAdminFields)
});

var userType = exports.userType = new _graphql.GraphQLUnionType({
  name: 'user',
  types: [userShopGuideType, userOperateType, userProductionType, userAdminType],
  resolveType: function resolveType(value) {
    switch (value.user_type) {
      case _constants2.default.USER_TYPES.shopGuide:
        return userShopGuideType;
      case _constants2.default.USER_TYPES.operate:
        return userOperateType;
      case _constants2.default.USER_TYPES.production:
        return userProductionType;
      case _constants2.default.USER_TYPES.admin:
        return userAdminType;
    }
  }
});

var IDType = exports.IDType = new _graphql.GraphQLObjectType({
  name: 'id',
  fields: {
    _id: { type: _graphql.GraphQLString }
  }
});

var userInputType = exports.userInputType = new _graphql.GraphQLInputObjectType({
  name: 'userInput',
  fields: {
    account: { type: _graphql.GraphQLString },
    password: { type: _graphql.GraphQLString },
    name: { type: _graphql.GraphQLString },
    user_type: { type: _graphql.GraphQLString }
  }
});

/**
 * 管理员账号输入
 */
var adminInputType = exports.adminInputType = new _graphql.GraphQLInputObjectType({
  name: 'adminInputType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, userCommonInputFields, userAdminFields)
});

/**
 * 导购员账号输入
 */
var shopGuideInputType = exports.shopGuideInputType = new _graphql.GraphQLInputObjectType({
  name: 'shopGuideInputType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, userCommonInputFields, userShopGuideFields, {
    shop: { type: _graphql.GraphQLString } // 店铺
  })
});

/**
 * 运营账号输入
 */
var operateInputType = exports.operateInputType = new _graphql.GraphQLInputObjectType({
  name: 'operateInputType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, userCommonInputFields, userOperateFields)
});

/**
 * 工厂账号输入
 */
var productionInputType = exports.productionInputType = new _graphql.GraphQLInputObjectType({
  name: 'productionInputType',
  fields: _extends({
    _id: { type: _graphql.GraphQLString }
  }, userCommonInputFields, userProductionFields)
});

var accountInputType = exports.accountInputType = _accountInputType;

var logoutType = exports.logoutType = new _graphql.GraphQLObjectType({
  name: 'logoutType',
  fields: {
    success: { type: _graphql.GraphQLString }
  }
});
//# sourceMappingURL=types.js.map