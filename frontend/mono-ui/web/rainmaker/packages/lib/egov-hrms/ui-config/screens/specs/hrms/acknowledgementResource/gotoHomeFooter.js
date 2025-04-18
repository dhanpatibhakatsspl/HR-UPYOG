"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gotoInboxFooter = exports.gotoHomeFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

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

var gotoSearchPage = function gotoSearchPage(state, dispatch) {
  var searchUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/search" : "/hrms/search";
  dispatch((0, _actions.setRoute)(searchUrl));
};

var gotoHomeFooter = exports.gotoHomeFooter = function gotoHomeFooter() {
  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "contained",
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
          labelKey: "TL_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: gotoSearchPage
      }
    }
  });
};

var gotoInboxFooter = exports.gotoInboxFooter = function gotoInboxFooter() {
  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "contained",
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
          labelKey: "TL_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          dispatch((0, _actions.setRoute)('/inbox'));
        }
      }
    }
  });
};