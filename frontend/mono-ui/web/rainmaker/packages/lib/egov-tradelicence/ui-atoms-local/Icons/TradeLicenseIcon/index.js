"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require("@material-ui/core/SvgIcon");

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

require("../index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TradeLicenseIcon = function (_React$Component) {
  (0, _inherits3.default)(TradeLicenseIcon, _React$Component);

  function TradeLicenseIcon() {
    (0, _classCallCheck3.default)(this, TradeLicenseIcon);
    return (0, _possibleConstructorReturn3.default)(this, (TradeLicenseIcon.__proto__ || Object.getPrototypeOf(TradeLicenseIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(TradeLicenseIcon, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      return _react2.default.createElement(
        _SvgIcon2.default,
        {
          viewBox: "0 -8 35 42",
          color: "primary",
          className: "module-page-icon"
        },
        _react2.default.createElement("path", {
          d: "M22.5,18 L25.5,18 L25.5,22.5 L30,22.5 L30,25.5 L25.5,25.5 L25.5,30 L22.5,30 L22.5,25.5 L18,25.5 L18,22.5 L22.5,22.5 L22.5,18 L22.5,18 Z M12,0 L18,0 C19.6568542,0 21,1.34314575 21,3 L21,6 L27,6 C28.6568542,6 30,7.34314575 30,9 L30,17.295 C28.41,15.87 26.31,15 24,15 C19.0294373,15 15,19.0294373 15,24 C15,25.635 15.435,27.18 16.2,28.5 L3,28.5 C1.335,28.5 0,27.15 0,25.5 L0,9 C0,7.335 1.335,6 3,6 L9,6 L9,3 C9,1.335 10.335,0 12,0 L12,0 Z M18,6 L18,3 L12,3 L12,6 L18,6 Z",
          id: "Shape"
        })
      );
    }
  }]);
  return TradeLicenseIcon;
}(_react2.default.Component);

exports.default = TradeLicenseIcon;