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

var HelpIcon = function (_React$Component) {
  (0, _inherits3.default)(HelpIcon, _React$Component);

  function HelpIcon() {
    (0, _classCallCheck3.default)(this, HelpIcon);
    return (0, _possibleConstructorReturn3.default)(this, (HelpIcon.__proto__ || Object.getPrototypeOf(HelpIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(HelpIcon, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _SvgIcon2.default,
        {
          viewBox: "0 -8 23 30",
          color: "primary",
          className: "module-page-icon"
        },
        _react2.default.createElement("path", { d: "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" })
      );
    }
  }]);
  return HelpIcon;
}(_react2.default.Component);

exports.default = HelpIcon;