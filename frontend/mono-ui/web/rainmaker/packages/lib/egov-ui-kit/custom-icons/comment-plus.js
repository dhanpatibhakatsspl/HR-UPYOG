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

var CommentPlus = function CommentPlus(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ className: "custom-icon", viewBox: "0 -8 35 42" }, props),
    _react2.default.createElement("path", {
      d: "M10.5,30 C9.67157288,30 9,29.3284271 9,28.5 L9,24 L3,24 C1.34314575,24 0,22.6568542 0,21 L0,3 C0,1.335 1.35,0 3,0 L27,0 C28.6568542,0 30,1.34314575 30,3 L30,21 C30,22.6568542 28.6568542,24 27,24 L17.85,24 L12.3,29.565 C12,29.85 11.625,30 11.25,30 L10.5,30 L10.5,30 Z M13.5,6 L13.5,10.5 L9,10.5 L9,13.5 L13.5,13.5 L13.5,18 L16.5,18 L16.5,13.5 L21,13.5 L21,10.5 L16.5,10.5 L16.5,6 L13.5,6 Z",
      id: "Shape"
    })
  );
};

exports.default = CommentPlus;