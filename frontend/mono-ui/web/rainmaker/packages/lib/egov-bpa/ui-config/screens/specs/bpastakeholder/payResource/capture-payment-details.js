"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _paymentMethods = require("./payment-methods");

var capturePaymentDetails = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({ labelName: "Capture Payment", labelKey: "TL_PAYMENT_CAP_PMT" }, {
    style: {
      marginBottom: "8px"
    }
  }),
  tabSection: {
    uiFramework: "custom-containers",
    moduleName: "egov-tradelicence",
    componentPath: "CustomTabContainer",
    props: {
      tabs: [{
        tabButton: { labelName: "CASH", labelKey: "TL_PAYMENT_CASH" },
        tabIcon: "Dashboard",
        tabContent: { cash: _paymentMethods.cash }
      }, {
        tabButton: { labelName: "CHEQUE", labelKey: "TL_PAYMENT_CHQ" },
        tabIcon: "Schedule",
        tabContent: { cheque: _paymentMethods.cheque }
      }, {
        tabButton: { labelName: "DD", labelKey: "TL_PAYMENT_DD" },
        tabIcon: "Schedule",
        tabContent: { demandDraft: _paymentMethods.demandDraft }
      }, {
        tabButton: {
          labelName: "Credit/Debit Card",
          labelKey: "TL_PAYMENT_DEBT_CARD"
        },
        tabIcon: "Schedule",
        tabContent: { card: _paymentMethods.card }
      }]
    },
    type: "array"
  }
});

exports.default = capturePaymentDetails;