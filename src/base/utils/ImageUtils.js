'use strict'

class ImageUtils {
  static ImageReady(url, ready, load, error) {
    let list = [],
      intervalId = null,

      // 用来执行队列
      tick = function () {
        var i = 0;
        for (; i < list.length; i++) {
          list[i].end ? list.splice(i--, 1) : list[i]();
        };
        !list.length && stop();
      },

      // 停止所有定时器队列
      stop = function () {
        clearInterval(intervalId);
        intervalId = null;
      };

    let fnReady = function (url, ready, load, error) {
      let onready, width, height, newWidth, newHeight;
      let img = new Image();
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
        onready.end = true;
        img = img.onload = img.onerror = null;
      };

      // 图片尺寸就绪
      onready = function () {
        newWidth = img.width;
        newHeight = img.height;
        if (newWidth !== width || newHeight !== height ||
          // 如果图片已经在其他地方加载可使用面积检测
          newWidth * newHeight > 1024
        ) {
          ready.call(img, img);
          onready.end = true;
        };
      };
      onready();

      // 完全加载完毕的事件
      img.onload = function () {
        // onload在定时器时间差范围内可能比onready快
        // 这里进行检查并保证onready优先执行
        !onready.end && onready();

        load && load.call(img, img);

        // IE gif动画会循环执行onload，置空onload即可
        img = img.onload = img.onerror = null;
      };

      // 加入队列中定期执行
      if (!onready.end) {
        list.push(onready);
        // 无论何时只允许出现一个定时器，减少浏览器性能损耗
        if (intervalId === null) intervalId = setInterval(tick, 40);
      };
    };

    return fnReady(url, ready, load, error);
  }
}

export default ImageUtils