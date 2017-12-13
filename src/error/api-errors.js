'use strict'

const ApiErrorNames = require('./api-error-names');

/**
 * 自定义Api异常
 */
class ApiError extends Error{
  //构造方法
  constructor(error_name, error_message){
      super();

      var error_info = ApiErrorNames.getErrorInfo(error_name);

      this.name = error_name;
      this.code = error_info.code;
      if (error_message) {
        this.message = error_message;
      } else {
        this.message = error_info.message;
      }
  }
}

module.exports = {ApiError, ApiErrorNames};