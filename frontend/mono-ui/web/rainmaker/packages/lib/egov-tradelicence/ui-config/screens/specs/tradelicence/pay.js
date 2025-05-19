"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("./payResource/footer");

var _estimateDetails = require("./payResource/estimate-details");

var _estimateDetails2 = _interopRequireDefault(_estimateDetails);

var _g8Details = require("./payResource/g8-details");

var _g8Details2 = _interopRequireDefault(_g8Details);

var _capturePaymentDetails = require("./payResource/capture-payment-details");

var _capturePaymentDetails2 = _interopRequireDefault(_capturePaymentDetails);

var _adhocPopup = require("./applyResource/adhocPopup");

var _utils2 = require("../utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import store from "egov-ui-framework/ui-redux/store";

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Payment for New Trade License (2018-2019)",
    labelKey: "TL_COMMON_PAYMENT_NEW_LIC"
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
    dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0]", []));
    dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument", {}));
    (0, _utils2.fetchBill)(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "pay"
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
                labelName: "Payment Collection Details",
                labelKey: "TL_PAYMENT_HEAD"
              }),
              // paragraph: getCommonParagraph({
              //   labelName: ""
              // }),
              estimateDetails: _estimateDetails2.default,
              addPenaltyRebateButton: {
                componentPath: "Button",
                props: {
                  color: "primary",
                  style: {}
                },
                children: {
                  previousButtonLabel: (0, _utils.getLabel)({
                    labelName: "ADD REBATE/PENALTY",
                    labelKey: "TL_PAYMENT_ADD_RBT_PEN"
                  })
                },
                onClickDefination: {
                  action: "condition",
                  callBack: _utils2.showHideAdhocPopup
                }
              },
              viewBreakupButton: (0, _utils2.getDialogButton)("VIEW BREAKUP", "TL_PAYMENT_VIEW_BREAKUP", "pay"),
              capturePaymentDetails: _capturePaymentDetails2.default,
              g8Details: _g8Details2.default
            })
          }
        },
        footer: _footer.footer
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: "sm",
        screenKey: "pay"
      },
      children: {
        popup: _adhocPopup.adhocPopup
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "pay"
      }
    }
  }
};

exports.default = screenConfig;