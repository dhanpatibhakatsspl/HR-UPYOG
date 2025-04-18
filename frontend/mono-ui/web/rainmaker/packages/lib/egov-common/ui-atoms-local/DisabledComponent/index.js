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

var _disableBrowserBackNavigation = require("disable-browser-back-navigation");

var _disableBrowserBackNavigation2 = _interopRequireDefault(_disableBrowserBackNavigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DisabledComponent = function (_Component) {
  (0, _inherits3.default)(DisabledComponent, _Component);

  function DisabledComponent() {
    (0, _classCallCheck3.default)(this, DisabledComponent);
    return (0, _possibleConstructorReturn3.default)(this, (DisabledComponent.__proto__ || Object.getPrototypeOf(DisabledComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DisabledComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _disableBrowserBackNavigation2.default)();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", null);
    }
  }]);
  return DisabledComponent;
}(_react.Component);

exports.default = DisabledComponent;