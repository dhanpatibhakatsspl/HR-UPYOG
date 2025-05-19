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

var BPAStakeholderRegIcon = function (_React$Component) {
  (0, _inherits3.default)(BPAStakeholderRegIcon, _React$Component);

  function BPAStakeholderRegIcon() {
    (0, _classCallCheck3.default)(this, BPAStakeholderRegIcon);
    return (0, _possibleConstructorReturn3.default)(this, (BPAStakeholderRegIcon.__proto__ || Object.getPrototypeOf(BPAStakeholderRegIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(BPAStakeholderRegIcon, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      return _react2.default.createElement(
        _SvgIcon2.default,
        { viewBox: "0 0 24 24", color: "primary", className: "module-page-icon" },
        _react2.default.createElement(
          "g",
          {
            xmlns: "http://www.w3.org/2000/svg",
            "fill-rule": "evenodd",
            "clip-rule": "evenodd"
          },
          _react2.default.createElement("path", { d: "M9 17l3-2.94c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4" }),
          _react2.default.createElement("path", { d: "M15.47 20.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z" })
        ),
        " "
      );
    }
  }]);
  return BPAStakeholderRegIcon;
}(_react2.default.Component);

exports.default = BPAStakeholderRegIcon;