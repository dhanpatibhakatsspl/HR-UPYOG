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
    (0, _extends3.default)({ className: "custom-icon", viewBox: "0 -8 35 42" }, props),
    _react2.default.createElement("path", {
      d: "M12,0 L18,0 C19.6568542,0 21,1.34314575 21,3 L21,6 L27,6 C28.6568542,6 30,7.34314575 30,9 L30,25.5 C30,27.1568542 28.6568542,28.5 27,28.5 L3,28.5 C1.335,28.5 0,27.15 0,25.5 L0,9 C0,7.335 1.335,6 3,6 L9,6 L9,3 C9,1.335 10.335,0 12,0 L12,0 Z M18,6 L18,3 L12,3 L12,6 L18,6 Z",
      id: "Shape"
    })
  );
};

exports.default = CityOutline;