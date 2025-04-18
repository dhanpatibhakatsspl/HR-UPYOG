"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicationSuccessFooter = exports.gotoHomeFooter = exports.getRedirectionURL = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _receiptPdf = require("../../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("CITIZEN") ? "/property-tax" : "/pt-mutation/propertySearch";
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
        // minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      //downloadReceiptButtonLabel: getLabel
      goToHomeButtonLabel: (0, _utils.getLabel)({
        labelName: "GO TO HOME",
        labelKey: "PT_MUTATION_HOME"
      })
    },
    // Check this onClickDefinition later again
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  }
});

//Function for application success(show those 3 buttons )
var applicationSuccessFooter = exports.applicationSuccessFooter = function applicationSuccessFooter(state, dispatch, applicationNumber, tenant) {
  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        className: "pt-apply-wizard-footer1",
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px"
        }
      },
      children: {
        //downloadReceiptButtonLabel: getLabel
        goToHomeButtonLabel: (0, _utils.getLabel)({
          labelName: "GO TO HOME",
          labelKey: "PT_MUTATION_HOME"
        })
      },
      // Check this onClickDefinition later again
      onClickDefination: {
        action: "page_change",
        path: "" + getRedirectionURL()
      }

    },
    downloadFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadFormButtonLabel: (0, _utils.getLabel)({
          labelName: "ACKNOWLEDGEMENT FORM",
          labelKey: "PT_MUTATION_ACKNOWLEDGEMENT_FORM"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack() {
          (0, _receiptPdf2.default)(state, dispatch, "application_download");
        }
      },
      visible: false
    }
  });
};