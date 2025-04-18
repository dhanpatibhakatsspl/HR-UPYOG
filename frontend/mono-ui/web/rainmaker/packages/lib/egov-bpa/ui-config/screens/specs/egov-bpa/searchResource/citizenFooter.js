"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.citizenFooter = exports.sendToArchContainer = exports.updateBpaApplication = exports.bpaMakePayment = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _commons2 = require("../../../../../ui-utils/commons");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");

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

var bpaMakePayment = exports.bpaMakePayment = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var status, riskType, billbService, makePaymentUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            status = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.status");
            riskType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.riskType");
            billbService = void 0;

            if (riskType === "LOW") {
              billbService = "BPA.LOW_RISK_PERMIT_FEE";
            } else {
              billbService = status == "PENDING_APPL_FEE" ? "BPA.NC_APP_FEE" : "BPA.NC_SAN_FEE";
            }
            makePaymentUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/egov-bpa/citizen-pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant + "&businessService=" + billbService : "/egov-common/pay?consumerCode=" + applicationNumber + "&tenantId=" + tenant + "&businessService=" + billbService;

            dispatch((0, _actions.setRoute)(makePaymentUrl));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function bpaMakePayment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var updateBpaApplication = exports.updateBpaApplication = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, action) {
    var bpaStatus, isDeclared, bpaAction, isArchitect, isCitizen, isCitizenBack, bpaStatusAction, toggle, errorMessage;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            bpaStatus = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.status");
            isDeclared = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.isDeclared");
            bpaAction = void 0, isArchitect = false, isCitizen = false, isCitizenBack = false;

            if (action && action === "SEND_TO_ARCHITECT") {
              bpaAction = "SEND_TO_ARCHITECT", isArchitect = true;
            }
            if (action && action === "APPROVE") {
              bpaAction = "APPROVE", isCitizen = true;
            }
            bpaStatusAction = bpaStatus && bpaStatus.includes("CITIZEN_ACTION_PENDING");

            if (bpaStatusAction) {
              bpaAction = "FORWARD", isCitizenBack = true;
            }

            toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["search-preview"], "components.div.children.sendToArchPickerDialog.props.open", false);

            if (isDeclared && isCitizen || isArchitect || isCitizenBack) {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.sendToArchPickerDialog", "props.open", !toggle));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.sendToArchPickerDialog.children.dialogContent.children.popup.children.cityPicker.children.cityDropdown", "props.applicationAction", bpaAction));
            } else {
              errorMessage = {
                labelName: "Please confirm the declaration!",
                labelKey: "BPA_DECLARATION_COMMON_LABEL"
              };

              dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));
            }

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function updateBpaApplication(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var sendToArchContainer = exports.sendToArchContainer = function sendToArchContainer() {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: { textAlign: "right", display: "flex" }
    },
    children: {
      downloadMenu: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-bpa",
        componentPath: "MenuButton",
        props: {
          data: {
            label: { labelName: "Take Action", labelKey: "WF_TAKE_ACTION" },
            rightIcon: "arrow_drop_down",
            props: { variant: "contained", style: { height: "60px", color: "#fff", backgroundColor: "#FE7A51" } },
            menu: {}
          }
        }
      }
    }
  };
};
var citizenFooter = exports.citizenFooter = getCommonApplyFooter({
  makePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "MAKE PAYMENT",
        labelKey: "BPA_CITIZEN_MAKE_PAYMENT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: bpaMakePayment
    },
    roleDefination: {
      rolePath: "user-info.roles",
      action: "PAY"
    }
  },
  sendToArch: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      color: "primary",
      style: { justifyContent: "flex-end" }
    },
    children: {
      buttons: sendToArchContainer()
    },
    visible: false
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Submit",
        labelKey: "BPA_COMMON_BUTTON_SUBMIT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: _commons2.submitBpaApplication
    },
    roleDefination: {
      rolePath: "user-info.roles",
      action: "APPLY"
    }
  },
  forwardButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Forward",
        labelKey: "BPA_FORWARD_BUTTON"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: updateBpaApplication
    },
    roleDefination: {
      rolePath: "user-info.roles",
      action: "FORWARD"
    }
  }
});