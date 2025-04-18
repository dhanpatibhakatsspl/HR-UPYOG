"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gotoHomeFooter = exports.getRedirectionURL = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

require("./index.css");

var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = "/inbox";
  return redirectionURL;
};

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
//Function for go to home button
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
      goToHomeButtonLabel: (0, _utils.getLabel)({
        labelName: "GO TO HOME",
        labelKey: "COMMON_BUTTON_HOME"
      })
    },
    // Check this onClickDefinition later again
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  }
});