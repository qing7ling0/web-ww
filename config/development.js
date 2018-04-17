/**
 * 开发环境的配置内容
 */

module.exports = {
  env: 'development', //环境名称
  port: 3001,         //服务端口号
  mongodb_url: 'localhost:27017/web-ww',    //数据库地址
  // mongodb_url: '106.14.138.141:27017/web-ww',    //数据库地址
  redis_url:'',       //redis地址
  redis_port: '',      //redis端口号

  session: {
    key: '__LLSESSIONQQ__',
    maxAge: 3600000, // 一个小时
    overwrite: false
  },
  upload: {
    uploadDir: 'uploads',
    limits: {
      fileSize:1024*1024*100, // 100M
      files:10,
    },
    fileFilterReg:/\.(gif|jpe?g|png|mp4|avi|zip)$/i
  }
}