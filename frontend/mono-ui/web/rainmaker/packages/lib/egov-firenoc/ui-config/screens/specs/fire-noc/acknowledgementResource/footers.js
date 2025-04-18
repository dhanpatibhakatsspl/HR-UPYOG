"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentSuccessFooter = exports.paymentFailureFooter = exports.approvalSuccessFooter = exports.applicationSuccessFooter = exports.gotoHomeFooter = exports.getRedirectionURL = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _receiptPdf = require("../../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("CITIZEN") ? "/fire-noc/home" : "/inbox";
  return redirectionURL;
};

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
        labelKey: "NOC_COMMON_BUTTON_HOME"
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
        className: "apply-wizard-footer1",
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
          labelKey: "NOC_COMMON_BUTTON_HOME"
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
          //  minWidth: "290px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadFormButtonLabel: (0, _utils.getLabel)({
          labelName: "DOWNLOAD CONFIRMATION FORM",
          labelKey: "NOC_APPLICATION_BUTTON_DOWN_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack() {
          (0, _receiptPdf2.default)(state, dispatch, "application_download");
        }
      },
      visible: false
    },
    printFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          //   minWidth: "170px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        printFormButtonLabel: (0, _utils.getLabel)({
          labelName: "PRINT CONFIRMATION FORM",
          labelKey: "NOC_APPLICATION_BUTTON_PRINT_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack() {
          (0, _receiptPdf2.default)(state, dispatch, "application_print");
        }
      },
      visible: false
    },
    proceedToPaymentButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          //  minWidth: "170px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        proceedToPaymentButtonLabel: (0, _utils.getLabel)({
          labelName: "Proceed to payment",
          labelKey: "NOC_PROCEED_PAYMENT"
        })
      },
      //Add onClickDefination and RoleDefination later
      onClickDefination: {
        action: "page_change",
        path: "/egov-common/pay?consumerCode=" + applicationNumber + "&tenantId=" + tenant + "&businessService=FIRENOC"
        // process.env.REACT_APP_SELF_RUNNING === "true"
        //   ? `/egov-ui-framework/fire-noc/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=FIRENOC`
        //   : `/fire-noc/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=FIRENOC`
      },
      roleDefination: {
        rolePath: "user-info.roles",
        action: "PAY",
        roles: ["NOC_CEMP", "SUPERUSER"]
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
    },
    makePayment: {
      componentPath: "Button",
      props: {
        className: "apply-wizard-footer1",
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px"

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
        path: "/egov-common/pay?consumerCode=" + applicationNumber + "&tenantId=" + tenant + "&businessService=FIRENOC"
        // process.env.REACT_APP_SELF_RUNNING === "true"
        //   ? `fire-noc/citizen-pay?applicationNumber=${applicationNumber}&tenantId=${tenant}`
        //   : `/fire-noc/citizen-pay?applicationNumber=${applicationNumber}&tenantId=${tenant}`
      },
      roleDefination: {
        rolePath: "user-info.roles",
        roles: ["CITIZEN"],
        action: "PAY"
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
    }
  });
};

//Function for approval footer buttons
var approvalSuccessFooter = exports.approvalSuccessFooter = getCommonApplyFooter({
  //Call gotoHome
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
        labelKey: "NOC_COMMON_BUTTON_HOME"
      })
    },
    // Check this onClickDefinition later again
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
    // downloadLicenseButton: {
    //   componentPath: "Button",
    //   props: {
    //     variant: "outlined",
    //     color: "primary",
    //     style: {
    //       width: "250px",
    //       height: "48px",
    //       marginRight: "16px"
    //     }
    //   },
    //   children: {
    //     downloadLicenseButtonLabel: getLabel({
    //       labelName: "DOWNLOAD FIRE-NOC",
    //       labelKey: "NOC_APPROVAL_CHECKLIST_BUTTON_DOWN_LIC"
    //     })
    //   },
    //   onClickDefination: {
    //     action: "condition",
    //     callBack: (state, dispatch) => {
    //       generatePdf(state, dispatch, "certificate_download");
    //     }
    //   }
    // },
    // printNOCButton: {
    //   componentPath: "Button",
    //   props: {
    //     variant: "contained",
    //     color: "primary",
    //     style: {
    //       width: "250px",
    //       height: "48px",
    //       marginRight: "40px"
    //     }
    //   },
    //   children: {
    //     printLicenseButtonLabel: getLabel({
    //       labelName: "PRINT FIRE-NOC",
    //       labelKey: "NOC_APPROVAL_CHECKLIST_PRINT_LIC"
    //     })
    //   },
    //   onClickDefination: {
    //     action: "condition",
    //     callBack: (state, dispatch) => {
    //       generatePdf(state, dispatch, "certificate_print");
    //     }
    //   }
    // }
  } });

//Function for payment failure(retry button)
var paymentFailureFooter = exports.paymentFailureFooter = function paymentFailureFooter(applicationNumber, tenant) {
  return getCommonApplyFooter({
    //Call gotoHome
    retryPayment: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          //  minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "RETRY",
          labelKey: "NOC_PAYMENT_RETRY"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: "/fire-noc/citizen-pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant
      }
    }
  });
};

//Function for payment success(Show buttons for download and print receipts)
var paymentSuccessFooter = exports.paymentSuccessFooter = function paymentSuccessFooter() {
  return getCommonApplyFooter({
    //call gotoHome
    downloadReceiptButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          //   minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "DOWNLOAD RECEIPT",
          labelKey: "NOC_CONFIRMATION_BUTTON_DOWNLOAD_RECEIPT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          (0, _receiptPdf2.default)(state, dispatch, "receipt_download");
        }
      }
    },
    printReceiptButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          //   minWidth: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        printReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "PRINT RECEIPT",
          labelKey: "NOC_CONFIRMATION_BUTTON_PRINT_RECEIPT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          (0, _receiptPdf2.default)(state, dispatch, "receipt_print");
        }
      }
    },
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          //    minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        goToHomeButtonLabel: (0, _utils.getLabel)({
          labelName: "GO TO HOME",
          labelKey: "NOC_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/search" : "/"
      },
      visible: false
    }
  });
};

//Write a function using map to return buttons