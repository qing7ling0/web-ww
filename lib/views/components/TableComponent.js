'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/message/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

var _BaseComponent2 = require('./BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

var _Constants = require('../constants/Constants');

var constants = _interopRequireWildcard(_Constants);

var _Utils = require('../../base/utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseContainer = function (_BaseComponent) {
  _inherits(BaseContainer, _BaseComponent);

  // 构造函数，在创建组件的时候调用一次
  function BaseContainer(props) {
    _classCallCheck(this, BaseContainer);

    var _this = _possibleConstructorReturn(this, (BaseContainer.__proto__ || Object.getPrototypeOf(BaseContainer)).call(this, props));

    _this.state = {
      loading: false,
      success: true
    };
    return _this;
  }

  //在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次


  _createClass(BaseContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
    // const {Load} = this.props;
    // Load();


    // 在组件挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}

    // props是父组件传递给子组件的。
    // 父组件发生render的时候子组件就会调用componentWillReceiveProps
    //（不管props有没有更新，也不管父子组件之间有没有数据交换）

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.results) {
        this.handReqResult(nextProps.results);
      }
    }

    // 组件挂载之后，每次调用setState后都会
    // 调用shouldComponentUpdate判断是否需要重新渲染组件。
    // 默认返回true，需要重新render。
    // 在比较复杂的应用里，有一些数据的改变并不影响界面展示，
    // 可以在这里做判断，优化渲染效率

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }

    // shouldComponentUpdate返回true或者调用forceUpdate之后，
    // componentWillUpdate会被调用

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {}

    // 除了首次render之后调用componentDidMount，
    // 其它render结束之后都是调用componentDidUpdate。
    // componentWillMount、componentDidMount和componentWillUpdate、componentDidUpdate可以对应起来。
    // 区别在于，前者只有在挂载的时候会被调用；而后者在以后的每次更新渲染之后都会被调用。

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}

    // 组件被卸载的时候调用。一般在componentDidMount里面注册的事件需要在这里删除。

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'handReqResult',
    value: function handReqResult(results) {
      if (!results) return;
      for (var i = 0; i < results.length; i++) {
        if (!this.onHandReqResult(results[i])) {
          if (results[i].code !== 0) {
            _message3.default.error(results[i].message);
          }
        }

        results.splice(i, 1);
        i--;
      }
    }
  }, {
    key: 'onHandReqResult',
    value: function onHandReqResult(result) {
      return false;
    }
  }]);

  return BaseContainer;
}(_BaseComponent3.default);

exports.default = BaseContainer;