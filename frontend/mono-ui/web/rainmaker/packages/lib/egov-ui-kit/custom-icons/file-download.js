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

var FileDownload = function FileDownload(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 -8 35 42" }, props),
    _react2.default.createElement("path", {
      d: "M16.25,0 L3.25,0 C1.44625,0 0,1.44625 0,3.25 L0,29.25 C0,31.05375 1.44625,32.5 3.25,32.5 L22.75,32.5 C24.55375,32.5 26,31.05375 26,29.25 L26,9.75 L16.25,0 L16.25,0 Z M13,27.625 L6.5,21.125 L10.5625,21.125 L10.5625,16.25 L15.4375,16.25 L15.4375,21.125 L19.5,21.125 L13,27.625 L13,27.625 Z M14.625,11.375 L14.625,2.4375 L23.5625,11.375 L14.625,11.375 Z",
      id: "Shape"
    })
  );
};

exports.default = FileDownload;