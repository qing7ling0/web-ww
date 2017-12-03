import baseUtils from '../../base/utils/utils'
import * as constants from '../constants/Constants'
import utils from '../../utils/utils'
import * as _commonUtils from '../../utils/common-utils'

export const commonUtils = _commonUtils;

export const findMenuItem = function(menus, key) {
  let numKey = baseUtils.StringToInt(key, 0);
  let arrNav = [];
  while(numKey > 0) {
    arrNav.push(numKey);
    numKey = Math.floor(numKey / 100);
  }
  arrNav = arrNav.reverse();
  for(let i =0; i<arrNav.length; i++) {
    for(let j=0; j<menus.length; j++) {
      if (menus[j].id === arrNav[i]) {
        if (i === arrNav.length-1) {
          return menus[j];
        } else {
          menus = menus[j].subMenus;
          if (!menus) return menus[j];
        }
      }
    }
  }

  return null;
}

export const findRouterById = function(routers, id) {
  if (!routers || !id) return null;

  for(let j=0; j<routers.length; j++) {
    if (routers[j].id === id) 
      return routers[j];
  }

  return null;
}

export const checkAccountInput = function(account) {
  if (!account) {
    return "账号不能为空!";
  } else if (account.length < constants.ACCOUNT_MIN_LENGTH || account.length > constants.ACCOUNT_MAX_LENGTH) {
    return `账号长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`;
  } else if(!utils.isAccountValid(account)) {
    // todo 验证字符串格式是否合法
    return "账号只能是数字、字母!";
  } 
  return null;
}

export const checkPasswordInput = function(password) {
  if (!password) {
    return "密码不能为空!";
  } else if (password.length < constants.ACCOUNT_MIN_LENGTH || password.length > constants.ACCOUNT_MAX_LENGTH) {
    return `密码长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`;
  } else if(!utils.isPasswordValid(password)) {
    // todo 验证字符串格式是否合法
    return "密码只能是数字、字母!";
  } 

  return null;
}