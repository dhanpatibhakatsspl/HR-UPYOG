"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadPrintContainer = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _commons2 = require("../../../../ui-utils/commons");

var _generateWSAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generateWSAcknowledgement");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _apply = require("./apply");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerLabel = "WS_APPLICATION_NEW_CONNECTION_HEADER";
var applicationNo = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
if ((0, _commons2.isModifyMode)()) {
  if (applicationNo.includes("WS")) {
    headerLabel = "WS_APPLICATION_MODIFY_CONNECTION_HEADER";
  } else {
    headerLabel = "SW_APPLICATION_MODIFY_CONNECTION_HEADER";
  }
}

var headerrow = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelKey: headerLabel
  })
});

var commonHeader = function commonHeader(state, dispatch, applicationNumber, tenant) {
  return (0, _utils.getCommonContainer)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header1: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 8
          }
        }, headerrow),
        helpSection: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          props: {
            color: "primary",
            style: { justifyContent: "flex-end" //, dsplay: "block"
            } },
          gridDefination: {
            xs: 12,
            sm: 4,
            align: "right"
          },
          children: {
            DownloadAndPrint: (0, _applicationSuccessFooter.DownloadAndPrint)(state, dispatch, applicationNumber, tenant)
          }

        }
      }
    }
  });
};

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, applicationNumberWater, applicationNumberSewerage, secondNumber, tenant, consumerNo) {
  if (purpose === "apply" && status === "success" && applicationNumberWater && applicationNumberSewerage) {
    return {
      commonHeader: commonHeader(state, dispatch, applicationNumber, tenant),
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
              labelName: "Thank you for submitting the Application",
              labelKey: "WS_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: " A notification regarding Application Submission has been sent to trade owner at registered Mobile No. Please note your application No. for future reference ",
              labelKey: "WS_APPLICATION_SUCCESS_ACKO_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Water Application No.",
              labelKey: "WS_ACKNO_APP_NO_LABEL"
            },
            number: applicationNumberWater,
            tailTextOne: {
              labelName: "Sewerage Application No.",
              labelKey: "WS_ACKNO_SEW_APP_NO_LABEL"
            },
            newNumber: applicationNumberSewerage
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "apply" && status === "success") {
    return {
      commonHeader: commonHeader(state, dispatch, applicationNumber, tenant),
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
              labelName: "Thank you for submitting the Application",
              labelKey: "WS_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: " A notification regarding application submission has been sent at registered mobile no. Please note the application no. for future reference. ",
              labelKey: "WS_APPLICATION_SUCCESS_ACKO_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application Number.",
              labelKey: "WS_ACK_COMMON_APP_NO_LABEL"
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
          labelName: "Payment for New Trade License " + financialYearText,
          labelKey: "WS_COMMON_PAYMENT_NEW_LICENSE",
          dynamicArray: [financialYearText]
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-wns",
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
              labelName: "Payment is collected successfully, Now you can dowload and issue Trade License Certificate to citizen",
              labelKey: "WS_CONFIRMATION_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Payment Collection has been sent to trade owner at registered Mobile No.",
              labelKey: "WS_CONFIRMATION_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: "WS_PMT_RCPT_NO"
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
      commonHeader: commonHeader(state, dispatch, applicationNumber, tenant),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is Approved Successfully",
              labelKey: "WS_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Approval connection has been sent to registered Mobile No.",
              labelKey: "WS_APPROVAL_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application Number.",
              labelKey: "WS_ACK_COMMON_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "sendback" && status === "success") {
    (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenant);
    return {
      commonHeader: commonHeader(state, dispatch, applicationNumber, tenant),
      // header: getCommonContainer({
      //   header: getCommonHeader({
      //     labelName: `Application for New Water and Sewerage Connection`,
      //     labelKey: "WS_APPLICATION_NEW_CONNECTION_HEADER"
      //   }),
      //   applicationNumber: {
      //     uiFramework: "custom-atoms-local",
      //     moduleName: "egov-wns",
      //     componentPath: "ApplicationNoContainer",
      //     props: {
      //       number: applicationNumber
      //     }
      //   }
      // }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is sent back Successfully",
              labelKey: "WS_SENDBACK_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding above application status has been sent to registered Mobile No.",
              labelKey: "WS_SENDBACK_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application Number.",
              labelKey: "WS_ACK_COMMON_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      commonHeader: commonHeader(state, dispatch, applicationNumber, tenant),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Application Rejected",
              labelKey: "WS_APPROVAL_REJ_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Application Rejection has been sent to registered Mobile No.",
              labelKey: "WS_APPROVAL_REJ_MESSAGE_SUBHEAD"
            }
          })
        }
      },
      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Trade License Application " + financialYearText,
          labelKey: "TL_TRADE_APPLICATION",
          dynamicArray: [financialYearText]
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-wns",
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
              labelKey: "WS_WS_CANCELLED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_TL_CANCELLED_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      }
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Trade License Application " + financialYearText,
          dynamicArray: [financialYearText],
          labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-wns",
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
              labelKey: "TL_PAYMENT_FAILED"
            },
            body: {
              labelName: "A notification regarding payment failure has been sent to the trade owner and applicant.",
              labelKey: "TL_PAYMENT_NOTIFICATION"
            }
          })
        }
      },
      paymentFailureFooter: (0, _paymentFailureFooter.paymentFailureFooter)(applicationNumber, tenant)
    };
  } else if (purpose === "mark" && status === "success") {
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for Trade License " + financialYearText,
        labelKey: "WS_APPLICATION_TRADE_LICENSE",
        dynamicArray: [financialYearText]
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
              labelKey: "WS_MARK_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: "WS_APPLICATION_MARKED_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "WS_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      }
    };
  } else if (purpose === "forward" && status === "success") {
    return {
      commonHeader: commonHeader(state, dispatch, applicationNumber, tenant),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Forwarded Successfully",
              labelKey: "WS_FORWARD_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding above application status has been sent to registered Mobile No.",
              labelKey: "WS_APPLICATION_FORWARD_SUCCESS_SUBHEAD"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "WS_ACK_COMMON_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "activate" && status === "success") {

    return {
      commonHeader: commonHeader(state, dispatch, applicationNumber, tenant, consumerNo),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Connection Activated Successfully ",
              labelKey: "WS_ACTIVATE_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding above application status has been sent to registered Mobile No.",
              labelKey: "WS_CONNECTION_ACTIVATE_SUCCESS_SUBHEAD"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "WS_ACK_COMMON_APP_NO_LABEL"
            },
            number: applicationNumber,
            tailTextOne: {
              labelName: "Consumer No",
              labelKey: "WS_COMMON_CONSUMER_NO_LABEL"
            },
            newNumber: consumerNo
          })
        }
      },
      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  }
};

var downloadPrintContainer = exports.downloadPrintContainer = function downloadPrintContainer(action, state, dispatch, appStatus, applicationNumber, tenantId) {
  /** MenuButton data based on status */
  var downloadMenu = [];
  var printMenu = [];
  var wsEstimateDownloadObject = {
    label: { labelKey: "WS_ESTIMATION_NOTICE" },
    link: function link() {
      var WaterConnection = state.screenConfiguration.preparedFinalObject.WaterConnection;

      (0, _commons2.downloadApp)(WaterConnection, 'estimateNotice', "download", dispatch);
    },
    leftIcon: "book"
  };
  var wsEstimatePrintObject = {
    label: { labelKey: "WS_ESTIMATION_NOTICE" },
    link: function link() {
      var WaterConnection = state.screenConfiguration.preparedFinalObject.WaterConnection;

      (0, _commons2.downloadApp)(WaterConnection, 'estimateNotice', 'print', dispatch);
    },
    leftIcon: "book"
  };
  var sanctionDownloadObject = {
    label: { labelKey: "WS_SANCTION_LETTER" },
    link: function link() {
      var WaterConnection = state.screenConfiguration.preparedFinalObject.WaterConnection;

      var appUserType = process.env.REACT_APP_NAME === "Citizen" ? "To Citizen" : "Department Use";
      WaterConnection[0].appUserType = appUserType;
      WaterConnection[0].commissionerName = "S.Ravindra Babu";
      (0, _commons2.downloadApp)(WaterConnection, 'sanctionLetter', "download", dispatch);
    },
    leftIcon: "receipt"
  };
  var sanctionPrintObject = {
    label: { labelKey: "WS_SANCTION_LETTER" },
    link: function link() {
      var WaterConnection = state.screenConfiguration.preparedFinalObject.WaterConnection;

      var appUserType = process.env.REACT_APP_NAME === "Citizen" ? "Department Use" : "To Citizen";
      WaterConnection[0].appUserType = appUserType;
      WaterConnection[0].commissionerName = "S.Ravindra Babu";
      (0, _commons2.downloadApp)(WaterConnection, 'sanctionLetter', 'print', dispatch);
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelKey: "WS_APPLICATION" },
    link: function link() {
      var WaterConnection = state.screenConfiguration.preparedFinalObject.WaterConnection;

      var conneType = WaterConnection[0].connectionType;
      if (applicationNumber.includes("WS")) {
        var connType = conneType === null ? "Metered" : conneType;
        (0, _generateWSAcknowledgement.generateWSAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), "application.pdf", "WATER", connType);
      } else {
        (0, _generateWSAcknowledgement.generateWSAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), "application.pdf", "SEWERAGE", conneType);
      }
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "WS_APPLICATION" },
    link: function link() {
      var WaterConnection = state.screenConfiguration.preparedFinalObject.WaterConnection;

      var conneType = WaterConnection[0].connectionType;
      if (applicationNumber.includes("WS")) {
        var connType = conneType === null ? "Metered" : conneType;
        (0, _generateWSAcknowledgement.generateWSAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), "print", "WATER", connType);
      } else {
        (0, _generateWSAcknowledgement.generateWSAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), "print", "SEWERAGE", conneType);
      }
    },
    //   downloadApp(WaterConnection, 'application', 'print');
    // },
    leftIcon: "assignment"
  };
  switch (appStatus) {
    case "PENDING_FOR_DOCUMENT_VERIFICATION":
    case "PENDING_FOR_CITIZEN_ACTION":
    case "PENDING_FOR_FIELD_INSPECTION":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "PENDING_APPROVAL_FOR_CONNECTION":
    case "PENDING_FOR_PAYMENT":
      downloadMenu = [applicationDownloadObject, wsEstimateDownloadObject];
      printMenu = [applicationPrintObject, wsEstimatePrintObject];
      break;
    case "PENDING_FOR_CONNECTION_ACTIVATION":
    case "CONNECTION_ACTIVATED":
      downloadMenu = [sanctionDownloadObject, wsEstimateDownloadObject, applicationDownloadObject];
      printMenu = [sanctionPrintObject, wsEstimatePrintObject, applicationPrintObject];
      break;
    case "REJECTED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
  }
  /** END */

  return {
    rightdiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: { textAlign: "right", display: "flex" }
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "MenuButton",
          props: {
            data: {
              label: { labelName: "DOWNLOAD", labelKey: "WS_COMMON_BUTTON_DOWNLOAD" },
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", maxWidth: "95%", marginRight: "-15px" }, className: "tl-download-button" },
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
              label: { labelName: "PRINT", labelKey: "WS_COMMON_BUTTON_PRINT" },
              leftIcon: "print",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", maxWidth: "85%" }, className: "tl-print-button" },
              menu: printMenu
            }
          }
        }

      }
      // gridDefination: {
      //   xs: 12,
      //   sm: 6
      // }
    }
  };
};

var fetchData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
    var applicationNumber, applicationNumberWater, applicationNumberSewerage, tenantId;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
            applicationNumberWater = (0, _commons.getQueryArg)(window.location.href, "applicationNumberWater");
            applicationNumberSewerage = (0, _commons.getQueryArg)(window.location.href, "applicationNumberSewerage");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

            if (!(applicationNumberSewerage && applicationNumberWater)) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return getWaterData(dispatch, applicationNumberWater, tenantId);

          case 7:
            _context.next = 9;
            return getSewerageData(dispatch, applicationNumberSewerage, tenantId);

          case 9:
            _context.next = 20;
            break;

          case 11:
            if (!applicationNumber) {
              _context.next = 20;
              break;
            }

            if (!applicationNumber.includes("WS")) {
              _context.next = 17;
              break;
            }

            _context.next = 15;
            return getWaterData(dispatch, applicationNumber, tenantId);

          case 15:
            _context.next = 20;
            break;

          case 17:
            if (!applicationNumber.includes("SW")) {
              _context.next = 20;
              break;
            }

            _context.next = 20;
            return getSewerageData(dispatch, applicationNumber, tenantId);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getWaterData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, applicationNumber, tenantId) {
    var waterResponse, queryObject;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            waterResponse = [];
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "applicationNumber", value: applicationNumber }];
            _context2.prev = 2;
            _context2.next = 5;
            return (0, _commons2.getSearchResults)(queryObject);

          case 5:
            waterResponse = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            waterResponse = [];

          case 11:
            ;
            if (waterResponse && waterResponse.WaterConnection !== undefined && waterResponse.WaterConnection.length > 0) {
              waterResponse.WaterConnection[0].service = _commons2.serviceConst.WATER;
              dispatch((0, _actions.prepareFinalObject)("WaterConnection", (0, _commons2.findAndReplace)(waterResponse.WaterConnection, "NA", null)));
            } else {
              dispatch((0, _actions.prepareFinalObject)("WaterConnection", []));
            }

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 8]]);
  }));

  return function getWaterData(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getSewerageData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch, applicationNumber, tenantId) {
    var sewerResponse, queryObject;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sewerResponse = [];
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "applicationNumber", value: applicationNumber }];
            _context3.prev = 2;
            _context3.next = 5;
            return (0, _commons2.getSearchResultsForSewerage)(queryObject, dispatch);

          case 5:
            sewerResponse = _context3.sent;
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](2);
            sewerResponse = [];

          case 11:
            ;
            if (sewerResponse && sewerResponse.SewerageConnections !== undefined && sewerResponse.SewerageConnections.length > 0) {
              sewerResponse.SewerageConnections[0].service = _commons2.serviceConst.SEWERAGE;
              dispatch((0, _actions.prepareFinalObject)("SewerageConnection", (0, _commons2.findAndReplace)(sewerResponse.SewerageConnections, "NA", null)));
            } else {
              dispatch((0, _actions.prepareFinalObject)("SewerageConnection", []));
            }

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 8]]);
  }));

  return function getSewerageData(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var pageReset = function pageReset(dispatch) {
  dispatch((0, _actions.prepareFinalObject)("WaterConnection", []));
  dispatch((0, _actions.prepareFinalObject)("SewerageConnection", []));
  dispatch((0, _actions.prepareFinalObject)("applyScreen", {}));
  dispatch((0, _actions.prepareFinalObject)("searchScreen", {}));
  dispatch((0, _actions.prepareFinalObject)("waterSubSourceForSelectedWaterSource", {}));
  dispatch((0, _actions.prepareFinalObject)("UploadedDocs", []));
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
    localStorage.setItem("WS_ADDITIONAL_DETAILS_FOR_DATA", JSON.stringify({}));
    localStorage.setItem("IS_WS_ADDITIONAL_DETAILS_FOR_DATA", JSON.stringify(false));
    pageReset(dispatch);
    fetchData(dispatch).then(function () {
      var purpose = (0, _commons.getQueryArg)(window.location.href, "purpose");
      var status = (0, _commons.getQueryArg)(window.location.href, "status");
      // const service = getQueryArg(window.location.href, "service");
      var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
      var applicationNumberWater = (0, _commons.getQueryArg)(window.location.href, "applicationNumberWater");
      var applicationNumberSewerage = (0, _commons.getQueryArg)(window.location.href, "applicationNumberSewerage");
      var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
      var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
      (0, _generatePDF.loadUlbLogo)(tenant);
      var consumerNo = "";
      if (applicationNumber && applicationNumber.includes("WS")) {
        consumerNo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].connectionNo");
      } else if (applicationNumber && applicationNumber.includes("SW")) {
        consumerNo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0].connectionNo");
      }
      if (applicationNumberSewerage && applicationNumberWater) {
        var cardOne = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, applicationNumberWater, applicationNumberSewerage, secondNumber, tenant);
        (0, _set2.default)(action, "screenConfig.components.div.children", cardOne);
      } else {
        var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, applicationNumberWater, applicationNumberSewerage, secondNumber,
        // financialYear,
        tenant, consumerNo);
        (0, _set2.default)(action, "screenConfig.components.div.children", data);
      }
    }).then(function () {
      return (0, _apply.getMdmsData)(dispatch);
    }).then(function () {
      return (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
    }).then(function () {
      return (0, _commons2.prepareDocUploadRedux)(state, dispatch);
    }).then(function () {
      return (0, _commons2.prepareDocumentsUploadRedux)(state, dispatch);
    }).then(function () {
      return (0, _commons2.downloadAndPrintForNonApply)(state, dispatch);
    }).catch(function (error) {});
    return action;
  }
};

exports.default = screenConfig;