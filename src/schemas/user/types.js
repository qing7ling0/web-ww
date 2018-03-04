import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLUnionType,
  GraphQLInputObjectType
} from 'graphql';

 import commonFields from '../common/common-fields'
 import constants from '../../constants/constants'
 import * as shopTypes from '../shop/types'

 export const userFields = {
  _id: {type:GraphQLString},
  account: { type: GraphQLString, description:'账号' },
  password: { type:GraphQLString, description:'密码' },
  name: {type:GraphQLString, description:'姓名'},
  last_login_time: { type:GraphQLString, description:'最后登陆时间' },
  last_login_ip: { type: GraphQLString, description:'最后登陆IP' },
  detail_id: { type:GraphQLString },
  user_type: { type:GraphQLString },
  ...commonFields.defaultCreateFields
};

const _accountType = new GraphQLObjectType({
  name: 'account',
  fields: {
    _id: { type: GraphQLString },
    account: { type: GraphQLString, description:'账号' },
    password: { type:GraphQLString, description:'密码' }
  }
});

const _accountInputType = new GraphQLInputObjectType({
  name: 'accountInput',
  fields: {
    _id: { type: GraphQLString },
    account: { type: GraphQLString, description:'账号' },
    password: { type:GraphQLString, description:'密码' }
  }
});

const userCommonFields = {
  name: {type:GraphQLString},
  sex: { type:GraphQLString }, // 性别
  phone: { type:GraphQLString }, // 电话
  account: {type: _accountType},
  editor_name: {type:GraphQLString},
  editor_time: {type:GraphQLString},
  user_type:{type:GraphQLInt}
}

const userCommonInputFields = {
  name: {type:GraphQLString},
  sex: { type:GraphQLString }, // 性别
  account: {type: _accountInputType},
  phone: {type: GraphQLString},
  editor_name: {type:GraphQLString},
  editor_time: {type:GraphQLString},
}

const userShopGuideFields = {
  manager: { type:GraphQLBoolean }, // 是否店长
  birthday: { type:GraphQLString}, // 生日
  height:  {type:GraphQLInt }, // 身高
  weight: { type:GraphQLFloat }, // 体重
  entry_time: { type:GraphQLString }, // 入职日期
  leave_time: { type:GraphQLString } // 离职日期
}

const userOperateFields = {
}

const userProductionFields = {
  step: { type:GraphQLString },
}

const userAdminFields = {
}

export const accountType = _accountType;

export const userShopGuideType = new GraphQLObjectType({
  name: 'userShopGuide',
  fields: {
    _id: {type:GraphQLString},
    ...userCommonFields,
    ...userShopGuideFields,
    shop: {type:shopTypes.shopType}, // 店铺
  }
});

export const userOperateType = new GraphQLObjectType({
  name: 'userOperate',
  fields: {
    _id: {type:GraphQLString},
    ...userCommonFields,
    ...userOperateFields,
  }
});

export const userProductionType = new GraphQLObjectType({
  name: 'userProduction',
  fields: {
    _id: {type:GraphQLString},
    ...userCommonFields,
    ...userProductionFields
  }
});

export const userAdminType = new GraphQLObjectType({
  name: 'userAdmin',
  fields: {
    _id: {type:GraphQLString},
    ...userCommonFields,
    ...userAdminFields
  }
});

export const userType = new GraphQLUnionType({
  name:'user',
  types:[userShopGuideType, userOperateType, userProductionType, userAdminType],
  resolveType(value) {
    console.log('userType' + value);
    if (value) {
      switch(value.user_type) {
        case constants.USER_TYPES.shopGuide:
          return userShopGuideType;
        case constants.USER_TYPES.operate:
          return userOperateType;
        case constants.USER_TYPES.production:
          return userProductionType;
        case constants.USER_TYPES.admin:
          return userAdminType;
      }
    }
    return userAdminType;
  }
});

export const IDType = new GraphQLObjectType({
  name:'id',
  fields: {
    _id:{type:GraphQLString}
  }
})

export const userInputType = new GraphQLInputObjectType({
  name: 'userInput',
  fields: {
    account: { type:GraphQLString },
    password: { type:GraphQLString },
    name: { type:GraphQLString },
    phone: { type:GraphQLString },
    user_type: { type:GraphQLString }
  }
});

/**
 * 管理员账号输入
 */
export const adminInputType = new GraphQLInputObjectType({
  name:'adminInputType',
  fields: {
    _id: {type:GraphQLString},
    ...userCommonInputFields,
    ...userAdminFields
  }
});

/**
 * 导购员账号输入
 */
export const shopGuideInputType = new GraphQLInputObjectType({
  name:'shopGuideInputType',
  fields: {
    _id: {type:GraphQLString},
    ...userCommonInputFields,
    ...userShopGuideFields,
    shop: { type:GraphQLString }, // 店铺
  }
});

/**
 * 运营账号输入
 */
export const operateInputType = new GraphQLInputObjectType({
  name:'operateInputType',
  fields: {
    _id: {type:GraphQLString},
    ...userCommonInputFields,
    ...userOperateFields
  }
});

/**
 * 工厂账号输入
 */
export const productionInputType = new GraphQLInputObjectType({
  name:'productionInputType',
  fields: {
    _id: {type:GraphQLString},
    ...userCommonInputFields,
    ...userProductionFields
  }
});


export const accountInputType = _accountInputType

export const logoutType = new GraphQLObjectType({
  name: 'logoutType',
  fields: {
    success: { type:GraphQLString }
  }
});