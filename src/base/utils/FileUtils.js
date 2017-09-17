'use strict'

class FileUtils {
  /**
   * 根据文件路径返回文件目录
   * 
   * @static
   * @param {any} path 
   * @returns 
   * @memberof Utils
   */
  static GetFileDirPath(path) {
    if (!path || !Utils.IsString(path)) return '';
    // let path = 'c:/aaa/bb/c/d.js'
    path = path.replace(/\\/g, '/');
    let index = path.lastIndexOf('/');
    if (index === -1) return path;
    else {
      return path.substring(0, index);
    }
  }

  /**
   * 根据文件路径返回文件名称带后缀名
   * 
   * @static
   * @param {any} path 
   * @returns 
   * @memberof Utils
   */
  static GetFileName(path) {
    if (!path || !Utils.IsString(path)) return '';

    path = path.replace(/\\/g, '/');
    let index = path.lastIndexOf('/');
    if (index === -1) return path;
    else {
      return path.substring(index + 1);
    }
  }

  /**
   * 返回相对路径
   * 
   * @static
   * @param {any} srcPath 
   * @param {any} dstPath 
   * @memberof Utils
   */
  static GetFileRelativePath(srcPath, dstPath) {
    // let srcPath = 'c:/aa/dx/a/b.js'
    // let dstPath = 'c:/aa/d/b/x.js'

    srcPath = Utils.GetFileDirPath(srcPath);
    srcPath = srcPath.replace(/\\/g, '/');
    srcPath = srcPath.replace(/(\/+)$/g, '');
    dstPath = dstPath.replace(/\\/g, '/');
    dstPath = dstPath.replace(/(\/+)$/g, '');
    let ind = dstPath.indexOf(srcPath);
    if (ind !== -1) return dstPath.substring(ind + srcPath.length).replace(/^(\/+)/g, '');
    ind = -1;
    for (let i = 0; i < srcPath.length; i++) {
      if (srcPath[i] !== dstPath[i]) {
        break;
      }
      ind = i;
    }
    if (ind > -1) {
      srcPath = srcPath.substring(ind);
      dstPath = dstPath.substring(ind);
    }

    let srcs = srcPath.split('/');
    let dsts = dstPath.split('/');
    let ret = '';
    for (let i = 0; i < srcs.length; i++) {
      ret = ret + '../';
    }
    ret = ret + dstPath;
    // console.log(ret);

    return ret;
  }
}

export default FileUtils