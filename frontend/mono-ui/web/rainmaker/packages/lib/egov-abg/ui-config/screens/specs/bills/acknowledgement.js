"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _footers = require("./acknowledgementResource/footers");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLabelKey = function getLabelKey() {
  var service = (0, _commons.getQueryArg)(window.location.href, "service");
  if (service == "WATER") {
    return "WS_COMMON_WATER_BILL_HEADER";
  } else {
    return "WS_COMMON_SEWERAGE_BILL_HEADER";
  }
};

var getHeader = function getHeader(applicationNumber) {
  return (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
      labelName: "",
      labelKey: getLabelKey()
    }),
    applicationNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-abg",
      componentPath: "ApplicationContainer",
      props: {
        number: applicationNumber,
        label: {
          labelValue: "Consumber No",
          labelKey: "WS_COMMON_CONSUMER_NO_LABEL"
        }
      },
      visible: true
    }
  });
};

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, moduleName, consumerNumber) {
  if (purpose === "apply" && status === "failure") {

    return {
      header: getHeader(consumerNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Bill Cancellation Failed",
              labelKey: "ABG_BILLCANCELLATION_FAILED__MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding bill has been sent to consumer at registered Mobile No.",
              labelKey: "ABG_BILLCANCELLATION_FAILED__MESSAGE_SUB_HEAD"
            }
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "apply" && status === "success") {
    return {
      header: getHeader(consumerNumber),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Bill Cancellation Sucessfully",
              labelKey: "ABG_BILLCANCELLATION_SUCESS_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding bill has been sent to consumer at registered Mobile No.",
              labelKey: "ABG_BILLCANCELLATION_FAILED__MESSAGE_SUB_HEAD"
            },
            tailText: {
              labelName: "Bill No.",
              labelKey: "PAYMENT_BILL_NO"
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
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "billNo");
    var moduleName = (0, _commons.getQueryArg)(window.location.href, "moduleName");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var consumerNumber = (0, _commons.getQueryArg)(window.location.href, "consumerNumber");

    var service = (0, _commons.getQueryArg)(window.location.href, "service");
    if (service == "SEWERAGE") {
      (0, _set2.default)(action.screenConfig, "components.div.children.header.children.header.children.key.props.labelKey", "WS_COMMON_SEWERAGE_BILL_HEADER");
    } else {
      (0, _set2.default)(action.screenConfig, "components.div.children.header.children.header.children.key.props.labelKey", "WS_COMMON_WATER_BILL_HEADER");
    }

    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant, moduleName, consumerNumber);

    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    // Hiding edit section

    return action;
  }
};
exports.default = screenConfig;