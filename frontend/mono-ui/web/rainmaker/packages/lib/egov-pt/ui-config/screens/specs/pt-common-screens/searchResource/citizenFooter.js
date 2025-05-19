"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.citizenFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "pt-apply-wizard-footer"
    },
    children: children
  };
};

var citizenFooter = exports.citizenFooter = getCommonApplyFooter({
  makePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "MAKE PAYMENT",
        labelKey: "NOC_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/citizen-pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant : "/fire-noc/citizen-pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant
    },
    roleDefination: {
      rolePath: "user-info.roles",
      action: "PAY"
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
  }
});