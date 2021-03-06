'use strict'

/**
 * API错误名称
 */
var ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = "UNKNOW_ERROR";
ApiErrorNames.REQ_ERROR = "REQ_ERROR";
ApiErrorNames.LOGIN_INVALID = "LOGIN_INVALID";
ApiErrorNames.ACCOUNT_NOT_EXIST = "ACCOUNT_NOT_EXIST";
ApiErrorNames.ACCOUNT_PASSWORD_ERROR = 'ACCOUNT_PASSWORD_ERROR'
ApiErrorNames.ACCOUNT_EXIST = 'ACCOUNT_EXST'
ApiErrorNames.ACCOUNT_SESSION_EXPIRE = 'ACCOUNT_SESSION_EXPIRE'
ApiErrorNames.GET_FAIL = 'GET_FAIL'
ApiErrorNames.ADD_FAIL = 'ADD_FAIL'
ApiErrorNames.UPDATE_FAIL = 'UPDATE_FAIL'
ApiErrorNames.DELETE_FAIL = 'DELETE_FAIL'
ApiErrorNames.UPDATE_SUCCESS = 'UPDATE_SUCCESS'

ApiErrorNames.MOUNT_NOT_ENOUGH = 'MOUNT_NOT_ENOUGH'

/**
 * API错误名称对应的错误信息
 */
const error_map = new Map();

error_map.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
error_map.set(ApiErrorNames.REQ_ERROR, { code: -2, message: '请求错误' });

error_map.set(ApiErrorNames.UPDATE_SUCCESS, { code: 10, message: '更新成功！' });
error_map.set(ApiErrorNames.ADD_FAIL, { code: 11, message: '添加失败！' });
error_map.set(ApiErrorNames.UPDATE_FAIL, { code: 12, message: '更新失败！' });
error_map.set(ApiErrorNames.DELETE_FAIL, { code: 13, message: '删除失败！' });
error_map.set(ApiErrorNames.GET_FAIL, { code: 14, message: '获取数据失败!' });

error_map.set(ApiErrorNames.LOGIN_INVALID, { code: 20, message: '未登录，请重新登陆!' });
error_map.set(ApiErrorNames.ACCOUNT_NOT_EXIST, { code: 101, message: '用户不存在' });
error_map.set(ApiErrorNames.ACCOUNT_PASSWORD_ERROR, { code: 102, message: '帐号密码错误！' });
error_map.set(ApiErrorNames.ACCOUNT_EXIST, { code: 103, message: '帐号已存在！' });
error_map.set(ApiErrorNames.ACCOUNT_SESSION_EXPIRE, { code: 104, message: '时间过长，请重新登陆!' });


error_map.set(ApiErrorNames.MOUNT_NOT_ENOUGH, { code: 999, message: '储值卡余额不足，请充值!' });

//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (error_name) => {

    var error_info;

    if (error_name) {
        error_info = error_map.get(error_name);
    }

    //如果没有对应的错误信息，默认'未知错误'
    if (!error_info) {
        error_name = UNKNOW_ERROR;
        error_info = error_map.get(error_name);
    }

    return error_info;
}

module.exports = ApiErrorNames;