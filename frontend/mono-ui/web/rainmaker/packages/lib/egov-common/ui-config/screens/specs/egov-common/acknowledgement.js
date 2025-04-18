"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("../../../../ui-utils/commons");

var _utils = require("../utils");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _paymentFooter = require("./acknowledgementResource/paymentFooter");

require("./index.css");

var _utils2 = require("egov-bnd/ui-config/screens/specs/utils");

var _pay = require("./pay");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadprintMenu = function downloadprintMenu(state, applicationNumber, tenantId, uiCommonPayConfig) {
  var receiptKey = (0, _get2.default)(uiCommonPayConfig, "receiptKey", "consolidatedreceipt");
  var pdfModule = (0, _get2.default)(uiCommonPayConfig, "pdfModule", "PAYMENT");
  var receiptDownloadObject = {
    label: {
      labelName: "DOWNLOAD RECEIPT",
      labelKey: "COMMON_DOWNLOAD_RECEIPT"
    },
    link: function link() {
      var receiptQueryString = [{ key: "receiptNumbers", value: applicationNumber }, { key: "tenantId", value: tenantId }, {
        key: "businessService",
        value: (0, _commons.getQueryArg)(window.location.href, "businessService")
      }];
      (0, _commons2.download)(receiptQueryString, "download", receiptKey, pdfModule, state);
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "PRINT RECEIPT", labelKey: "COMMON_PRINT_RECEIPT" },
    link: function link() {
      var receiptQueryString = [{ key: "receiptNumbers", value: applicationNumber }, { key: "tenantId", value: tenantId }, {
        key: "businessService",
        value: (0, _commons.getQueryArg)(window.location.href, "businessService")
      }];
      (0, _commons2.download)(receiptQueryString, "print", receiptKey, pdfModule, state);
    },
    leftIcon: "receipt"
  };
  var downloadMenu = [];
  var printMenu = [];
  downloadMenu = [receiptDownloadObject];
  printMenu = [receiptPrintObject];

  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "downloadprint-commonmenu",
      style: { textAlign: "right", display: "flex" }
    },
    children: {
      disabled: {
        uiFramework: "custom-atoms-local",
        componentPath: "DisabledComponent",
        moduleName: "egov-common"
      },
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
              style: { height: "60px", color: "#FE7A51", marginRight: "5px" },
              className: "tl-download-button"
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
              className: "tl-print-button"
            },
            menu: printMenu
          }
        }
      }
    }
  };
};
var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, status, receiptNumber, consumerCode, tenant) {
  var roleExists = (0, _utils.ifUserRoleExists)("CITIZEN");
  var header = (0, _pay.getHeader)(state);
  var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
  var transBusinessService = businessService ? businessService.toUpperCase().replace(/[._:-\s\/]/g, "_") : "DEFAULT";
  var uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
  if (status === "success") {
    return {
      header: header,
      headerdownloadprint: downloadprintMenu(state, receiptNumber, tenant, uiCommonPayConfig),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelKey: roleExists ? "CITIZEN_SUCCESS_" + transBusinessService + "_PAYMENT_MESSAGE" : "EMPLOYEE_SUCCESS_" + transBusinessService + "_PAYMENT_MESSAGE"
            },
            body: {
              labelKey: roleExists ? "CITIZEN_SUCCESS_" + transBusinessService + "_PAYMENT_MESSAGE_DETAIL" : "EMPLOYEE_SUCCESS_" + transBusinessService + "_PAYMENT_MESSAGE_DETAIL"
            },
            tailText: {
              labelKey: roleExists ? "CITIZEN_SUCCESS_" + transBusinessService + "_PAYMENT_RECEIPT_NO" : "EMPLOYEE_SUCCESS_" + transBusinessService + "_PAYMENT_RECEIPT_NO"
            },
            number: receiptNumber
          }),
          linkComponent: {
            uiFramework: "custom-atoms-local",
            componentPath: "LinkComponent",
            moduleName: "egov-common"
          }
        }
      },
      paymentFooter: (0, _paymentFooter.paymentFooter)(state, consumerCode, tenant, status, businessService)
    };
  } else if (status === "failure") {
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
              labelKey: roleExists ? "CITIZEN_FAILURE_" + transBusinessService + "_PAYMENT_MESSAGE" : "EMPLOYEE_FAILURE_" + transBusinessService + "_PAYMENT_MESSAGE"
            },
            body: {
              labelKey: roleExists ? "CITIZEN_FAILURE_" + transBusinessService + "_PAYMENT_MESSAGE_DETAIL" : "EMPLOYEE_FAILURE_" + transBusinessService + "_PAYMENT_MESSAGE_DETAIL"
            }
          }),
          linkComponent: {
            uiFramework: "custom-atoms-local",
            componentPath: "LinkComponent",
            moduleName: "egov-common"
          }
        }
      },
      paymentFooter: (0, _paymentFooter.paymentFooter)(state, consumerCode, tenant, status, businessService)
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
      },
      children: {}
    }
  },
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var status = (0, _commons.getQueryArg)(window.location.href, "status");
    var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
    var receiptNumber = (0, _commons.getQueryArg)(window.location.href, "receiptNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
    if (businessService == "BIRTH_CERT" || businessService == "DEATH_CERT") {
      //Only for birth and death certificate.
      (0, _utils2.postPaymentSuccess)({ consumerCode: consumerCode, tenantId: tenant, businessService: businessService });
    }
    // Calling the Bill so that payer information can be set in the PDF for Citizen application
    if (process.env.REACT_APP_NAME === "Citizen") {
      if ((status == 'success' || status == 'failure') && localStorage.getItem('pay-channel') == "whatsapp" && localStorage.getItem('pay-redirectNumber')) {
        setTimeout(function () {
          var weblink = "https://api.whatsapp.com/send?phone=" + localStorage.getItem('pay-redirectNumber') + "&text=" + "";
          window.location.href = weblink;
        }, 1500);
      }
      (0, _utils.generateBill)(dispatch, consumerCode, tenant, businessService);
    }
    var data = getAcknowledgementCard(state, dispatch, status, receiptNumber, consumerCode, tenant);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;