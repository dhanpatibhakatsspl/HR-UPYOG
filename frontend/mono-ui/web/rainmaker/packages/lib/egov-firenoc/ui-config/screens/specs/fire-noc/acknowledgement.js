"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _acknowledgementUtils = require("egov-ui-framework/ui-containers/acknowledgementResource/acknowledgementUtils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _generateNOCAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generateNOCAcknowledgement");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("../../../../ui-utils/commons");

var _receiptPdf = require("../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

var _receiptTransformer = require("../utils/receiptTransformer");

require("./index.css");

var _searchPreview = require("./search-preview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadprintMenuConfig = function downloadprintMenuConfig(state, dispatch, purpose) {

  var preparedFinalObject = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {});
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: function link() {
      (0, _generateNOCAcknowledgement.generateNOCAcknowledgement)(preparedFinalObject, "noc-acknowledgement-" + (0, _get2.default)(preparedFinalObject, 'FireNOCs[0].fireNOCDetails.applicationNumber', ''));
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: function link() {
      (0, _generateNOCAcknowledgement.generateNOCAcknowledgement)(preparedFinalObject, 'print');
    },
    leftIcon: "assignment"
  };
  var certificateDownloadObject = {
    label: { labelName: "Certificate", labelKey: "NOC_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_download");
    },
    leftIcon: "assignment"
  };
  var certificatePrintObject = {
    label: { labelName: "Certificate", labelKey: "NOC_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_print");
    },
    leftIcon: "assignment"
  };

  var downloadMenu = [];
  var printMenu = [];
  switch (purpose) {
    case "apply":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "approve":
      downloadMenu = [certificateDownloadObject];
      printMenu = [certificatePrintObject];
      break;
    default:
      downloadMenu = false;
      printMenu = false;
      break;

  }

  return { downloadMenu: downloadMenu, printMenu: printMenu };
};

var setApplicationData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, applicationNumber, tenant, state) {
    var queryObject, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{
              key: "tenantId",
              value: tenant
            }, {
              key: "applicationNumber",
              value: applicationNumber
            }];
            _context.next = 3;
            return (0, _commons2.getSearchResults)(queryObject);

          case 3:
            response = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("FireNOCs", (0, _get2.default)(response, "FireNOCs", [])));
            (0, _searchPreview.prepareDocumentsView)(state, dispatch);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setApplicationData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _commons.ifUserRoleExists)("CITIZEN") ? "/fire-noc/home" : "/inbox";
  return redirectionURL;
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-containers",
      componentPath: "AcknowledgementContainer",
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

    var _downloadprintMenuCon = downloadprintMenuConfig(state, dispatch, purpose),
        downloadMenu = _downloadprintMenuCon.downloadMenu,
        printMenu = _downloadprintMenuCon.printMenu;

    var appName = process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee";

    var footerUrlConfig = [{

      url: getRedirectionURL(),
      labelName: "NOC_COMMON_BUTTON_HOME",
      labelKey: "NOC_COMMON_BUTTON_HOME",
      style: {
        minWidth: "180px",
        height: "48px"
      }
    }];

    if (purpose === "apply" && status === "success") {
      footerUrlConfig.push({
        url: "/egov-common/pay?consumerCode=" + applicationNumber + "&tenantId=" + tenant + "&businessService=FIRENOC",
        labelName: "NOC_PROCEED_PAYMENT",
        labelKey: "NOC_PROCEED_PAYMENT",
        style: {
          minWidth: "180px",
          height: "48px",
          color: "#fff",
          backgroundColor: " #FE7A51"
        }
      });
    }
    if (purpose === "pay" && status === "failure") {
      footerUrlConfig.push({
        url: "/fire-noc/citizen-pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant,
        labelName: "NOC_PAYMENT_RETRY",
        labelKey: "NOC_PAYMENT_RETRY",
        style: {
          minWidth: "180px",
          height: "48px",
          color: "#fff",
          backgroundColor: " #FE7A51"
        }
      });
    }

    (0, _receiptTransformer.loadPdfGenerationData)(applicationNumber, tenant);
    var config = {
      state: state,
      dispatch: dispatch,
      purpose: purpose,
      status: status,
      applicationNumber: applicationNumber,
      secondNumber: secondNumber,
      tenant: tenant,
      moduleName: "Fire Noc",
      footerUrlConfig: footerUrlConfig,
      downloadMenu: downloadMenu,
      printMenu: printMenu
    };
    var data = (0, _acknowledgementUtils.getAcknowledgementCard)(config);
    setApplicationData(dispatch, applicationNumber, tenant, state);
    (0, _set2.default)(action, "screenConfig.components.div.props", data);
    return action;
  }
};

exports.default = screenConfig;