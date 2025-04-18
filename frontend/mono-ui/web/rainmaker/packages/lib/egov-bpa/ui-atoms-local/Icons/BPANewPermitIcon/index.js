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

var BPANewPermitIcon = function (_React$Component) {
  (0, _inherits3.default)(BPANewPermitIcon, _React$Component);

  function BPANewPermitIcon() {
    (0, _classCallCheck3.default)(this, BPANewPermitIcon);
    return (0, _possibleConstructorReturn3.default)(this, (BPANewPermitIcon.__proto__ || Object.getPrototypeOf(BPANewPermitIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(BPANewPermitIcon, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      return _react2.default.createElement(
        _SvgIcon2.default,
        { viewBox: "0 0 24 24", color: "primary", className: "module-page-icon" },
        _react2.default.createElement("path", {
          d: "M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z",
          id: "shape"
        })
      );
    }
  }]);
  return BPANewPermitIcon;
}(_react2.default.Component);

exports.default = BPANewPermitIcon;