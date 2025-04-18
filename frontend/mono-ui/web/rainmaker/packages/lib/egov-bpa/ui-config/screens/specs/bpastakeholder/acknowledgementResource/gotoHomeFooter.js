"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gotoHomeFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var getRedirectionURL = function getRedirectionURL() {
  /* Mseva 2.0 changes */
  var redirectionURL = (0, _utils2.ifUserRoleExists)("CITIZEN") ? // ? "/tradelicense-citizen/home"
  "/" : "/inbox";
  return redirectionURL;
};

var gotoHomeFooter = exports.gotoHomeFooter = getCommonApplyFooter({
  gotoHome: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "GO TO HOME",
        labelKey: "BPA_HOME_BUTTON"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  }
});