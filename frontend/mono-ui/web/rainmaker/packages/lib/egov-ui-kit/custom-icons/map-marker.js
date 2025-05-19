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

var MapMarker = function MapMarker(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 -5 25 42", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M13,0 C18.37875,0 22.75,4.3225 22.75,9.66875 C22.75,16.91625 13,27.625 13,27.625 C13,27.625 3.25,16.91625 3.25,9.66875 C3.25,4.3225 7.62125,0 13,0 L13,0 Z M13,6.5 C11.2050746,6.5 9.75,7.95507456 9.75,9.75 C9.75,11.5449254 11.2050746,13 13,13 C14.7949254,13 16.25,11.5449254 16.25,9.75 C16.25,7.95507456 14.7949254,6.5 13,6.5 L13,6.5 Z M26,27.625 C26,31.21625 20.1825,34.125 13,34.125 C5.8175,34.125 0,31.21625 0,27.625 C0,25.52875 1.9825,23.66 5.05375,22.47375 L6.09375,23.9525 C4.33875,24.68375 3.25,25.69125 3.25,26.8125 C3.25,29.055 7.62125,30.875 13,30.875 C18.37875,30.875 22.75,29.055 22.75,26.8125 C22.75,25.69125 21.66125,24.68375 19.90625,23.9525 L20.94625,22.47375 C24.0175,23.66 26,25.52875 26,27.625 Z",
      id: "Shape"
    })
  );
};

exports.default = MapMarker;