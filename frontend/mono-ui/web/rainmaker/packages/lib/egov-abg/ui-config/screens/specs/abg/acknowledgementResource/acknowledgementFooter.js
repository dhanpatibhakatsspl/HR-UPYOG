"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acknowledgementFailureFooter = exports.acknowledgementSuccesFooter = exports.getRedirectionURL = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _receiptPdf = require("../../utils/receiptPdf");

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
var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("EMPLOYEE") ? "/abg/groupBills" : "/inbox";

  return redirectionURL;
};
var acknowledgementSuccesFooter = exports.acknowledgementSuccesFooter = getCommonApplyFooter({
  goToHomeButton: {
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
        labelName: "Go To Home",
        labelKey: "ABG_GO_TO_HOME_BUTTON"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  },

  viewReceiptButton: {
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
        labelName: "VIEW RECEIPT",
        labelKey: "ABG_VIEW_RECEIPT_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        viewReceipt(state, dispatch);
      }
    }
  }
});
var acknowledgementFailureFooter = exports.acknowledgementFailureFooter = getCommonApplyFooter({
  nextButton: {
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
        labelName: "Go To Home",
        labelKey: "ABG_GO_TO_HOME_BUTTON"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  }
});

var viewReceipt = function viewReceipt(state, dispatch) {
  (0, _receiptPdf.generateBill)(state, dispatch);
};