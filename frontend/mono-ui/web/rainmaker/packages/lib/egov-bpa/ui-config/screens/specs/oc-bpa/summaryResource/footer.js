"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons = require("../../../../../ui-utils/commons");

var _utils2 = require("../../utils");

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateBpaApplication = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var bpaStatus, bpaAction, response, applicationNumber, tenantId, acknowledgementUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bpaStatus = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.status");
            bpaAction = void 0;

            if (bpaStatus == "INITIATED") {
              bpaAction = "SEND_TO_CITIZEN";
            } else {
              bpaAction = "APPLY";
            }
            _context.next = 5;
            return (0, _commons.createUpdateBpaApplication)(state, dispatch, bpaAction);

          case 5:
            response = _context.sent;
            applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.applicationNo");
            tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.landInfo.address.city");

            if ((0, _get2.default)(response, "status", "") === "success") {
              acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/egov-bpa/acknowledgement?purpose=" + bpaAction + "&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/egov-bpa/acknowledgement?purpose=" + bpaAction + "&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

              dispatch((0, _actions.setRoute)(acknowledgementUrl));
            }

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateBpaApplication(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var footer = exports.footer = (0, _utils2.getCommonApplyFooter)({
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "SUBMIT",
        labelKey: "BPA_COMMON_BUTTON_SUBMIT"
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
      callBack: updateBpaApplication
    }
  },
  sendToCitizen: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "SEND TO CITIZEN",
        labelKey: "BPA_SEND_TO_CITIZEN_BUTTON"
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
      callBack: updateBpaApplication
    }
  }
});