/**
 * 开发环境的配置内容
 */

module.exports = {
  env: 'development', //环境名称
  port: 3001,         //服务端口号
  mongodb_url: 'localhost:27017/web-ww',    //数据库地址
  redis_url:'',       //redis地址
  redis_port: '',      //redis端口号

  session: {
    key: '__LLSESSIONQQ__',
    maxAge: 500000, // 一个小时
    overwrite: false
  }
}