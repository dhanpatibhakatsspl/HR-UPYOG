"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentSuccessFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _receiptPdf = require("../../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

var _utils2 = require("../../utils");

var _footer = require("../applyResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "pay-success-footer"
    },
    children: children
  };
};

var paymentSuccessFooter = exports.paymentSuccessFooter = function paymentSuccessFooter(state, dispatch, status, applicationNumber) {
  var roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");
  // const redirectionURL = roleExists ? "/tradelicense-citizen/home" : "/inbox";
  /* Mseva 2.0 changes */
  var redirectionURL = roleExists ? "/" : "/inbox";

  /** MenuButton data based on status */
  var downloadMenu = [];
  var printMenu = [];
  var tlCertificateDownloadObject = {
    label: { labelName: "TL Certificate", labelKey: "BPA_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  var tlCertificatePrintObject = {
    label: { labelName: "TL Certificate", labelKey: "BPA_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "BPA_RECEIPT" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "BPA_RECEIPT" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "BPA_APPLICATION" },
    link: function link() {
      (0, _footer.generatePdfFromDiv)("download", applicationNumber);
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "BPA_APPLICATION" },
    link: function link() {
      (0, _footer.generatePdfFromDiv)("print", applicationNumber);
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [tlCertificateDownloadObject, receiptDownloadObject];
      printMenu = [tlCertificatePrintObject, receiptPrintObject];
      break;
    case "APPLIED":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject, tlCertificateDownloadObject];
      printMenu = [applicationPrintObject, tlCertificatePrintObject];
      break;
    // case "PENDINGPAYMENT":
    //   downloadMenu = [applicationDownloadObject];
    //   printMenu = [applicationPrintObject];
    //   break;
    // case "pending_approval":
    //   downloadMenu = [receiptDownloadObject, applicationDownloadObject];
    //   printMenu = [receiptPrintObject, applicationPrintObject];
    //   break;
    case "cancelled":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "rejected":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return getCommonApplyFooter({
    container: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        leftdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: { textAlign: "left", display: "flex" }
          },
          children: {
            downloadMenu: {
              uiFramework: "custom-atoms-local",
              moduleName: "egov-tradelicence",
              componentPath: "MenuButton",
              props: {
                data: {
                  label: "Download",
                  leftIcon: "cloud_download",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: downloadMenu
                }
              }
            },
            printMenu: {
              uiFramework: "custom-atoms-local",
              moduleName: "egov-tradelicence",
              componentPath: "MenuButton",
              props: {
                data: {
                  label: "Print",
                  leftIcon: "print",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: printMenu
                }
              }
            }
          },
          gridDefination: {
            xs: 12,
            sm: 4
          }
        },
        rightdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
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
                path: redirectionURL
              }
              // downloadReceiptButton: {
              //   componentPath: "Button",
              //   props: {
              //     variant: "outlined",
              //     color: "primary",
              //     style: {
              //       minWidth: "200px",
              //       height: "48px",
              //       marginRight: "16px"
              //     }
              //   },
              //   children: {
              //     downloadReceiptButtonLabel: getLabel({
              //       labelName: "DOWNLOAD RECEIPT",
              //       labelKey: "TL_CONFIRMATION_BUTTON_DOWN_REPT"
              //     })
              //   },
              //   onClickDefination: {
              //     action: "condition",
              //     callBack: (state, dispatch) => {
              //       generateReceipt(state, dispatch, "receipt_download");
              //     }
              //   }
              // },
              // printReceiptButton: {
              //   componentPath: "Button",
              //   props: {
              //     variant: "contained",
              //     color: "primary",
              //     style: {
              //       minWidth: "200px",
              //       height: "48px",
              //       marginRight: "40px"
              //     }
              //   },
              //   children: {
              //     printReceiptButtonLabel: getLabel({
              //       labelName: "PRINT RECEIPT",
              //       labelKey: "TL_CONFIRMATION_BUTTON_PRT_REPT"
              //     })
              //   },
              //   onClickDefination: {
              //     action: "condition",
              //     callBack: (state, dispatch) => {
              //       generateReceipt(state, dispatch, "receipt_print");
              //     }
              //   }
              // }
            } },
          gridDefination: {
            xs: 12,
            sm: 8
          }
        }
      }
    }
  });

  // return getCommonApplyFooter({
  //   gotoHome: {
  //     componentPath: "Button",
  //     props: {
  //       variant: "outlined",
  //       color: "primary",
  //       style: {
  //         minWidth: "200px",
  //         height: "48px",
  //         marginRight: "16px"
  //       }
  //     },
  //     children: {
  //       downloadReceiptButtonLabel: getLabel({
  //         labelName: "GO TO HOME",
  //         labelKey: "TL_COMMON_BUTTON_HOME"
  //       })
  //     },
  //     onClickDefination: {
  //       action: "page_change",
  //       path: redirectionURL
  //     }
  //   },
  //   downloadReceiptButton: {
  //     componentPath: "Button",
  //     props: {
  //       variant: "outlined",
  //       color: "primary",
  //       style: {
  //         minWidth: "200px",
  //         height: "48px",
  //         marginRight: "16px"
  //       }
  //     },
  //     children: {
  //       downloadReceiptButtonLabel: getLabel({
  //         labelName: "DOWNLOAD RECEIPT",
  //         labelKey: "TL_CONFIRMATION_BUTTON_DOWN_REPT"
  //       })
  //     },
  //     onClickDefination: {
  //       action: "condition",
  //       callBack: (state, dispatch) => {
  //         generateReceipt(state, dispatch, "receipt_download");
  //       }
  //     }
  //   },
  //   printReceiptButton: {
  //     componentPath: "Button",
  //     props: {
  //       variant: "contained",
  //       color: "primary",
  //       style: {
  //         minWidth: "200px",
  //         height: "48px",
  //         marginRight: "40px"
  //       }
  //     },
  //     children: {
  //       printReceiptButtonLabel: getLabel({
  //         labelName: "PRINT RECEIPT",
  //         labelKey: "TL_CONFIRMATION_BUTTON_PRT_REPT"
  //       })
  //     },
  //     onClickDefination: {
  //       action: "condition",
  //       callBack: (state, dispatch) => {
  //         generateReceipt(state, dispatch, "receipt_print");
  //       }
  //     }
  //   }
  // });
};