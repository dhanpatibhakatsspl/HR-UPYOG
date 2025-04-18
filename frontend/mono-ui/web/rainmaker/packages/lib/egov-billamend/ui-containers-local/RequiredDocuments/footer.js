"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

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

// const startApplyFlow = (state, dispatch) => {
//   dispatch(prepareFinalObject("FireNOCs", []));
//   const applyUrl =
//     process.env.REACT_APP_SELF_RUNNING === "true" ? `/egov-ui-framework/fire-noc/apply` : `/fire-noc/apply`;
//   dispatch(setRoute(applyUrl));
// };
var footer = exports.footer = function footer(startApplyFlow, moduleName) {
  return {
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
            labelKey: (0, _commons.getTransformedLocale)(moduleName + "_COMMON_BUTTON_PRINT")
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
            labelKey: (0, _commons.getTransformedLocale)(moduleName + "_COMMON_BUTTON_APPLY")
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
};