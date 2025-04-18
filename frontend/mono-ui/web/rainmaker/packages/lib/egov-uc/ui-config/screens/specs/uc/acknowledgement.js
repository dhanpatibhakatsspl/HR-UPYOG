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

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _acknowledgementFooter = require("./acknowledgementResource/acknowledgementFooter");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
var header = (0, _utils.getCommonHeader)({
  labelName: "mCollect",
  labelKey: "ACTION_TEST_UNIVERSAL_COLLECTION"
});

var downloadprintMenu = function downloadprintMenu(state, dispatch, applicationNumber, tenantId) {
  var applicationDownloadObject = {
    label: { labelName: "Challan", labelKey: "UC_CHALLAN" },
    link: function link() {
      //const { Challan } = state.screenConfiguration.preparedFinalObject;
      var Challan = [{ key: "challanNo", value: applicationNumber }, { key: "tenantId", value: tenantId }];
      (0, _utils2.downloadEchallan)(Challan, "CHALLAN-" + applicationNumber + ".pdf");
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Challan", labelKey: "UC_CHALLAN" },
    link: function link() {

      var Challan = [{ key: "challanNo", value: applicationNumber }, { key: "tenantId", value: tenantId }];
      (0, _utils2.printEchallan)(Challan);
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
    visible: !JSON.parse(window.localStorage.getItem('isPOSmachine')),

    props: {
      className: "downloadprint-commonmenu",
      style: { textAlign: "right", display: "flex", paddingTop: "10px" }
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
            props: {
              variant: "outlined",
              style: {
                height: "60px", color: "#FE7A51",
                marginRight: "5px"
              },
              className: "uc-download-button"
            },
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
            props: {
              variant: "outlined",
              style: { height: "60px", color: "#FE7A51" },
              className: "uc-print-button"
            },
            menu: printMenu
          }
        }
      }

    }
  };
};

var consumerCode = function consumerCode(challanNumber) {
  return {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-common",
    componentPath: "ApplicationNoContainer",
    props: {
      number: challanNumber,
      label: {
        labelKey: "PAYMENT_UC_CONSUMER_CODE"
      }
    }
  };
};
/*icon- success/failure icon Tick/Cross
* color-background color of icon Green/Red
* headerKey,headername - message header display localization code
* bodyKey,bodyname - message body display localization code
* billNumber - bill number related to challan for cancel and failure bill number will be null
*/
var applicationSuccessNotificationCard = function applicationSuccessNotificationCard(icon, color, headerkey, headername, bodykey, bodyname, billNumber) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      card: (0, _acknowledgementUtils2.default)({
        icon: icon,
        backgroundColor: color,
        header: {
          labelName: headername,
          labelKey: headerkey
        },
        body: {
          labelName: bodyname,
          labelKey: bodykey
        },
        tailText: {
          labelName: "Bill No.",
          labelKey: "UC_BILL_NO_LABEL"
        },
        number: billNumber
      })
    }
  };
};

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, billNumber, challanNumber, tenantId) {
  if (purpose === "challan" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: header,
        consumerCode: consumerCode(challanNumber)
      }),
      headerdownloadprint: downloadprintMenu(state, dispatch, challanNumber, tenantId),
      applicationSuccessCard: applicationSuccessNotificationCard("done", "#39CB74", "UC_BILL_GENERATED_SUCCESS_MESSAGE", "create", "UC_BILL_GENERATION_MESSAGE_SUB", "createsuccessmsg", billNumber),

      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: _acknowledgementFooter.acknowledgementSuccesFooter
    };
  } else if (purpose === "update" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: header,
        consumerCode: consumerCode(challanNumber)
      }),
      headerdownloadprint: downloadprintMenu(state, dispatch, challanNumber, tenantId),
      applicationSuccessCard: applicationSuccessNotificationCard("done", "#39CB74", "UC_BILL_UPDATED_SUCCESS_MESSAGE", "update", "UC_BILL_GENERATION_MESSAGE_SUB", "updatesuccessmsg", billNumber),

      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: _acknowledgementFooter.acknowledgementSuccesFooter
    };
  } else if (purpose === "cancel" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: header,
        consumerCode: consumerCode(challanNumber)
      }),
      headerdownloadprint: downloadprintMenu(state, dispatch, challanNumber, tenantId),
      applicationSuccessCard: applicationSuccessNotificationCard("done", "#39CB74", "UC_BILL_CANCELLED_SUCCESS_MESSAGE", "cancel", "UC_BILL_GENERATION_MESSAGE_SUB", "cancelmsg", null),

      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      paymentFailureFooter: _acknowledgementFooter.acknowledgementFailureFooter
    };
  }
  // else if (purpose === "challan" && status === "failure") {
  //   return{
  //     header :getCommonContainer({
  //       header:header        
  //     }),
  //     applicationSuccessCard:applicationSuccessNotificationCard("close","#E54D42","UC_FAILURE_MESSAGE","failure","UC_FAILURE_MESSAGE_BODY","failuremsg",null),

  //      iframeForPdf: {
  //        uiFramework: "custom-atoms",
  //        componentPath: "Div"
  //      },
  //      paymentFailureFooter: acknowledgementFailureFooter
  //    }   
  // }

  //For all kinds of failures irrespective of create/update/cancel
  else {
      return {
        header: (0, _utils.getCommonContainer)({
          header: header
        }),
        applicationSuccessCard: applicationSuccessNotificationCard("close", "#E54D42", "UC_FAILURE_MESSAGE", "failure", "UC_FAILURE_MESSAGE_BODY", "failuremsg", null),

        iframeForPdf: {
          uiFramework: "custom-atoms",
          componentPath: "Div"
        },
        paymentFailureFooter: _acknowledgementFooter.acknowledgementFailureFooter
      };
    }
};

var getSearchData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, queryObj) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _commons2.getSearchResults)(queryObj);

          case 2:
            response = _context.sent;

            response && response.Receipt && response.Receipt.length > 0 && dispatch((0, _actions.prepareFinalObject)("receiptSearchResponse.Receipt", response.Receipt));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getSearchData(_x, _x2) {
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
    var billNumber = (0, _commons.getQueryArg)(window.location.href, "billNumber");
    var challanNumber = (0, _commons.getQueryArg)(window.location.href, "challanNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var businessService = (0, _commons.getQueryArg)(window.location.href, "serviceCategory");

    var data = getAcknowledgementCard(state, dispatch, purpose, status, billNumber, challanNumber, tenantId);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;