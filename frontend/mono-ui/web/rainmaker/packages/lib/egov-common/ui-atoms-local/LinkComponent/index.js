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

var _components = require("components");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkComponent = function (_Component) {
  (0, _inherits3.default)(LinkComponent, _Component);

  function LinkComponent() {
    (0, _classCallCheck3.default)(this, LinkComponent);
    return (0, _possibleConstructorReturn3.default)(this, (LinkComponent.__proto__ || Object.getPrototypeOf(LinkComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(LinkComponent, [{
    key: "render",
    value: function render() {
      var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
      var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
      var businessService = localStorage.getItem("pay-businessService");
      return businessService == "PT" && _react2.default.createElement(_components.VerifyMobile, { tenantId: tenantId,
        propertyId: consumerCode,
        type: "LINKNUM" });
    }
  }]);
  return LinkComponent;
}(_react.Component);

exports.default = LinkComponent;