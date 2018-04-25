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

export const initFormDefaultValues = (options, values, getValue) => {
  if (!values) return options;
  return options.map((item) => {
    let initValue = function(data) {
      let value = values[data.name] || '';
      if (getValue) {
        value = getValue(value);
      } else if (value._id) {
        value = value._id;
      }
      if (value !== null && value !== undefined && value !== NaN) {
        if (!data.decoratorOptions) {
          data.decoratorOptions = {};
        }
        data.decoratorOptions.initialValue = value;
      }
      return data;
    }
    if (item.options && item.options.length > 0) {
      item.options = item.options.map((sub) => {
        return initValue(sub);
      })
      return item;
    } else {
      return initValue(item);
    }
  })
}

export const listToSelectOptions = (list, valueFormat, labelFormat) => {
  if (!list) return [];
  return list.map((item) => {
    let ret = {_id:item._id};
    ret.value = valueFormat ? valueFormat(item) : item._id;
    ret.label = labelFormat ? labelFormat(item) : item.name;
    return ret;
  })
}

export const getDefaultListResponse = (result) => {
  let list = {};
  for(let key in result) {
    if (key.indexOf('List') !== -1) {
      list[key] = result[key].list;
      list[key+'Page'] = result[key].page;
    }
  }

  return list;
}

export const print = (obj) => {
  //要打印的div的内容
  var docStr = obj.innerHTML;
  var printEle = document.getElementById("print");
  printEle.innerHTML = docStr;
  printEle.style.display = 'block';
  window.print();
  printEle.style.display = 'none';
}