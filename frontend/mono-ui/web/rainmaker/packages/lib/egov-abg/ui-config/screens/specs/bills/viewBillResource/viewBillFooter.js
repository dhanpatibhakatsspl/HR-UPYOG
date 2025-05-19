"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewBillFooter = exports.cancelBillFooter = exports.getRedirectionURL = undefined;

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

var _commons2 = require("egov-ui-framework/ui-utils/commons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("EMPLOYEE") ? "/inbox" : "/inbox";
  return redirectionURL;
};

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer", //window.location.href.includes("viewBill?connectionNumber") ? "footer-styles-bill-cancellation" : "footer-style-bill-cancellation"
      style: {
        padding: "14px"
      }
    },
    children: children
  };
};

var cancelBillFooter = exports.cancelBillFooter = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "270px",
        maxWidth: "360px",
        width: "100%",
        margin: "0px 5px 5px 0px",
        minHeight: "50px"
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
        labelName: "PREVIOUS STEP",
        labelKey: "PT_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        dispatch((0, _actions.setRoute)("/bills/viewBill?connectionNumber=" + (0, _commons.getQueryArg)(window.location.href, "consumerNumber") + "&tenantId=" + (0, _commons.getQueryArg)(window.location.href, "tenantId") + "&edit=true&service=" + (0, _commons.getQueryArg)(window.location.href, "service")));
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
        minWidth: "300px",
        maxWidth: "400px",
        width: "100%",
        margin: "0px 5px 5px 0px",
        minHeight: "50px"
      }
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "CANCEL BILL",
        labelKey: "ABG_UPPER_CANCEL_BILL"
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
        cancelReceipt(state, dispatch);
      }
    }
  }
});
var viewBillFooter = exports.viewBillFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "270px",
        maxWidth: "360px",
        width: "100%",
        marginRight: "10px",
        minHeight: "50px"
      }
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "NEXT STEP",
        labelKey: "WS_COMMON_BUTTON_NXT_STEP"
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
        var preparedFinalObject = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {});
        var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
        var service = (0, _commons.getQueryArg)(window.location.href, "service");
        var businessService = (0, _get2.default)(preparedFinalObject, "billData.businessService", "");
        var consumerNumber = (0, _get2.default)(preparedFinalObject, "billData.consumerCode", "");
        var billNumber = (0, _get2.default)(preparedFinalObject, "billData.billNumber", "");
        dispatch((0, _actions.setRoute)("/bills/cancelBill?consumerNumber=" + consumerNumber + "&tenantId=" + tenantId + "&businessService=" + businessService + "&service=" + service + "&billNumber=" + billNumber));
      }
    }
  }
});

var cancelReceipt = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var isFormValid, UpdateBillCriteria, descriptionCheck, UpdateBillCriteriaObj, additionalDetails, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isFormValid = (0, _utils2.validateFields)("components.div.children.cancelBillDetailsCard.children.cardContent.children.searchContainer.children", state, dispatch, "cancelBill");
            UpdateBillCriteria = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'UpdateBillCriteria', []);
            descriptionCheck = true;

            if (UpdateBillCriteria && UpdateBillCriteria.additionalDetails && UpdateBillCriteria.additionalDetails.reason == "OTHER") {
              if (UpdateBillCriteria && UpdateBillCriteria.additionalDetails && !UpdateBillCriteria.additionalDetails.description) descriptionCheck = false;else descriptionCheck = true;
            }

            if (!(UpdateBillCriteria && UpdateBillCriteria.additionalDetails && UpdateBillCriteria.additionalDetails.reason && descriptionCheck)) {
              _context.next = 28;
              break;
            }

            _context.prev = 5;

            dispatch((0, _actions2.showSpinner)());
            UpdateBillCriteriaObj = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.UpdateBillCriteria", {});

            (0, _lodash.set)(UpdateBillCriteria, "tenantId", (0, _commons.getQueryArg)(window.location.href, "tenantId"));
            (0, _lodash.set)(UpdateBillCriteria, "consumerCodes", [(0, _commons.getQueryArg)(window.location.href, "consumerNumber", "")]);
            (0, _lodash.set)(UpdateBillCriteria, "businessService", (0, _commons.getQueryArg)(window.location.href, "businessService"));
            additionalDetails = {};

            if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, 'UpdateBillCriteria.additionalDetails.reason', '') == "OTHER") {
              additionalDetails.reason = UpdateBillCriteriaObj.additionalDetails.reason;
              additionalDetails.description = UpdateBillCriteriaObj.additionalDetails.description;
            } else {
              additionalDetails.reason = UpdateBillCriteriaObj.additionalDetails.reason;
            }
            additionalDetails.reasonMessage = (0, _commons2.getLocaleLabels)("BC_REASON_" + UpdateBillCriteriaObj.additionalDetails.reason, "BC_REASON_" + UpdateBillCriteriaObj.additionalDetails.reason);
            (0, _lodash.set)(UpdateBillCriteria, "additionalDetails", additionalDetails);
            (0, _lodash.set)(UpdateBillCriteria, 'statusToBeUpdated', 'CANCELLED');

            _context.next = 18;
            return (0, _api.httpRequest)("post", "billing-service/bill/v2/_cancelbill", "_search", [], { UpdateBillCriteria: UpdateBillCriteria });

          case 18:
            payload = _context.sent;

            if (payload) {
              dispatch((0, _actions2.hideSpinner)());
              dispatch((0, _actions.setRoute)("/bills/acknowledgement?purpose=apply&status=success&consumerNumber=" + (0, _commons.getQueryArg)(window.location.href, "consumerNumber", "") + "&service=" + (0, _commons.getQueryArg)(window.location.href, "service", "") + "&billNo=" + (0, _commons.getQueryArg)(window.location.href, "billNumber", "")));
            }
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](5);

            dispatch((0, _actions2.hideSpinner)());
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill the required fields.",
              labelKey: _context.t0.message
            }, "error"));

          case 26:
            _context.next = 29;
            break;

          case 28:
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill the required fields.",
              labelKey: "CR_REQUIRED_FIELDS_ERROR_MSG"
            }, "info"));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 22]]);
  }));

  return function cancelReceipt(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();