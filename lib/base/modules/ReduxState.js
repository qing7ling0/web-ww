"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ReduxBegan = exports.ReduxBegan = function ReduxBegan(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      if (action && action.state !== States.Padding) {
        dispatch({ type: action.type, state: States.Padding });
      }
      next(action);
    };
  };
};

var ReduxEnd = exports.ReduxEnd = function ReduxEnd(_ref2) {
  var dispatch = _ref2.dispatch,
      getState = _ref2.getState;
  return function (next) {
    return function (action) {
      if (action && action.state !== States.Padding) {
        action.state = States.Fulfilled;
      }
      next(action);
    };
  };
};

var States = exports.States = {
  Padding: 1, // 进行中
  Fulfilled: 2 // 已完成
};
//# sourceMappingURL=ReduxState.js.map