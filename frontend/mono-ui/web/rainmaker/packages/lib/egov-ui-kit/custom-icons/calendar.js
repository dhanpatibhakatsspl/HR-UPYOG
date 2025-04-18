"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require("material-ui/SvgIcon");

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = function Calendar(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 -5 30 42", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M24.8888889,28 L3.11111111,28 L3.11111111,10.8888889 L24.8888889,10.8888889 L24.8888889,28 Z M24.8888889,3.11111111 L23.3333333,3.11111111 L23.3333333,0 L20.2222222,0 L20.2222222,3.11111111 L7.77777778,3.11111111 L7.77777778,0 L4.66666667,0 L4.66666667,3.11111111 L3.11111111,3.11111111 C1.38444444,3.11111111 0,4.51111111 0,6.22222222 L0,28 C0,29.7182192 1.39289189,31.1111111 3.11111111,31.1111111 L24.8888889,31.1111111 C26.6071081,31.1111111 28,29.7182192 28,28 L28,6.22222222 C28,4.504003 26.6071081,3.11111111 24.8888889,3.11111111 L24.8888889,3.11111111 Z M21.0466667,15.6488889 L19.3977778,14 L11.8066667,21.5911111 L8.50888889,18.2933333 L6.86,19.9422222 L11.8066667,24.8888889 L21.0466667,15.6488889 Z",
      id: "Shape"
    })
  );
};

exports.default = Calendar;