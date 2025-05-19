"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("../tradelicence/payResource/footer");

var _estimateDetails = require("../tradelicence/payResource/estimate-details");

var _estimateDetails2 = _interopRequireDefault(_estimateDetails);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Application for New Trade License (2018-2019)",
    labelKey: "TL_COMMON_PAYMENT_NEW_LIC_CITIZEN"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-tradelicence",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
    }
  }
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: "NewTL" }];
    (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
    (0, _utils2.fetchBill)(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css citizen-payment-confirmation"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, header)
          }
        },
        formwizardFirstStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            paymentDetails: (0, _utils.getCommonCard)({
              header: (0, _utils.getCommonTitle)({
                labelName: "Please review your fee and proceed to payment",
                labelKey: "TL_CITIZEN_PAYMENT_HEAD"
              }),
              estimateDetails: _estimateDetails2.default
            })
          }
        },
        footer: _footer.footer
      }
    }
  }
};

exports.default = screenConfig;