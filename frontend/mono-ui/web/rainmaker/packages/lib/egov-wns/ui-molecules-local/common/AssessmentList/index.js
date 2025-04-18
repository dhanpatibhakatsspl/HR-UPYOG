"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemStatus = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _PTList = require("./components/PTList");

var _PTList2 = _interopRequireDefault(_PTList);

var _BlankAssessment = require("../BlankAssessment");

var _BlankAssessment2 = _interopRequireDefault(_BlankAssessment);

var _DropDown = require("./components/DropDown");

var _DropDown2 = _interopRequireDefault(_DropDown);

require("./index.css");

var _reactRouterDom = require("react-router-dom");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _commons = require("egov-common/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadReceipt = function downloadReceipt(tenantId, consumerCode, businessService) {
  var val = [{
    key: 'consumerCodes',
    value: consumerCode
  }, { key: 'tenantId', value: tenantId }, { key: 'businessService', value: businessService }];
  (0, _commons.download)(val, 'download', "consolidatedreceipt", 'PAYMENT');
};

var getItemStatus = exports.getItemStatus = function getItemStatus(due, paid, tenantId, consumerCode) {
  var history = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var businessService = arguments[5];

  var status = void 0;
  if (due === paid) {
    status = "Paid";
  } else {
    status = "Partially Paid";
  }
  var styles = {
    paidIconStyle: {
      marginLeft: "10px",
      height: "18px",
      marginTop: "5px"
    }
  };
  switch (status) {
    case "Paid":
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline" },
          _react2.default.createElement(_translationNode2.default, { label: status, labelStyle: { marginLeft: 10 }, color: "#22b25f" }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "check", style: styles.paidIconStyle, color: "#22b25f" })
        ),
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { color: '#fe7a51' }, onClick: function onClick() {
              return downloadReceipt(tenantId, consumerCode, businessService);
            } },
          _react2.default.createElement(_LabelContainer2.default, { labelKey: "WS_COMMON_BUTTON_DOWNLOAD_RECEIPT" })
        )
      );
      break;
    case "Partially Paid":
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { marginTop: "8px" } },
          _react2.default.createElement(_translationNode2.default, { label: status, labelStyle: { marginLeft: "8px" }, color: "#22b25f" }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "check", style: styles.paidIconStyle, color: "#22b25f" })
        ),
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { color: '#fe7a51' }, onClick: function onClick() {
              return downloadReceipt(tenantId, consumerCode, businessService);
            } },
          _react2.default.createElement(_LabelContainer2.default, { labelKey: "WS_COMMON_BUTTON_DOWNLOAD_RECEIPT" })
        )
      );
      break;
    case "Payment failed":
      return _react2.default.createElement(
        "div",
        { className: "assessment-displayInline", style: { marginTop: "10px" } },
        _react2.default.createElement(_translationNode2.default, { label: item.status, labelStyle: { marginLeft: "5px" }, color: "#e74c3c" }),
        _react2.default.createElement(_components.Icon, { action: "alert", name: "warning", style: styles.paidIconStyle, color: "#e74c3c" })
      );
      break;
    case "Saved Draft":
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { marginTop: "10px" } },
          _react2.default.createElement(_translationNode2.default, { label: "paid", labelStyle: { marginLeft: "8px" }, color: "#22b25f" }),
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "check", style: styles.paidIconStyle, color: "#22b25f" })
        ),
        _react2.default.createElement(
          "div",
          { className: "assessment-displayInline", style: { paddingTop: "10px", color: '#fe7a51' }, onClick: function onClick() {
              return downloadReceipt(tenantId, consumerCode);
            } },
          _react2.default.createElement(_LabelContainer2.default, { labelKey: "WS_COMMON_BUTTON_DOWNLOAD_RECEIPT" })
        )
      );
      break;
    case "ASSESS & PAY":
      return _react2.default.createElement(
        "div",
        { className: "assessment-displayInline" },
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_PAYMENT_ASSESS_AND_PAY", fontSize: "12px" }),
          primary: true,
          onClick: function onClick(e) {

            history.push("/property-tax/assessment-form?FY=" + item.financialYear + "&assessmentId=" + item.assessmentNo + "&isReassesment=true&propertyId=" + item.propertyId + "&tenantId=" + item.tenantId);
          },
          style: {
            height: 20,
            lineHeight: "auto",
            minWidth: "inherit"
          }
        })
      );
    default:
      return "";
  }
};

var getRightIconItems = function getRightIconItems(item, history) {
  return item.date || item.status || item.receipt || item.action ? _react2.default.createElement(
    "div",
    {
      className: "assessment-right-icon",
      style: { width: "auto", top: "0px", bottom: "0px", height: "inherit", margin: "auto", alignItems: "center", display: "flex", right: 0 }
    },
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { style: { marginBottom: '5px' } },
        _react2.default.createElement(_LabelContainer2.default, { labelKey: "WS_PAST_PAYMENTS_AMOUNT_PAID_LABEL", style: { color: "#484848" } }),
        ":",
        _react2.default.createElement(
          "div",
          { style: { color: "#484848", display: 'inline-block' } },
          "INR 277"
        )
      ),
      item.date && _react2.default.createElement(_translationNode2.default, { label: item.date, containerStyle: { marginRight: 5 }, labelStyle: { textAlign: "right" }, color: "#484848" }),
      getItemStatus(item, history)
    )
  ) : item.rightIcon;
};

var getListItems = function getListItems(items, history) {
  return items && items.map(function (item, index) {
    return item && {
      primaryText: item.primaryText,
      secondaryText: item.secondaryText && ((0, _typeof3.default)(item.secondaryText) === "object" ? item.secondaryText : _react2.default.createElement(_translationNode2.default, { label: item.secondaryText, fontSize: "14px", color: "#484848", containerStyle: { marginTop: "15px" } })),
      route: item.route && item.route,
      leftIcon: item.leftIcon,
      rightIcon: getRightIconItems(item, history),
      tenantId: item.tenantId,
      initiallyOpen: item.initiallyOpen,
      nestedItems: item && item.nestedItems && item.nestedItems.map(function (nestedItem) {
        return {
          primaryText: nestedItem.leftIcon ? _react2.default.createElement(
            "div",
            { style: { alignItems: "center", display: "flex" } },
            nestedItem.leftIcon,
            _react2.default.createElement(_translationNode2.default, { label: nestedItem.primaryText, fontSize: "14px", color: "#484848", containerStyle: { marginLeft: "8px" } })
          ) : nestedItem.primaryText,
          secondaryText: nestedItem.secondaryText,
          route: nestedItem.route,
          rightIcon: getRightIconItems(nestedItem, history)
        };
      })
    };
  });
};

var AssessmentList = function AssessmentList(_ref) {
  var items = _ref.items,
      history = _ref.history,
      onItemClick = _ref.onItemClick,
      button = _ref.button,
      innerDivStyle = _ref.innerDivStyle,
      listItemStyle = _ref.listItemStyle,
      noAssessmentMessage = _ref.noAssessmentMessage,
      yearDialogue = _ref.yearDialogue,
      closeDialogue = _ref.closeDialogue,
      onNewPropertyButtonClick = _ref.onNewPropertyButtonClick,
      hoverColor = _ref.hoverColor;

  return items && items.length == 0 ? _react2.default.createElement(_BlankAssessment2.default, {
    noAssessmentMessage: noAssessmentMessage,
    button: button,
    dialogueOpen: yearDialogue,
    closeDialogue: closeDialogue,
    onButtonClick: onNewPropertyButtonClick,
    history: history
  }) : _react2.default.createElement(_PTList2.default, {
    items: getListItems(items, history),
    history: history,
    onItemClick: onItemClick,
    innerDivStyle: innerDivStyle,
    listItemStyle: listItemStyle,
    hoverColor: hoverColor
  });
};

exports.default = AssessmentList;