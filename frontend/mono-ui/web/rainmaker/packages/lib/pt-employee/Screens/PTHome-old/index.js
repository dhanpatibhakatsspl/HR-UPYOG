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

var _components = require("components");

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list1items = {
  icon: _react2.default.createElement(_components.Icon, { action: "communication", name: "business" }),
  label: "PT_HOME_ASSESS_NEW_PROPERTY"
};

var PTHome = function (_Component) {
  (0, _inherits3.default)(PTHome, _Component);

  function PTHome() {
    (0, _classCallCheck3.default)(this, PTHome);
    return (0, _possibleConstructorReturn3.default)(this, (PTHome.__proto__ || Object.getPrototypeOf(PTHome)).apply(this, arguments));
  }

  (0, _createClass3.default)(PTHome, [{
    key: "render",
    value: function render() {
      var history = this.props.history;

      return _react2.default.createElement(_common.AssessPay, {
        list1items: list1items,
        hasbreadCrumbs: false,
        history: history
      });
    }
  }]);
  return PTHome;
}(_react.Component);

exports.default = PTHome;