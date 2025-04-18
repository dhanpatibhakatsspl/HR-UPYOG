"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _paymentMethods = require("./payment-methods");

var capturePaymentDetails = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({ labelName: "Capture Payment" }, {
    style: {
      marginBottom: "8px"
    }
  }),
  tabSection: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bpa",
    componentPath: "CustomTabContainer",
    props: {
      // horizontal: {
      //   tabsGrid: { xs: 4, sm: 2, md: 2 },
      //   contentGrid: { xs: 8, sm: 10, md: 10 }
      // },
      tabs: [{
        tabButton: "CASH",
        tabIcon: "APPLICATION DETAILS",
        tabContent: { cash: _paymentMethods.cash }
      }, {
        tabButton: "CHEQUE",
        tabIcon: "DOCUMENT DETAIL",
        tabContent: { cheque: _paymentMethods.cheque }
      }, {
        tabButton: "DD",
        tabIcon: "UPDATE NOC DETAILS",
        tabContent: { demandDraft: _paymentMethods.demandDraft }
      }]
    },
    type: "array"
  }
});

exports.default = capturePaymentDetails;