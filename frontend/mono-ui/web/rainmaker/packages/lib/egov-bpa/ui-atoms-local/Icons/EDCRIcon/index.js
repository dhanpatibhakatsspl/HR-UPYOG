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

var EDCRIcon = function (_React$Component) {
  (0, _inherits3.default)(EDCRIcon, _React$Component);

  function EDCRIcon() {
    (0, _classCallCheck3.default)(this, EDCRIcon);
    return (0, _possibleConstructorReturn3.default)(this, (EDCRIcon.__proto__ || Object.getPrototypeOf(EDCRIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(EDCRIcon, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      return _react2.default.createElement(
        _SvgIcon2.default,
        { viewBox: "0 0 24 24", color: "primary", className: "module-page-icon" },
        _react2.default.createElement("path", {
          d: "M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z",
          id: "Shape"
        })
      );
    }
  }]);
  return EDCRIcon;
}(_react2.default.Component);

exports.default = EDCRIcon;