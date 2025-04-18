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

var GetCertIcon = function (_React$Component) {
  (0, _inherits3.default)(GetCertIcon, _React$Component);

  function GetCertIcon() {
    (0, _classCallCheck3.default)(this, GetCertIcon);
    return (0, _possibleConstructorReturn3.default)(this, (GetCertIcon.__proto__ || Object.getPrototypeOf(GetCertIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(GetCertIcon, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      return _react2.default.createElement(
        _SvgIcon2.default
        //viewBox="0 -8 35 42"
        ,
        { color: "primary",
          className: "module-page-icon"
        },
        _react2.default.createElement("path", {
          d: "M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z",
          id: "Shape"
        })
      );
    }
  }]);
  return GetCertIcon;
}(_react2.default.Component);

exports.default = GetCertIcon;