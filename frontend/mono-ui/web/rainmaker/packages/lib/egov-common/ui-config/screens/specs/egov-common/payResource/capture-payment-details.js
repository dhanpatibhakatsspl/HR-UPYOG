"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var capturePaymentDetails = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({ labelName: "Capture Payment", labelKey: "NOC_PAYMENT_CAP_PMT" }, {
    style: {
      marginBottom: "8px"
    }
  }),
  tabSection: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-common",
    componentPath: "CustomTabContainer",
    props: {
      // tabs,
      jsonPath: "businessServiceInfo"
    },
    type: "array"
  }
});

exports.default = capturePaymentDetails;