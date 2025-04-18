"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footers = require("../egov-bpa/acknowledgementResource/footers");

var _acknowledgementUtils = require("../egov-bpa/acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _utils2 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Application for Occupancy certificate",
    labelKey: "BPA_COMMON_APPLY_BPA_OC_HEADER_LABEL"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bpa",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
    },
    visible: true
  }
});

var getHeader = function getHeader(applicationNumber) {
  return (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
      labelName: "Application for Occupancy certificate",
      labelKey: "BPA_COMMON_APPLY_BPA_OC_HEADER_LABEL"
    }),
    applicationNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "ApplicationNoContainer",
      props: {
        number: applicationNumber
      },
      visible: true
    }
  });
};

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant) {
  if (purpose === "apply" && status === "success") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "BPA_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to building owner at registered Mobile No.",
              labelKey: "BPA_APPLICATION_SUCCESS_MESSAGE_SUB"
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
      applicationSuccessFooter: (0, _footers.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "apply_skip" && status === "success") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "BPA_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to building owner at registered Mobile No.",
              labelKey: "BPA_APPLICATION_SUCCESS_MESSAGE_SUB"
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
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "SEND_TO_CITIZEN" && status === "success") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Successfully Sent To Citizen",
              labelKey: "BPA_APPLICATION_SENT_TO_CITIZEN_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification has been sent to Architect",
              labelKey: "BPA_APPROVAL_SENT_TO_CITIZEN_SUBHEAD"
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
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "APPROVE" && status === "success") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Approved By Citizen Successfully",
              labelKey: "BPA_APPLICATION_APPROVED_ARCT_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification has been sent to Architect",
              labelKey: "BPA_APPLICATION_APPROVED_ARCT_SUCCESS_BODY_MESSAGE"
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
      gotoHomeFooter: _footers.gotoHomeFooter
      // applicationSuccessFooter: applicationSuccessFooter(
      //   state,
      //   dispatch,
      //   applicationNumber,
      //   tenant
      // )
    };
  } else if (purpose === "SEND_TO_ARCHITECT" && status === "success") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Send To Architect Successfully",
              labelKey: "BPA_APPLICATION_SEND_TO_ARCHITECT_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification has been sent to Architect",
              labelKey: "BPA_APPROVAL_SEND_TO_ARCHITECT_SUBHEAD"
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
      gotoHomeFooter: _footers.gotoHomeFooter
      // applicationSuccessFooter: applicationSuccessFooter(
      //   state,
      //   dispatch,
      //   applicationNumber,
      //   tenant
      // )
    };
  } else if (purpose === "pay" && status === "success") {
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)((0, _defineProperty3.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: "BPA_CONFIRMATION_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Payment Collection has been sent to building owner at registered Mobile No.",
              labelKey: "BPA_PAYMENT_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: "BPA_PMT_RCPT_NO"
            }
          }, "tailText", {
            labelName: "Payment Receipt No.",
            labelKey: "BPA_PMT_RCPT_NO"
          }))
        }
      },
      paymentSuccessFooter: (0, _footers.paymentSuccessFooter)()
    };
  } else if (purpose === "approve" && status === "success") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "BPA Approved Successfully",
              labelKey: "BPA_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding BPA Approval has been sent to building owner at registered Mobile No.",
              labelKey: "BPA_APPROVAL_CHECKLIST_MESSAGE_SUB"
            }
            // tailText: {
            //   labelName: "BPA No.",
            //   labelKey: "BPA_HOME_SEARCH_RESULTS_BPA_NO_LABEL"
            // },
            // number: secondNumber
          })
        }
      },
      approvalSuccessFooter: _footers.approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Application for Occupancy Certificate is rejected",
              labelKey: "BPA_OC_APPROVAL_REJECTED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding BPA Rejection has been sent to building owner at registered Mobile No.",
              labelKey: "BPA_APPROVAL_REJE_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "application" && status === "revocated") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Application for Occupancy Certificate is revocated",
              labelKey: "BPA_APPROVAL_OC_REVOCATED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Building Permit application revocation has been sent to applicant at registered Mobile No.",
              labelKey: "BPA_APPROVAL_REV_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "BPA Cancelled",
              labelKey: "BPA_CANCELLED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding BPA cancellation has been sent to building owner at registered Mobile No.",
              labelKey: "BPA_CANCELLED_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "BPA No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_BPA_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: header,
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
              labelName: "A notification regarding payment failure has been sent to the building owner and applicant.",
              labelKey: "BPA_PAYMENT_FAILURE_MESSAGE_SUB"
            }
          })
        }
      },
      paymentFailureFooter: (0, _footers.paymentFailureFooter)(applicationNumber, tenant)
    };
  } else if (purpose === "mark" && status === "success") {
    return {
      header: header,
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
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if ((purpose === "forward" || purpose === "FORWARD") && status === "success") {
    return {
      header: getHeader(applicationNumber),
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
              labelName: "Application has been forward successfully",
              labelKey: "BPA_APPLICATION_FORWARD_SUCCESSFULLY"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "sendback" && status === "success") {
    return {
      header: getHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application sent back Successfully",
              labelKey: "BPA_SENDBACK_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been sent back successfully",
              labelKey: "BPA_APPLICATION_SENDBACK_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BPA_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "refer" && status === "success") {
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application referred Successfully",
              labelKey: "NOC_REFER_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been referred successfully",
              labelKey: "NOC_APPLICATION_REFER_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
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
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;