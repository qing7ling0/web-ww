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
import {userData} from '../../data/index';


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
    fields: {type: types.adminInputType}
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
    let user = await userData.login(ctx, params);
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