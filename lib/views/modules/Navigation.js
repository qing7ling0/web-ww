"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = function () {
  function Navigation(history) {
    _classCallCheck(this, Navigation);

    this.history = history;
  }

  _createClass(Navigation, [{
    key: "push",
    value: function push(path, state) {
      this.history.push(path, state);
    }
  }, {
    key: "replace",
    value: function replace(path, state) {
      this.history.replace(path, state);
    }
  }, {
    key: "goBack",
    value: function goBack() {
      if (this.history.length > 1) {
        this.history.goBack();
      }
    }
  }, {
    key: "go",
    value: function go(off) {
      this.history.go(off);
    }
  }, {
    key: "goForward",
    value: function goForward() {
      this.history.goForward();
    }
  }]);

  return Navigation;
}();

exports.default = Navigation;