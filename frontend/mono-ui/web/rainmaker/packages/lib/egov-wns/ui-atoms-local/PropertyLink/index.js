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

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _formActionUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  color: "rgba(0, 0, 0, 0.87)",
  marginLeft: "3%",
  marginTop: "7%",
  lineHeight: "35px",
  fontSize: "16px"
};

var clickHereStyles = {
  cursor: "pointer",
  textDecoration: "none",
  color: "#FE7A51"
};

var AddLinkForProperty = function (_React$Component) {
  (0, _inherits3.default)(AddLinkForProperty, _React$Component);

  function AddLinkForProperty() {
    (0, _classCallCheck3.default)(this, AddLinkForProperty);
    return (0, _possibleConstructorReturn3.default)(this, (AddLinkForProperty.__proto__ || Object.getPrototypeOf(AddLinkForProperty)).apply(this, arguments));
  }

  (0, _createClass3.default)(AddLinkForProperty, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          url = _props.url,
          isMode = _props.isMode,
          selectedPropertyId = _props.selectedPropertyId;

      var link = "/pt-common-screens/propertySearch?redirectUrl=" + url;
      var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
      var modifyLink = "/property-tax/assessment-form?assessmentId=0&purpose=update&propertyId=" + selectedPropertyId + "&tenantId=" + tenantId + "&redirectTo=" + url.substring(1);
      if (link) {
        var applicationNo = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
        var connectionNo = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
        var actionType = (0, _commons.getQueryArg)(window.location.href, "action");
        link = applicationNo && !link.includes('applicationNumber') ? link + ("&applicationNumber=" + applicationNo) : link;
        link = connectionNo && !link.includes('connectionNumber') ? link + ("&connectionNumber=" + connectionNo) : link;
        link = actionType && !link.includes('action') ? link + ("&action=" + actionType) : link;
      }

      if (isMode === "MODIFY") {
        return _react2.default.createElement(
          "div",
          { style: styles, className: "property-buttons" },
          _react2.default.createElement(
            "a",
            { href: "javascript:void(0)", onClick: function onClick() {
                return (0, _formActionUtils.routeTo)(link);
              } },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              style: clickHereStyles,
              labelKey: "WS_SEARCH_PROPERTY" })
          ),
          " ",
          _react2.default.createElement(
            "span",
            null,
            " "
          ),
          _react2.default.createElement(
            "a",
            { href: "javascript:void(0)", onClick: function onClick() {
                return (0, _formActionUtils.routeTo)(modifyLink);
              } },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              style: clickHereStyles,
              labelKey: "WS_MODIFY_PROPERTY" })
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { style: styles },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            labelName: "To Find/Create Property ID",
            labelKey: "WS_APPLY_CREATE_MSG" }),
          _react2.default.createElement(
            "span",
            null,
            " "
          ),
          _react2.default.createElement(
            "a",
            { href: "javascript:void(0)", onClick: function onClick() {
                return (0, _formActionUtils.routeTo)(link);
              } },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              style: clickHereStyles,
              labelKey: "WS_APPLY_CLICK_HERE" })
          )
        );
      }
    }
  }]);
  return AddLinkForProperty;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var selectedPropertyId = "";
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  selectedPropertyId = (0, _get2.default)(preparedFinalObject, "applyScreen.property.propertyId");

  return { selectedPropertyId: selectedPropertyId };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(AddLinkForProperty);