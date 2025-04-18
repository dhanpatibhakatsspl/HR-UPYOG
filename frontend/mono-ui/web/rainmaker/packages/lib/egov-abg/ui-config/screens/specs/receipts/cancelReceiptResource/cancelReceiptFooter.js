"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewReceiptFooter = exports.cancelReceiptFooter = exports.getRedirectionURL = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _lodash = require("lodash");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("EMPLOYEE") ? "/uc/pay" : "/inbox";
  return redirectionURL;
};

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var cancelReceiptFooter = exports.cancelReceiptFooter = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: "Previous Step",
        labelKey: "CR_PREV_STEP_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        // processDemand(state, dispatch);
        dispatch((0, _actions.setRoute)("/receipts/viewReceipt?receiptNumbers=" + (0, _commons.getQueryArg)(window.location.href, "receiptNumbers") + "&tenantId=" + (0, _commons.getQueryArg)(window.location.href, "tenantId") + "&edit=true&businessService=" + (0, _commons.getQueryArg)(window.location.href, "businessService")));
      }
    },
    visible: true
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "CANCEL RECEIPT",
        labelKey: "CR_CANCEL_RECEIPT_BUTTON"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        // processDemand(state, dispatch);

        cancelReceipt(state, dispatch);
        // dispatch(setRoute(`/receipts/acknowledgement?purpose=apply&status=success`));
      }
    }
  }
});
var viewReceiptFooter = exports.viewReceiptFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "CANCEL RECEIPT",
        labelKey: "CR_NEXT_STEP_BUTTON"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        // processDemand(state, dispatch);
        dispatch((0, _actions.setRoute)("/receipts/cancelReceipt?receiptNumbers=" + (0, _commons.getQueryArg)(window.location.href, "receiptNumbers") + "&tenantId=" + (0, _commons.getQueryArg)(window.location.href, "tenantId") + "&businessService=" + (0, _commons.getQueryArg)(window.location.href, "businessService")));
      }
    }
  }
});

var cancelReceipt = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var isFormValid, paymentWorkflows, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isFormValid = (0, _utils2.validateFields)("components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children", state, dispatch, "cancelReceipt");
            paymentWorkflows = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'paymentWorkflows', []);

            if (!(isFormValid && paymentWorkflows && Array.isArray(paymentWorkflows) && paymentWorkflows.length > 0)) {
              _context.next = 20;
              break;
            }

            _context.prev = 3;

            dispatch((0, _actions2.showSpinner)());
            (0, _lodash.set)(paymentWorkflows[0], 'action', 'CANCEL');
            (0, _lodash.set)(paymentWorkflows[0], 'tenantId', (0, _commons.getQueryArg)(window.location.href, "tenantId"));
            (0, _lodash.set)(paymentWorkflows[0], 'paymentId', (0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'PaymentReceipt.id', ''));
            _context.next = 10;
            return (0, _api.httpRequest)("post", "" + _endPoints.PAYMENTSEARCH.GET.URL + (0, _commons.getQueryArg)(window.location.href, "businessService") + "/_workflow", "_search", [], { paymentWorkflows: paymentWorkflows });

          case 10:
            payload = _context.sent;

            if (payload) {
              dispatch((0, _actions2.hideSpinner)());
              //  getCommonPayUrl(dispatch, applicationNumber, tenantId, businessService);
              dispatch((0, _actions.setRoute)("/receipts/acknowledgement?purpose=apply&receiptNumbers=" + (0, _commons.getQueryArg)(window.location.href, "receiptNumbers") + "&status=success"));
            }
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);

            dispatch((0, _actions2.hideSpinner)());
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill the required fields.",
              labelKey: _context.t0.message
            }, "error"));

          case 18:
            _context.next = 21;
            break;

          case 20:
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill the required fields.",
              labelKey: "CR_REQUIRED_FIELDS_ERROR_MSG"
            }, "info"));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 14]]);
  }));

  return function cancelReceipt(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();