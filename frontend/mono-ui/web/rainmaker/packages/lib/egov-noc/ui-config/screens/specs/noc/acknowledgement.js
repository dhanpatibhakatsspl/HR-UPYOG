"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footers = require("./acknowledgementResource/footers");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var getAcknowledgementCard = function getAcknowledgementCard(action, state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, businessService, moduleName) {
  if (purpose === "approve" && status === "success") {
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
              labelName: "NOC Approved Successfully",
              labelKey: "NOC_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding BPA Approval has been sent to building owner at registered Mobile No.",
              labelKey: "NOC_APPROVAL_CHECKLIST_MESSAGE_SUB"
            }
          })
        }
      },
      approvalSuccessFooter: _footers.approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
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
  } else if (purpose === "application" && status === "voided") {
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
              labelName: "Application for NOC is voided",
              labelKey: "NOC_APPROVAL_VOIDED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding BPA Rejection has been sent to building owner at registered Mobile No.",
              labelKey: "NOC_APPROVAL_VOIDED_MESSAGE_SUBHEAD"
            }
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
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "consumerCode") || (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "receiptNumber");
    var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
    var moduleName = (0, _commons.getQueryArg)(window.location.href, "moduleName");
    var data = getAcknowledgementCard(action, state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, businessService, moduleName);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;