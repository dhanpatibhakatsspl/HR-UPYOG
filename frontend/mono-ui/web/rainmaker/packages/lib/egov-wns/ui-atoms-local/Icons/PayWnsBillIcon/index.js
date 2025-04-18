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

var PayWnsBillIcon = function (_React$Component) {
    (0, _inherits3.default)(PayWnsBillIcon, _React$Component);

    function PayWnsBillIcon() {
        (0, _classCallCheck3.default)(this, PayWnsBillIcon);
        return (0, _possibleConstructorReturn3.default)(this, (PayWnsBillIcon.__proto__ || Object.getPrototypeOf(PayWnsBillIcon)).apply(this, arguments));
    }

    (0, _createClass3.default)(PayWnsBillIcon, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _SvgIcon2.default,
                { color: "primary",
                    viewBox: "0 0 24 24",
                    className: "module-page-icon" },
                _react2.default.createElement("path", { d: "m14.503919,4.798149l2.903959,0l1.114051,-1.671076l-10.910272,0l-1.114051,1.671076l1.893887,0c1.916168,0 3.691222,0.14854 4.396788,1.752774l-5.176623,0l-1.114051,1.671076l6.498631,0c0,0.007427 0,0.007427 0,0.007427c0,1.203175 -1.002646,3.045073 -4.300237,3.045073l-1.596806,0l0,1.559671l6.394652,7.991459l2.844543,0l-6.610036,-8.258831c2.725711,-0.14854 5.280602,-1.671076 5.644525,-4.344799l2.035,0l1.114051,-1.671076l-3.178759,0c-0.126259,-0.64615 -0.401058,-1.270018 -0.839252,-1.752774z",
                    id: "Shape" })
            );
        }
    }]);
    return PayWnsBillIcon;
}(_react2.default.Component);

exports.default = PayWnsBillIcon;