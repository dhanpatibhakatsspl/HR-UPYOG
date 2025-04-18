"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _generateTLAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generateTLAcknowledgement");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _receiptTransformer = require("../utils/receiptTransformer");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _applicationSuccessFooter = require("./acknowledgementResource/applicationSuccessFooter");

var _approvalSuccessFooter = require("./acknowledgementResource/approvalSuccessFooter");

var _gotoHomeFooter = require("./acknowledgementResource/gotoHomeFooter");

var _paymentFailureFooter = require("./acknowledgementResource/paymentFailureFooter");

var _paymentSuccessFooter = require("./acknowledgementResource/paymentSuccessFooter");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTradeTypeSubtypeDetails = function getTradeTypeSubtypeDetails(payload) {
  var tradeUnitsFromApi = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.tradeUnits", []);
  var tradeUnitDetails = [];
  tradeUnitsFromApi.forEach(function (tradeUnit) {
    var tradeType = tradeUnit.tradeType;

    var tradeDetails = tradeType.split(".");
    tradeUnitDetails.push({
      trade: (0, _get2.default)(tradeDetails, "[0]", ""),
      tradeType: (0, _get2.default)(tradeDetails, "[1]", ""),
      tradeSubType: (0, _get2.default)(tradeDetails, "[2]", "")
    });
  });
  return tradeUnitDetails;
};

var searchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, applicationNo, tenantId) {
    var queryObject, payload, sts, LicenseData, fetchFromReceipt;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "applicationNumber", value: applicationNo }];
            _context.next = 3;
            return (0, _commons2.getSearchResults)(queryObject);

          case 3:
            payload = _context.sent;


            (0, _set2.default)(payload, "Licenses[0].assignee", []);

            _context.next = 7;
            return (0, _commons.setDocuments)(payload, "Licenses[0].tradeLicenseDetail.applicationDocuments", "LicensesTemp[0].reviewDocData", dispatch, 'TL');

          case 7:
            //set Trade Types

            payload && dispatch((0, _actions.prepareFinalObject)("Licenses", (0, _get2.default)(payload, "Licenses", [])));
            payload && dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeDetailsResponse", getTradeTypeSubtypeDetails(payload)));
            sts = (0, _utils2.getTransformedStatus)((0, _get2.default)(payload, "Licenses[0].status"));
            LicenseData = payload.Licenses[0];
            fetchFromReceipt = sts !== "pending_payment";

            // generate estimate data

            (0, _utils2.createEstimateData)(LicenseData, "LicensesTemp[0].estimateCardData", dispatch, {}, fetchFromReceipt);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchResults(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var downloadprintMenu = function downloadprintMenu(state, dispatch) {
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      var _state$screenConfigur = state.screenConfiguration.preparedFinalObject,
          Licenses = _state$screenConfigur.Licenses,
          LicensesTemp = _state$screenConfigur.LicensesTemp;

      var documents = LicensesTemp && LicensesTemp[0].reviewDocData;
      (0, _set2.default)(Licenses[0], "additionalDetails.documents", documents);
      // downloadAcknowledgementForm(Licenses);
      (0, _generateTLAcknowledgement.generateTLAcknowledgement)(state.screenConfiguration.preparedFinalObject, "tl-acknowledgement-" + Licenses[0].applicationNumber);
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: function link() {
      var _state$screenConfigur2 = state.screenConfiguration.preparedFinalObject,
          Licenses = _state$screenConfigur2.Licenses,
          LicensesTemp = _state$screenConfigur2.LicensesTemp;

      var documents = LicensesTemp && LicensesTemp[0].reviewDocData;
      (0, _set2.default)(Licenses[0], "additionalDetails.documents", documents);
      // downloadAcknowledgementForm(Licenses,'print');
      (0, _generateTLAcknowledgement.generateTLAcknowledgement)(state.screenConfiguration.preparedFinalObject, 'print');
    },
    leftIcon: "assignment"
  };
  var downloadMenu = [];
  var printMenu = [];
  downloadMenu = [applicationDownloadObject];
  printMenu = [applicationPrintObject];

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
var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, financialYear, tenant) {
  var financialYearText = financialYear ? financialYear : "";
  if (purpose === "apply" && status === "success") {
    searchResults(dispatch, applicationNumber, tenant);
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for New Trade License (" + financialYearText + ")",
        labelKey: "TL_COMMON_APPLICATION_NEW_LICENSE",
        dynamicArray: [financialYearText]
      }),
      headerdownloadprint: downloadprintMenu(state, dispatch),
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
              labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
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
  } else if (purpose === "resubmit" && status === "success") {
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for New Trade License (" + financialYearText + ")",
        labelKey: "TL_COMMON_APPLICATION_NEW_LICENSE",
        dynamicArray: [financialYearText]
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
              labelKey: "TL_APPLICATION_RESUBMIT_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPLICATION_RESUBMIT_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },

      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "pay" && status === "success") {
    (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenant);
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Payment for New Trade License " + financialYearText,
          labelKey: "TL_COMMON_PAYMENT_NEW_LICENSE",
          dynamicArray: [financialYearText]
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
              labelName: "Payment is collected successfully, Now you can dowload and issue Trade License Certificate to citizen",
              labelKey: "TL_CONFIRMATION_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Payment Collection has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_CONFIRMATION_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: "TL_PMT_RCPT_NO"
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
          labelName: "Trade License Application " + financialYearText,
          labelKey: "TL_TRADE_APPLICATION",
          dynamicArray: [financialYearText]
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
              labelName: "Application is Approved Successfully",
              labelKey: "TL_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPROVAL_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
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
          labelName: "Trade License Application " + financialYearText,
          labelKey: "TL_TRADE_APPLICATION",
          dynamicArray: [financialYearText]
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
              labelKey: "TL_SENDBACK_CHECKLIST_MESSAGE_HEAD"
            },
            // body: {
            //   labelName:
            //     "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
            //   labelKey: "TL_SENDBACK_CHECKLIST_MESSAGE_SUB"
            // },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter: _approvalSuccessFooter.approvalSuccessFooter
    };
  } else if (purpose === "sendbacktocitizen" && status === "success") {
    (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenant);
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Trade License Application " + financialYearText,
          labelKey: "TL_TRADE_APPLICATION",
          dynamicArray: [financialYearText]
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
              labelName: "Application is sent back to Citizen Successfully",
              labelKey: "TL_SENDBACK_TOCITIZEN_CHECKLIST_MESSAGE_HEAD"
            },
            // body: {
            //   labelName:
            //     "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
            //   labelKey: "TL_SENDBACK_CHECKLIST_MESSAGE_SUB"
            // },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
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
          labelName: "Trade License Application " + financialYearText,
          labelKey: "TL_TRADE_APPLICATION",
          dynamicArray: [financialYearText]
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
              labelName: "Trade License Application Rejected",
              labelKey: "TL_APPROVAL_REJ_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Rejection has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPROVAL_REJ_MESSAGE_SUBHEAD"
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
          labelName: "Trade License Application " + financialYearText,
          labelKey: "TL_TRADE_APPLICATION",
          dynamicArray: [financialYearText]
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
              labelKey: "TL_TL_CANCELLED_MESSAGE_HEAD"
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
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
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
        labelKey: "TL_APPLICATION_TRADE_LICENSE",
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
              labelKey: "TL_MARK_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: "TL_APPLICATION_MARKED_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
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
        labelName: "Application for Trade License " + financialYearText,
        labelKey: "TL_APPLICATION_TRADE_LICENSE",
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
              labelName: "Application Forwarded Successfully",
              labelKey: "TL_FORWARD_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPLICATION_FORWARD_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if ((purpose === "EDITRENEWAL" || purpose === "DIRECTRENEWAL") && status === "success") {
    return {

      header: (0, _utils.getCommonContainer)({
        Commonheader: (0, _utils.getCommonHeader)({
          labelName: "Application for Trade License Renewal " + financialYearText,
          labelKey: "TL_APPLICATION_TRADE_LICENSE_RENEWAL",
          dynamicArray: [financialYearText]
        }),
        licenseNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-tradelicence",
          componentPath: "ApplicationNoContainer",
          props: {
            number: "NA"
          },
          visible: true
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
              labelName: "Application Renewed Successfully",
              labelKey: "TL_FORWARD_SUCCESS_MESSAGE_MAIN_RENEWAL"
            },
            body: {
              labelName: "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPLICATION_FORWARD_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
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
    (0, _generatePDF.loadUlbLogo)(tenant);
    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, financialYear, tenant);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;