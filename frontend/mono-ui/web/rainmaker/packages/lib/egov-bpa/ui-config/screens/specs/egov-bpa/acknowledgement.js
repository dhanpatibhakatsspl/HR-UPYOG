"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footers = require("./acknowledgementResource/footers");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../utils");

var _commons2 = require("../../../../ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Payment Information (" + (0, _utils2.getCurrentFinancialYear)() + ")", //later use getFinancialYearDates
    labelKey: "COMMON_PAY_SCREEN_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bpa",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "consumerCode")
    },
    visible: true
  }
});

var getHeader = function getHeader(applicationNumber) {
  return (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
      labelName: "Application for BPA (" + (0, _utils2.getCurrentFinancialYear)() + ")", //later use getFinancialYearDates
      labelKey: "BPA_COMMON_APPLY_BPA_HEADER_LABEL"
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

var getNOCHeader = function getNOCHeader(applicationNumber) {
  return (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
      labelName: "Application for Noc",
      labelKey: "NOC_COMMON_HEADER_LABEL"
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

var downloadprintMenu = function downloadprintMenu(action, state, dispatch, applicationNumber, tenantId, uiCommonPayConfig, businessService) {
  var receiptKey = (0, _get2.default)(uiCommonPayConfig, "receiptKey", "consolidatedreceipt");
  var keyLabel = "BPA_PERMIT_ORDER";
  if (window.location.href.includes("BPA.NC_OC_SAN_FEE")) {
    keyLabel = "BPA_OC_PERMIT_ORDER";
  }
  var receiptDownloadObject = {
    label: { labelName: "DOWNLOAD RECEIPT", labelKey: "COMMON_DOWNLOAD_RECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "receiptNumbers", value: applicationNumber }, { key: "tenantId", value: tenantId }];
      (0, _commons2.download)(receiptQueryString, "download", receiptKey, state, businessService);
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Permit Order Receipt", labelKey: keyLabel },
    link: function link() {
      (0, _utils2.permitOrderNoDownload)(action, state, dispatch, "Download");
      // generatePdf(state, dispatch, "application_download");
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Permit Order Receipt", labelKey: keyLabel },
    link: function link() {
      (0, _utils2.permitOrderNoDownload)(action, state, dispatch, "Print");
      // generatePdf(state, dispatch, "application_download");
    },
    leftIcon: "assignment"
  };
  var receiptPrintObject = {
    label: { labelName: "PRINT RECEIPT", labelKey: "COMMON_PRINT_RECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "receiptNumbers", value: applicationNumber }, { key: "tenantId", value: tenantId }];
      (0, _commons2.download)(receiptQueryString, "print", receiptKey, state, businessService);
    },
    leftIcon: "receipt"
  };
  var downloadMenu = [];
  var printMenu = [];
  switch (businessService) {
    case "BPA.LOW_RISK_PERMIT_FEE":
    case "BPA.NC_SAN_FEE":
    case "BPA.NC_OC_SAN_FEE":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    default:
      downloadMenu = [receiptDownloadObject];
      printMenu = [receiptPrintObject];
      break;
  }

  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "downloadprint-commonmenu",
      style: { textAlign: "right", display: "flex" }
    },
    children: {
      downloadMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
            leftIcon: "cloud_download",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className: "tl-download-button" },
            menu: downloadMenu
          }
        }
      },
      printMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "PRINT", labelKey: "TL_PRINT" },
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
            menu: printMenu
          }
        }
      }

    }
  };
};

var getAcknowledgementCard = function getAcknowledgementCard(action, state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, businessService, moduleName) {
  var uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
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
      // applicationSuccessFooter: applicationSuccessFooter(
      //   state,
      //   dispatch,
      //   applicationNumber,
      //   tenant
      // )
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
      // applicationSuccessFooter: applicationSuccessFooter(
      //   state,
      //   dispatch,
      //   applicationNumber,
      //   tenant
      // )
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "pay" && status === "success") {
    return {
      header: header,
      headerdownloadprint: downloadprintMenu(action, state, dispatch, secondNumber, tenant, uiCommonPayConfig, businessService),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)((0, _defineProperty3.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: "CITIZEN_SUCCESS_BPA_NC_APP_FEE_PAYMENT_MESSAGE"
            },
            body: {
              labelName: "A notification regarding Payment Collection has been sent to building owner at registered Mobile No.",
              labelKey: "CITIZEN_SUCCESS_BPA_NC_APP_FEE_PAYMENT_MESSAGE_DETAIL"
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: "CITIZEN_SUCCESS_BPA_NC_APP_FEE_PAYMENT_RECEIPT_NO"
            },
            number: secondNumber
          }, "tailText", {
            labelName: "Payment Receipt No.",
            labelKey: "CITIZEN_SUCCESS_BPA_NC_APP_FEE_PAYMENT_RECEIPT_NO"
          }))
        }
      },
      paymentSuccessFooter: (0, _footers.paymentSuccessFooter)()
    };
  } else if (purpose === "approve" && status === "success" && moduleName !== "Noc") {
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
  } else if (purpose === "approve" && status === "success" && moduleName === "Noc") {
    return {
      header: getNOCHeader(applicationNumber),
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
          })
        }
      },
      approvalSuccessFooter: _footers.approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected" && moduleName === "Noc") {
    return {
      header: getNOCHeader(applicationNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Application for NOC is rejected",
              labelKey: "NOC_BPA_APPROVAL_REJECTED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding BPA Rejection has been sent to building owner at registered Mobile No.",
              labelKey: "NOC_BPA_APPROVAL_REJE_MESSAGE_SUBHEAD"
            }
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "application" && status === "rejected" && moduleName !== "Noc") {
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
              labelName: "Application for permit order is rejected",
              labelKey: "BPA_APPROVAL_REJECTED_MESSAGE_HEAD"
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
              labelName: "Application for permit order is revocated",
              labelKey: "BPA_APPROVAL_REVOCATED_MESSAGE_HEAD"
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

var getBpaDetails = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, applicationNumber, tenantId) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _commons2.getAppSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNo", value: applicationNumber }]);

          case 2:
            response = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("BPA", response.BPA[0]));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getBpaDetails(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
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
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "consumerCode") || (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "receiptNumber");
    var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
    var moduleName = (0, _commons.getQueryArg)(window.location.href, "moduleName");
    if (purpose && purpose === "pay") {
      getBpaDetails(action, state, dispatch, applicationNumber, tenant);
    }
    var data = getAcknowledgementCard(action, state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, businessService, moduleName);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;