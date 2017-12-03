'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: 'get',
    value: function get(key) {
      return _react.AsyncStorage.getItem(key).then(function (value) {
        var jsonValue = JSON.parse(value);
        return jsonValue;
      });
    }
  }, {
    key: 'save',
    value: function save(key, value) {
      return _react.AsyncStorage.setItem(key, JSON.stringify(value));
    }
  }, {
    key: 'update',
    value: function update(key, value) {
      return DeviceStorage.get(key).then(function (item) {
        value = typeof value === 'string' ? value : Object.assign({}, item, value);
        return _react.AsyncStorage.setItem(key, JSON.stringify(value));
      });
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return _react.AsyncStorage.removeItem(key);
    }
  }]);

  return Storage;
}();

exports.default = Storage;
//# sourceMappingURL=Storage.js.map