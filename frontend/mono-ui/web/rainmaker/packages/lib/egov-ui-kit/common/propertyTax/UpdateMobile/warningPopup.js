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

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WarningPopup = function (_React$Component) {
  (0, _inherits3.default)(WarningPopup, _React$Component);

  function WarningPopup(props) {
    (0, _classCallCheck3.default)(this, WarningPopup);
    return (0, _possibleConstructorReturn3.default)(this, (WarningPopup.__proto__ || Object.getPrototypeOf(WarningPopup)).call(this, props));
  }

  (0, _createClass3.default)(WarningPopup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$propertyId = _props.propertyId,
          propertyId = _props$propertyId === undefined ? "" : _props$propertyId,
          _props$tenantId = _props.tenantId,
          tenantId = _props$tenantId === undefined ? "" : _props$tenantId;

      return _react2.default.createElement(
        _components.Dialog,
        {
          className: "pt-warning-popup",
          open: this.props.open,
          isClose: true,
          title: _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_INVALIDNO_HEADER", fontSize: "24px", labelStyle: { padding: "2%", backgroundColor: "white", paddingLeft: '4%' }, labelClassName: "owner-history" }),
          handleClose: this.props.closeDialog,
          titleStyle: {
            padding: "2%",
            backgroundColor: "white"

          },
          actionsContainerStyle: {
            padding: "2%",
            backgroundColor: "white"
          },
          bodyStyle: {
            padding: "0% 2% 2% 2%",
            backgroundColor: "white"
          }
        },
        _react2.default.createElement(
          "div",
          { style: { padding: '10px' } },
          _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_INVALIDNO_DESC", labelStyle: { color: 'rgba(0, 0, 0, 0.873302)', fontSize: "14px" } })
        ),
        _react2.default.createElement(
          "div",
          { className: "pt-warning-button-container" },
          _react2.default.createElement(
            "button",
            { type: "button", style: { width: '48%' }, className: "button-warning-secondary", onClick: function onClick() {
                _this2.props.closeDialog();
                _this2.props.closeDue();
                (0, _formUtils.routeToCommonPay)(propertyId, tenantId);
              } },
            _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_INVALIDNO_SKIP" })
          ),
          _react2.default.createElement(
            "button",
            { type: "button", style: { width: '48%' }, className: "button-verify-link", onClick: function onClick() {
                _this2.props.updateNum();
              } },
            _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_INVALIDNO_UPDATE" })
          )
        )
      );
    }
  }]);
  return WarningPopup;
}(_react2.default.Component);

exports.default = WarningPopup;