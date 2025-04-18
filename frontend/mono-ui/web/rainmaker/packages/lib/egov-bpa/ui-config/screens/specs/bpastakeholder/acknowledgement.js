"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _applicationSuccessFooter = require("./acknowledgementResource/applicationSuccessFooter");

var _paymentSuccessFooter = require("./acknowledgementResource/paymentSuccessFooter");

var _approvalSuccessFooter = require("./acknowledgementResource/approvalSuccessFooter");

var _gotoHomeFooter = require("./acknowledgementResource/gotoHomeFooter");

var _paymentFailureFooter = require("./acknowledgementResource/paymentFailureFooter");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _receiptTransformer = require("../utils/receiptTransformer");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, financialYear, tenant) {
  var financialYearText = financialYear ? financialYear : "";
  if (purpose === "apply" && status === "success") {
    var openlink = false;
    if (window.location.pathname.includes("openlink")) {
      openlink = true;
    }
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for New Stakeholder Registration",
        labelKey: "BPA_COMMON_APPLICATION_NEW_LICENSE"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          // style: {
          //   position: "absolute",
          //   width: "95%"
          // }
        },
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "BPA_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: openlink ? "User credentials and Login URL have been sent to your registered mobile number.Please login and make payment from my applications under building plan menu for this application to get registered as Stakeholder" : "Application details have been sent to your registered mobile number.",
              labelKey: openlink ? "BPA_CONFIRMATION_MESSAGE_OPENLINK" : "BPA_CONFIRMATION_MESSAGE_AUTH"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "pay" && status === "success") {
    (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenant);
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Stakeholder Registration Application",
          labelKey: "BPA_REG_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: "BPAREG_CONFIRMATION_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Payment Collection has been sent to trade owner at registered Mobile No.",
              labelKey: "BPAREG_CONFIRMATION_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: "BPAREG_PMT_RCPT_NO"
            },
            number: secondNumber
          })
        }
      },
      paymentSuccessFooter: (0, _paymentSuccessFooter.paymentSuccessFooter)(state, dispatch, "APPROVED", applicationNumber)
    };
  } else if (purpose === "approve" && status === "success") {
    (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenant);
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Stakeholder Registration Application",
          labelKey: "BPA_REG_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Approved Successfully",
              labelKey: "BPA_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding application approval has been sent to applicant at registered Mobile No.",
              labelKey: "BPA_APPROVAL_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "License No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter: _approvalSuccessFooter.approvalSuccessFooter
    };
  } else if (purpose === "sendback" && status === "success") {
    (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenant);
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Stakeholder Registration Application",
          labelKey: "BPA_REG_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is sent back Successfully",
              labelKey: "BPA_SENDBACK_CHECKLIST_MESSAGE_HEAD"
            },
            // body: {
            //   labelName:
            //     "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
            //   labelKey: "TL_SENDBACK_CHECKLIST_MESSAGE_SUB"
            // },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter: _approvalSuccessFooter.approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Stakeholder Registration Application",
          labelKey: "BPA_REG_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Stakeholder Registration Application Rejected",
              labelKey: "BPA_APPROVAL_REJ_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Stakeholder Registration Application Rejection has been sent to applicant at registered Mobile No.",
              labelKey: "BPA_APPROVAL_REJ_MESSAGE_SUBHEAD"
            }
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Stakeholder Registration Application",
          labelKey: "BPA_REG_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Trade License Cancelled",
              labelKey: "BPA_TL_CANCELLED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
              labelKey: "BPA_TL_CANCELLED_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Stakeholder Registration Application",
          labelKey: "BPA_REG_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Payment has failed!",
              labelKey: "BPA_PAYMENT_FAILED"
            },
            body: {
              labelName: "A notification regarding payment failure has been sent to the trade owner and applicant.",
              labelKey: "BPA_PAYMENT_NOTIFICATION"
            }
          })
        }
      },
      paymentFailureFooter: (0, _paymentFailureFooter.paymentFailureFooter)(applicationNumber, tenant)
    };
  } else if (purpose === "mark" && status === "success") {
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "Stakeholder Registration Application",
        labelKey: "BPA_REG_APPLICATION"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Marked Successfully",
              labelKey: "BPA_MARK_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: "BPA_APPLICATION_MARKED_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose === "forward" && status === "success") {
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "Stakeholder Registration Application",
        labelKey: "BPA_REG_APPLICATION"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Forwarded Successfully",
              labelKey: "BPA_FORWARD_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding above application status has been sent to applicant at registered Mobile No.",
              labelKey: "BPA_APPLICATION_FORWARD_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  }
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var purpose = (0, _commons.getQueryArg)(window.location.href, "purpose");
    var status = (0, _commons.getQueryArg)(window.location.href, "status");
    var financialYear = (0, _commons.getQueryArg)(window.location.href, "FY");
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, financialYear, tenant);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    if (window.location.pathname.includes("openlink")) {
      (0, _set2.default)(action.screenConfig, "components.div.children.applicationSuccessFooter.props.style", { width: "100vw" });
    }
    return action;
  }
};

exports.default = screenConfig;