'use strict'
const path = require('path')
const send = require('koa-send')
const {fileData} = require('../data')

module.exports.fileUpload = async function(ctx, next) {
  await next();

  let datas = [];
  if (ctx.req) {
    const {files} = ctx.req;
    if (files) {
      for(let key in files) {
        let _files = files[key];
        for(let file of _files) {
          let data = await fileData.add(file.path, null, ctx.session.user);
          datas.push(data._id);
        }
      }
    }
  }

  if (datas.length > 0) {
    ctx.status = 200;
    ctx.body = {
      code:0,
      message:'上传成功',
      data:{
        files:datas
      }
    }
  }
}

module.exports.fileSend = async function(ctx, next) {
  let id = ctx.params.id;
  if (id) {
    let file = await fileData.findById(id);
    if (file) {
      // let p = file.path.replace('uploads\\', '');
      let p =file.path;
      // console.log('fileSend id' + p)"Content-Disposition", "attachment;filename=" + fileName
      // ctx.response.headers.ContentDisposition = "attachment;filename=" + file.name;
      // ctx.response.header.ContentTransferEncoding = "binary";
      // ctx.response.ContentType = "image/*";
      ctx.set('Content-Disposition', "attachment;filename=" + file.name)
      ctx.set('Content-Type', "image/*")
      return await send(ctx, p, {setHeaders:(res)=>{
      }});
    }
  }
}

module.exports.fileDownload = async function(ctx, next) {
  let id = ctx.params.id;
  if (id) {
    let file = await fileData.findById(id);
    if (file) {
      // let p = file.path.replace('uploads\\', '');
      let p =file.path;
      // console.log('fileSend id' + p)
      return await send(ctx, p);
    }
  }
}