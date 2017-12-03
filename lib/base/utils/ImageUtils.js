'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageUtils = function () {
  function ImageUtils() {
    _classCallCheck(this, ImageUtils);
  }

  _createClass(ImageUtils, null, [{
    key: 'ImageReady',
    value: function ImageReady(url, ready, load, error) {
      var list = [],
          intervalId = null,


      // 用来执行队列
      tick = function tick() {
        var i = 0;
        for (; i < list.length; i++) {
          list[i].end ? list.splice(i--, 1) : list[i]();
        };
        !list.length && stop();
      },


      // 停止所有定时器队列
      stop = function stop() {
        clearInterval(intervalId);
        intervalId = null;
      };

      var fnReady = function fnReady(url, ready, load, error) {
        var _onready = void 0,
            width = void 0,
            height = void 0,
            newWidth = void 0,
            newHeight = void 0;
        var img = new Image();
        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
          ready.call(img, img);
          load && load.call(img, img);
          return;
        };

        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function () {
          error && error.call(img, img);
          _onready.end = true;
          img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        _onready = function onready() {
          newWidth = img.width;
          newHeight = img.height;
          if (newWidth !== width || newHeight !== height ||
          // 如果图片已经在其他地方加载可使用面积检测
          newWidth * newHeight > 1024) {
            ready.call(img, img);
            _onready.end = true;
          };
        };
        _onready();

        // 完全加载完毕的事件
        img.onload = function () {
          // onload在定时器时间差范围内可能比onready快
          // 这里进行检查并保证onready优先执行
          !_onready.end && _onready();

          load && load.call(img, img);

          // IE gif动画会循环执行onload，置空onload即可
          img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!_onready.end) {
          list.push(_onready);
          // 无论何时只允许出现一个定时器，减少浏览器性能损耗
          if (intervalId === null) intervalId = setInterval(tick, 40);
        };
      };

      return fnReady(url, ready, load, error);
    }
  }]);

  return ImageUtils;
}();

exports.default = ImageUtils;
//# sourceMappingURL=ImageUtils.js.map