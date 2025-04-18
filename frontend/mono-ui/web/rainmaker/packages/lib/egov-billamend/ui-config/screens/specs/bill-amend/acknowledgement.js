"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _function = require("egov-billamend/ui-config/screens/specs/bill-amend/searchResources/function.js");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _generateBillAmendAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generateBillAmendAcknowledgement");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _common = require("../../../../config/common");

var _common2 = _interopRequireDefault(_common);

var _commons2 = require("../../../../ui-utils/commons");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _applicationSuccessFooter = require("./acknowledgementResource/applicationSuccessFooter");

var _approvalSuccessFooter = require("./acknowledgementResource/approvalSuccessFooter");

require("./index.css");

var _utils2 = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, applicationNo, tenantId, businessService) {
    var queryObject, payload, newQuery, resp, connectionDetail, consumerName, consumerAddress;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "amendmentId", value: applicationNo }, { key: "businessService", value: businessService }];
            _context.next = 3;
            return (0, _commons2.getBillAmendSearchResult)(queryObject);

          case 3:
            payload = _context.sent;
            _context.next = 6;
            return (0, _commons.setDocuments)(payload, "Amendments[0].documents", "bill-amend-review-document-data", dispatch, 'BILLAMEND');

          case 6:
            newQuery = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCode",
              value: (0, _get2.default)(payload, "Amendments[0].consumerCode", '')
            }, {
              key: "businessService",
              value: businessService
            }];
            _context.next = 9;
            return (0, _commons2.searchBill)(newQuery, dispatch);

          case 9:
            resp = _context.sent;
            connectionDetail = (0, _get2.default)(resp, 'Bill[0]', {});
            consumerName = (0, _get2.default)(connectionDetail, "additionalDetails.ownerName", "NA");
            consumerAddress = (0, _function.getAddress)((0, _get2.default)(connectionDetail, "tenantId"), (0, _get2.default)(connectionDetail, "additionalDetails.locality"));

            (0, _set2.default)(payload, 'Amendments[0].additionalDetails.ownerName', consumerName);
            (0, _set2.default)(payload, 'Amendments[0].additionalDetails.ownerAddress', consumerAddress);

            payload && dispatch((0, _actions.prepareFinalObject)("Amendment", (0, _get2.default)(payload, "Amendments[0]", {})));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchResults(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var downloadprintMenu = function downloadprintMenu(state, dispatch, status) {
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "BILL_APPLICATION" },
    link: function link() {
      var Amendment = state.screenConfiguration.preparedFinalObject.Amendment;

      (0, _generateBillAmendAcknowledgement.generateBillAmendAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), "billamend-acknowledgement-" + Amendment.amendmentId + ".pdf");
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "BILL_APPLICATION" },
    link: function link() {
      var Amendments = state.screenConfiguration.preparedFinalObject.Amendments;

      (0, _generateBillAmendAcknowledgement.generateBillAmendAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), 'print');
    },
    leftIcon: "assignment"
  };

  var certificateDownloadObject = {
    label: { labelName: "Application", labelKey: "BILL_COUPON" },
    link: function link() {
      var Amendment = state.screenConfiguration.preparedFinalObject.Amendment;

      (0, _utils2.generateBillAmendPdf)([Amendment], _common2.default.tenantId, 'download');
    },
    leftIcon: "assignment"
  };
  var certificatePrintObject = {
    label: { labelName: "Application", labelKey: "BILL_COUPON" },
    link: function link() {
      var Amendment = state.screenConfiguration.preparedFinalObject.Amendment;

      (0, _utils2.generateBillAmendPdf)([Amendment], _common2.default.tenantId, 'print');
    },
    leftIcon: "assignment"
  };

  var downloadMenu = [];
  var printMenu = [];
  switch (status) {
    case 'apply':
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case 'approve':
      downloadMenu = [certificateDownloadObject];
      printMenu = [certificatePrintObject];
      break;
    default:
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
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
            label: { labelName: "Download", labelKey: "BILL_DOWNLOAD" },
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
            label: { labelName: "PRINT", labelKey: "BILL_PRINT" },
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
var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, businessService) {
  if (purpose === "apply" && status === "success") {
    searchResults(dispatch, applicationNumber, tenant, businessService);
    return {
      headerDiv: (0, _utils.getCommonContainer)({
        header: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            headerTitle: (0, _utils.getCommonHeader)({
              labelName: "Acknowledgement for Bill Amendment",
              labelKey: "BILL_COMMON_APPLICATION_NEW_AMENDMENT",
              dynamicArray: [],
              style: { alignSelf: "center" }
            })
          }
        },
        headerdownloadprint: downloadprintMenu(state, dispatch, 'apply')
      }, { style: { justifyContent: "space-between" } }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "BILL_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
              labelKey: "BILL_APPLICATION_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BILL_APPLICATION_NUMBER"
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
  } else if (purpose === "approve" && status === "success") {
    searchResults(dispatch, applicationNumber, tenant, businessService);
    return {
      headerDiv: (0, _utils.getCommonContainer)({
        header: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            headerTitle: (0, _utils.getCommonHeader)({
              labelName: "Acknowledgement for Bill Amendment",
              labelKey: "BILL_COMMON_APPLICATION_NEW_AMENDMENT",
              dynamicArray: [],
              style: { alignSelf: "center" }
            })
          }
        },
        headerdownloadprint: downloadprintMenu(state, dispatch, 'approve')
      }, { style: { justifyContent: "space-between" } }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application is Approved Successfully",
              labelKey: "BILL_APPROVED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "BILL_APPROVED_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BILL_APPLICATION_NUMBER"
            },
            number: applicationNumber
          })
        }
      },
      approvalSuccessFooter: _approvalSuccessFooter.approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      headerDiv: (0, _utils.getCommonContainer)({
        header: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            headerTitle: (0, _utils.getCommonHeader)({
              labelName: "Acknowledgement for Bill Amendment",
              labelKey: "BILL_COMMON_APPLICATION_NEW_AMENDMENT",
              dynamicArray: [],
              style: { alignSelf: "center" }
            })
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
              labelName: "Application is Rejected Successfully",
              labelKey: "BILL_REJECTED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "BILL_REJECTED_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "BILL_APPLICATION_NUMBER"
            },
            number: applicationNumber
          })
        }
      },
      approvalSuccessFooter: _approvalSuccessFooter.approvalSuccessFooter
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
    var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");

    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    (0, _generatePDF.loadUlbLogo)(tenant);
    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, businessService);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;