import moment from 'moment'
import path from 'path'
import fs from 'fs'

import { 
  fileModel
} from '../models/index.js'

import { ApiError, ApiErrorNames } from '../error/api-errors'
import utils from '../utils/utils'
import baseUtils from '../base/utils/utils'
import constants from '../constants/constants'
// import 

const logUtil = require('../utils/log-utils');

class FileData {

  async add(filepath, options, user) {
    console.log('filePath=' + filepath + "; user" + user)
    if (filepath && user) {
      let data = {
        name: path.basename(filepath),
        ext: path.extname(filepath),
        path: filepath,
        temp: true,
        ...utils.createEditorDoc(user)
      }
      let _fileModel = new fileModel(data);
      if (_fileModel) {
        let newFile = await _fileModel.save(options);
        if (newFile) {
          return newFile;
        }
      } else {
        throw new ApiError(ApiErrorNames.ADD_FAIL);
      }
    }
    throw new ApiError(ApiErrorNames.ADD_FAIL);
  }

  async update(conditions, doc, options) {
    if (doc) {
      let ret = await fileModel.updateMany(conditions, doc, options);
      return ret;
    } else {
      throw new ApiError(ApiErrorNames.UPDATE_FAIL);
    }
  }

  async remove(conditions) {
    if (conditions) {
      return await fileModel.deleteMany(conditions);
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  async removeByIds(ids) {
    if (ids && ids.length > 0) {
      return await fileModel.remove({_id:{$in:ids}});
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  async findById(id) {
    if (id) {
      return await fileModel.findOne({_id:id});
    } else {
      throw new ApiError(ApiErrorNames.DELETE_FAIL);
    }
  }

  /**
   * 删除当前账号的临时文件
   * 一般是在重新登陆后进行一次清理
   * @param {*} user 
   */
  async removeTempByUser(user) {
    let files = await fileModel.find({editor_id:user._id, temp:true});
    if (files && files.length > 0) {
      for(let file of files) {
        let filepath = path.join(global.LQ_ROOT_DIR, file.path); 
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
      await this.removeByIds(files.map((item)=>item._id));
    }
  }
}

module.exports = new FileData()