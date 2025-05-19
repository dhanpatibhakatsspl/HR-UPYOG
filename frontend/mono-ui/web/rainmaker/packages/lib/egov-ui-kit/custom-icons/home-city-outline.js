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
    (0, _extends3.default)({ viewBox: "0 -8 35 42", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M0,26.9166667 L0,11.3333333 L10.625,4.25 L21.25,11.3333333 L21.25,26.9166667 L14.1666667,26.9166667 L14.1666667,17 L7.08333333,17 L7.08333333,26.9166667 L0,26.9166667 L0,26.9166667 Z M34,0 L34,26.9166667 L24.0833333,26.9166667 L24.0833333,9.8175 L22.6666667,8.8825 L22.6666667,5.66666667 L19.8333333,5.66666667 L19.8333333,6.98416667 L14.1666667,3.21583333 L14.1666667,0 L34,0 L34,0 Z M29.75,17 L26.9166667,17 L26.9166667,19.8333333 L29.75,19.8333333 L29.75,17 L29.75,17 Z M29.75,11.3333333 L26.9166667,11.3333333 L26.9166667,14.1666667 L29.75,14.1666667 L29.75,11.3333333 L29.75,11.3333333 Z M29.75,5.66666667 L26.9166667,5.66666667 L26.9166667,8.5 L29.75,8.5 L29.75,5.66666667 Z",
      id: "Shape"
    })
  );
};

exports.default = CityOutline;