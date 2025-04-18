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

var _commons = require("egov-ui-framework/ui-utils/commons.js");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyStyle = {
  backgroundColor: "#FFFFFF",
  border: "0.5px solid rgba(0, 0, 0, 0)",
  boxShadow: "0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22)",
  height: "240px !important"
};

var contentStyle = {
  width: "100%",
  maxWidth: "fit-content"
};

var buttonStyle = {
  backgroundColor: "none",
  boxShadow: "none",
  height: "auto",
  lineHeight: "0px"
};

var payNowButton = {
  display: "flex",
  justifyContent: "space-between"
};

var labelStyle = {
  color: "rgba(0, 0, 0, 1)",
  fontSize: "18px",
  fontWeight: "bold",
  display: "flex",
  lineHeight: "30px"
};

var PendingAmountDialog = function (_Component) {
  (0, _inherits3.default)(PendingAmountDialog, _Component);

  function PendingAmountDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PendingAmountDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PendingAmountDialog.__proto__ || Object.getPrototypeOf(PendingAmountDialog)).call.apply(_ref, [this].concat(args))), _this), _this.navigateToCommonPay = function (consumerCode, businessService) {
      _this.props.closeDialogue();
      (0, _formUtils.routeToCommonPay)(consumerCode, _this.props.tenantId, businessService);
      // this.props.history.push(`${envURL}?consumerCode=${this.props.consumerCode}&tenantId=${this.props.tenantId}`);
    }, _this.dialogContent = function (amount) {
      return (0, _commons.getLocaleLabels)("PT_YOU_HAVE", "PT_YOU_HAVE") + " " + (0, _commons.getLocaleLabels)("PT_MUTATION_RS", "PT_MUTATION_RS") + "<b>" + amount + "</b>" + " " + (0, _commons.getLocaleLabels)("PT_PENDING_AMOUNT", "PT_PENDING_AMOUNT") + "<br/>" + (0, _commons.getLocaleLabels)("PT_INORDER_TO_TRANSFER", "PT_INORDER_TO_TRANSFER");
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PendingAmountDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          open = _props.open,
          closeDialogue = _props.closeDialogue,
          amount = _props.amount,
          waterDetails = _props.waterDetails,
          sewerDetails = _props.sewerDetails,
          consumerCode = _props.consumerCode;

      var envURL = "/egov-common/pay";
      return _react2.default.createElement(_components.Dialog, {
        open: open,
        children: [_react2.default.createElement(
          "div",
          { style: { margin: 16 } },
          _react2.default.createElement(_translationNode2.default, { label: "PT_PENDING_AMOUNT_DUE", style: labelStyle, labelClassName: "pending-amount-due" }),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "p",
            { className: "dialog-content" },
            _react2.default.createElement(_translationNode2.default, { fontSize: "18px", label: "PT_INORDER_TO_TRANSFER" })
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_translationNode2.default, { fontSize: "18px", label: "PT_PROPERTY_DUE" }),
            _react2.default.createElement(
              "div",
              { style: payNowButton },
              _react2.default.createElement(
                "div",
                { style: labelStyle },
                _react2.default.createElement(_translationNode2.default, { label: "PT_MUTATION_RS", labelClassName: "rupees-label" }),
                Math.round(amount)
              ),
              amount > 0 && _react2.default.createElement(_components.Button, { disabled: amount <= 0, className: "pending-dues", style: buttonStyle, label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, color: "rgb(254, 122, 81)", label: "CS_COMMON_PAY_NOW", fontSize: "16px" }), onClick: function onClick() {
                  _this2.navigateToCommonPay(consumerCode, "PT");
                } })
            )
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_translationNode2.default, { fontSize: "18px", label: "PT_WATER_BILL_DUE" }),
            waterDetails && waterDetails.length > 0 ? waterDetails.map(function (items) {
              if (items.module === "WS") {
                return _react2.default.createElement(
                  "div",
                  { style: payNowButton },
                  _react2.default.createElement(
                    "div",
                    { style: labelStyle },
                    _react2.default.createElement(_translationNode2.default, { label: "PT_MUTATION_RS", labelClassName: "rupees-label" }),
                    Math.round(items.waterDue)
                  ),
                  items.waterDue > 0 && _react2.default.createElement(_components.Button, { disabled: items.waterDue < 0, className: "pending-dues", style: buttonStyle, label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, color: "rgb(254, 122, 81)", label: "CS_COMMON_PAY_NOW", fontSize: "16px" }), onClick: function onClick() {
                      _this2.navigateToCommonPay(items.connectionNo, items.module);
                    } })
                );
              }
            }) : _react2.default.createElement(
              "div",
              { style: payNowButton },
              _react2.default.createElement(
                "div",
                { style: labelStyle },
                _react2.default.createElement(_translationNode2.default, { label: "PT_MUTATION_RS", labelClassName: "rupees-label" }),
                0
              )
            )
          ),
          _react2.default.createElement("br", null),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_translationNode2.default, { fontSize: "18px", label: "PT_SEWERAGE_BILL_DUE" }),
            sewerDetails && sewerDetails.length > 0 ? sewerDetails.map(function (items) {
              if (items.module === "SW") {
                return _react2.default.createElement(
                  "div",
                  { style: payNowButton },
                  _react2.default.createElement(
                    "div",
                    { style: labelStyle },
                    _react2.default.createElement(_translationNode2.default, { label: "PT_MUTATION_RS", labelClassName: "rupees-label" }),
                    Math.round(items.sewerDue)
                  ),
                  items.sewerDue > 0 && _react2.default.createElement(_components.Button, { disabled: items.sewerDue < 0, className: "pending-dues", style: buttonStyle, label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, color: "rgb(254, 122, 81)", label: "CS_COMMON_PAY_NOW", fontSize: "16px" }), onClick: function onClick() {
                      _this2.navigateToCommonPay(items.connectionNo, items.module);
                    } })
                );
              }
            }) : _react2.default.createElement(
              "div",
              { style: payNowButton },
              _react2.default.createElement(
                "div",
                { style: labelStyle },
                _react2.default.createElement(_translationNode2.default, { label: "PT_MUTATION_RS", labelClassName: "rupees-label" }),
                0
              )
            )
          )
        )],
        bodyStyle: bodyStyle,
        isClose: true,
        handleClose: closeDialogue,
        onRequestClose: closeDialogue,
        contentStyle: contentStyle,
        contentClassName: "amount-due-dialog-content"
      });
    }
  }]);
  return PendingAmountDialog;
}(_react.Component);

;

exports.default = (0, _reactRouterDom.withRouter)(PendingAmountDialog);