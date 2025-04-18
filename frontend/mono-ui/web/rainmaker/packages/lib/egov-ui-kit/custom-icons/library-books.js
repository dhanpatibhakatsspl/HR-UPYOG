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

var CityOutline = function CityOutline(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 -5 30 42", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M21.8181818,20.3636364 L11.6363636,20.3636364 L11.6363636,17.4545455 L21.8181818,17.4545455 L21.8181818,20.3636364 Z M26.1818182,14.5454545 L11.6363636,14.5454545 L11.6363636,11.6363636 L26.1818182,11.6363636 L26.1818182,14.5454545 Z M26.1818182,8.72727273 L11.6363636,8.72727273 L11.6363636,5.81818182 L26.1818182,5.81818182 L26.1818182,8.72727273 Z M29.0909091,0 L8.72727273,0 C7.11272727,0 5.81818182,1.29454545 5.81818182,2.90909091 L5.81818182,23.2727273 C5.81818182,24.8872727 7.12727273,26.1818182 8.72727273,26.1818182 L29.0909091,26.1818182 C30.7054545,26.1818182 32,24.8872727 32,23.2727273 L32,2.90909091 C32,1.29454545 30.6909091,0 29.0909091,0 L29.0909091,0 Z M2.90909091,5.81818182 L2.90909091,29.0909091 L26.1818182,29.0909091 L26.1818182,32 L2.90909091,32 C1.30244436,32 3.22973971e-16,30.6975556 0,29.0909091 L0,5.81818182 L2.90909091,5.81818182 Z",
      id: "Shape"
    })
  );
};

exports.default = CityOutline;