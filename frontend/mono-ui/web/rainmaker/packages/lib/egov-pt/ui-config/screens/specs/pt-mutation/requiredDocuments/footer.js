"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.startMutationApplyFlow = exports.startApplyFlow = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

require("./index.css");

var printDiv = function printDiv() {
  var content = document.getElementById("documents-div").innerHTML;
  var printWindow = window.open("", "");

  printWindow.document.write("<html><body>" + content + "</body></html>");

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

var startApplyFlow = exports.startApplyFlow = function startApplyFlow(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("ptmDocumentsUploadRedux", {}));
  var applyUrl = "/property-tax/assessment-form";
  dispatch((0, _actions.setRoute)(applyUrl));
};

var startMutationApplyFlow = exports.startMutationApplyFlow = function startMutationApplyFlow(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("ptmDocumentsUploadRedux", {}));
  dispatch((0, _actions2.prepareFinalObject)("Property", {}));
  var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
  var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
  var applyUrl = "/pt-mutation/apply?consumerCode=" + consumerCode + "&tenantId=" + tenantId;
  dispatch((0, _actions.setRoute)(applyUrl));
};

var footer = exports.footer = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  props: {
    className: "apply-wizard-footerReq"

    // style: {
    //   width: "93%",
    //   textAlign: "center",
    //   bottom: 52,
    //   left:48
    // }
  },

  // props: {
  //   className: "apply-wizard-footer",
  //   style: {
  //     textAlign: "center"
  //   }
  // },
  children: {
    printButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        printButtonLabel: (0, _utils.getLabel)({
          labelName: "Print",
          labelKey: "PT_COMMON_BUTTON_PRINT"
        })
      },
      visible: true,
      onClickDefination: {
        action: "condition",
        callBack: printDiv
      }
    },
    applyButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        applyButtonLabel: (0, _utils.getLabel)({
          labelName: "Apply",
          labelKey: "PT_COMMON_BUTTON_APPLY"
        })
      },
      visible: true,
      onClickDefination: {
        action: "condition",
        callBack: startApplyFlow
        //Add onClickDefinition:
      } }
  }
};