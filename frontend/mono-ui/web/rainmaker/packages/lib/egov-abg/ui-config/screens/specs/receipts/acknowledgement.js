"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _footers = require("./acknowledgementResource/footers");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Cancel Receipt",
    labelKey: "CR_COMMON_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-abg",
    componentPath: "ApplicationContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "receiptNumbers"),
      label: {
        labelValue: "Application No.",
        labelKey: "CR_RECEIPT_DETAILS_NUMBER"
      }
    },
    visible: true
  }
});

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, moduleName) {
  if (purpose === "apply" && status === "failure") {
    // loadReceiptGenerationData(applicationNumber, tenant);
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
              labelName: "Application Verification Failed",
              labelKey: "CR_APPLY_FAILURE_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "CR_APPLY_FAILURE_CHECKLIST_MESSAGE_SUB"
            }
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "apply" && status === "success") {
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
              labelName: "Application Forwarded Successfully",
              labelKey: "CR_APPLY_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding above application status has been sent to trade owner at registered Mobile No.",
              labelKey: "CR_APPLY_FORWARD_SUCCESS"
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
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var moduleName = (0, _commons.getQueryArg)(window.location.href, "moduleName");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");

    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, moduleName);

    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    // Hiding edit section

    return action;
  }
};
exports.default = screenConfig;