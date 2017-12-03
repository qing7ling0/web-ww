'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileUtils = function () {
  function FileUtils() {
    _classCallCheck(this, FileUtils);
  }

  _createClass(FileUtils, null, [{
    key: 'GetFileDirPath',

    /**
     * 根据文件路径返回文件目录
     * 
     * @static
     * @param {any} path 
     * @returns 
     * @memberof Utils
     */
    value: function GetFileDirPath(path) {
      if (!path || !Utils.IsString(path)) return '';
      // let path = 'c:/aaa/bb/c/d.js'
      path = path.replace(/\\/g, '/');
      var index = path.lastIndexOf('/');
      if (index === -1) return path;else {
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

  }, {
    key: 'GetFileName',
    value: function GetFileName(path) {
      if (!path || !Utils.IsString(path)) return '';

      path = path.replace(/\\/g, '/');
      var index = path.lastIndexOf('/');
      if (index === -1) return path;else {
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

  }, {
    key: 'GetFileRelativePath',
    value: function GetFileRelativePath(srcPath, dstPath) {
      // let srcPath = 'c:/aa/dx/a/b.js'
      // let dstPath = 'c:/aa/d/b/x.js'

      srcPath = Utils.GetFileDirPath(srcPath);
      srcPath = srcPath.replace(/\\/g, '/');
      srcPath = srcPath.replace(/(\/+)$/g, '');
      dstPath = dstPath.replace(/\\/g, '/');
      dstPath = dstPath.replace(/(\/+)$/g, '');
      var ind = dstPath.indexOf(srcPath);
      if (ind !== -1) return dstPath.substring(ind + srcPath.length).replace(/^(\/+)/g, '');
      ind = -1;
      for (var i = 0; i < srcPath.length; i++) {
        if (srcPath[i] !== dstPath[i]) {
          break;
        }
        ind = i;
      }
      if (ind > -1) {
        srcPath = srcPath.substring(ind);
        dstPath = dstPath.substring(ind);
      }

      var srcs = srcPath.split('/');
      var dsts = dstPath.split('/');
      var ret = '';
      for (var _i = 0; _i < srcs.length; _i++) {
        ret = ret + '../';
      }
      ret = ret + dstPath;
      // console.log(ret);

      return ret;
    }
  }]);

  return FileUtils;
}();

exports.default = FileUtils;
//# sourceMappingURL=FileUtils.js.map