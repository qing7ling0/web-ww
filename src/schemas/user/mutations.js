import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList
} from 'graphql';

import * as types from './types';
import {userData, analyseData, DBRepair} from '../../data/index';

const TEST = require('../../test/test')

// export const addUser = {
//   type: types.userType,
//   args: {
//     info: {
//       name: 'info',
//       type: new GraphQLNonNull(types.userInputType)
//     }
//   },
//   async resolve (root, params, options) {
//     const newUser = await userData.addUser(root, params);
//     return newUser;
//   }
// };

export const addUser = {
  type: types.userType,
  args: {
    user_type: {type:GraphQLInt},
    user: {
      name: 'user',
      type: new GraphQLNonNull(types.userInputType)
    },
    account:{
      name: 'account',
      type: new GraphQLNonNull(types.accountInputType)
    }
  },
  async resolve (root, params, options) {
    // params.user_type = userData.types().admin;
    const newUser = await userData.addUser(root, params);
    return newUser;
  }
}

export const deleteUser = {
  type: new GraphQLList(GraphQLString),
  args: {
    user_type: {type:GraphQLInt},
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (root, params, options) {
    // params.user_type = userData.types().admin;
    const ids = await userData.deleteUser(root, params);
    return ids;
  }
}

export const updateUser = {
  type: types.userType,
  args: {
    user_type: {type:GraphQLInt},
    fields: {type: types.userInputType}
  },
  async resolve (root, params, options) {
    return await userData.updateUser(root, params.user_type, params.fields);
  }
}

export const addShopGuide = {
  type: types.userType,
  args: {
    user: {
      name: 'user',
      type: new GraphQLNonNull(types.shopGuideInputType)
    },
    account:{
      name: 'account',
      type: new GraphQLNonNull(types.accountInputType)
    }
  },
  async resolve (root, params, options) {
    params.user_type = userData.types().shopGuide;
    const newUser = await userData.addUser(root, params);
    return newUser;
  }
}

export const deleteShopGuide = {
  type: new GraphQLList(GraphQLString),
  args: {
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (root, params, options) {
    params.user_type = userData.types().shopGuide;
    const ids = await userData.deleteUser(root, params);
    return ids;
  }
}

export const updateShopGuide = {
  type: types.userType,
  args: {
    fields: {type: types.shopGuideInputType}
  },
  async resolve (root, params, options) {
    return await userData.updateUser(root, userData.types().shopGuide, params.fields);
  }
}

export const addOperate = {
  type: types.userType,
  args: {
    user: {
      name: 'user',
      type: new GraphQLNonNull(types.operateInputType)
    },
    account:{
      name: 'account',
      type: new GraphQLNonNull(types.accountInputType)
    }
  },
  async resolve (root, params, options) {
    params.user_type = userData.types().operate;
    const newUser = await userData.addUser(root, params);
    return newUser;
  }
}

export const deleteOperate = {
  type: new GraphQLList(GraphQLString),
  args: {
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (root, params, options) {
    params.user_type = userData.types().operate;
    const ids = await userData.deleteUser(root, params);
    return ids;
  }
}

export const updateOperate = {
  type: types.userType,
  args: {
    fields: {type: types.operateInputType}
  },
  async resolve (root, params, options) {
    return await userData.updateUser(userData.types().operate, params.fields);
  }
}


export const addProduction = {
  type: types.userType,
  args: {
    user: {
      name: 'user',
      type: new GraphQLNonNull(types.productionInputType)
    },
    account:{
      name: 'account',
      type: new GraphQLNonNull(types.accountInputType)
    }
  },
  async resolve (root, params, options) {
    params.user_type = userData.types().production;
    const newUser = await userData.addUser(root, params);
    return newUser;
  }
}

export const deleteProduction = {
  type: new GraphQLList(GraphQLString),
  args: {
    ids: {type: new GraphQLList(GraphQLString)}
  },
  async resolve (root, params, options) {
    params.user_type = userData.types().production;
    const ids = await userData.deleteUser(root, params);
    return ids;
  }
}

export const updateProduction = {
  type: types.userType,
  args: {
    fields: {type: types.productionInputType}
  },
  async resolve (root, params, options) {
    return await userData.updateUser(userData.types().production, params.fields);
  }
}

export const login = {
  type: types.userType,
  args: {
    account: {
      name: 'account',
      type: GraphQLString
    },
    password: {
      name: 'password',
      type: GraphQLString
    },
    check: {
      name: 'check',
      type: GraphQLBoolean
    }
  },
  async resolve (ctx, params, options) {
    // let time = new Date().getTime();
    // let lastTime = time;
    // await analyseData.getAnalyseGoodsTop10({date_type:4});
    // lastTime = new Date().getTime();
    // console.log(" time1111=" + (lastTime-time));
    // time=lastTime;
    
    // await analyseData.getAnalyseGoodsSalesPer({date_type:4});
    // lastTime = new Date().getTime();
    // console.log(" time2222=" + (lastTime-time));
    // time=lastTime;
    
    // await analyseData.getAnalyseGoodsMaterial({date_type:4});
    // lastTime = new Date().getTime();
    // console.log(" time3333=" + (lastTime-time));
    // time=lastTime;
    
    // await analyseData.getAnalyseGoodsSex({date_type:4});
    // lastTime = new Date().getTime();
    // console.log(" time4444=" + (lastTime-time));
    // time=lastTime;

    await DBRepair.do();
    let user = await userData.login(ctx, params);
    if (user) {
      // await TEST(ctx);
    }
    return user;
  }
};

export const logout = {
  type: types.logoutType,
  args: {
    id: {
      name:'id',
      type:GraphQLString
    }
  },
  async resolve (ctx, params, options) {
    let ret = await userData.logout(ctx, params);
    return ret;
  }
};

  /**
   * 设置导购排班情况
   */
export const changeGuideWork = {
  type: GraphQLBoolean,
  args: {
    guide: {type:GraphQLString},
    day: {type:GraphQLString},
    status: {type:GraphQLInt}
  },
  async resolve (ctx, params, options) {
    let ret = await userData.changeGuideWork(params.guide, params.day, params.status);
    return ret && ret.ok;
  }
}

  /**
   * 发送留言
   * @param {*} doc [
   *  guide 留言对象
   *  targetGuide 留言对象
   *  type 留言类型，个人或者店铺，默认个人
   *  date 留言查看时间，只能是3天内
   *  message 留言内容
   * ]
   */
export const sendGuideMessage = {
  type: GraphQLBoolean,
  args: {
    doc: {type:types.workMessageInputType}
  },
  async resolve (ctx, params, options) {
    return await userData.sendGuideMessage(params.doc);
  }
}

/**
 * 假期申请
 */
export const guideLeaveApply = {
  type: types.workRecordType,
  args: {
    guide: {type:GraphQLString},
    date: {type:GraphQLString},
    levelType: {type:GraphQLInt}
  },
  async resolve (ctx, params, options) {
    return await userData.guideLeaveApply(ctx, params.guide, params.date, params.levelType);
  }
}

/**
 * 同意或者拒绝请假申请
 */
export const guideHandelLeaveApply = {
  type: types.workRecordType,
  args: {
    id: {type:GraphQLString},
    agree: {type:GraphQLBoolean}
  },
  async resolve (ctx, params, options) {
    return await userData.guideHandelLeaveApply(ctx, params.id, params.agree)
  }
}