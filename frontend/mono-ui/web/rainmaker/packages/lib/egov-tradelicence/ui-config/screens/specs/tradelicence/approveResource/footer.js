"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footerApprove = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _utils2 = require("../../utils");

var _commons = require("../../../../../ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userName = JSON.parse(window.getUserInfo()).name;

var onNextButtonClick = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var screenConfiguration, preparedFinalObject, Licenses, queryValue, status, response, applicationNumber, secondNumber, tenantId, route;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            screenConfiguration = state.screenConfiguration;
            preparedFinalObject = screenConfiguration.preparedFinalObject;
            Licenses = preparedFinalObject.Licenses;
            queryValue = (0, _commons2.getQueryArg)(window.location.href, "purpose");

            if (!(Licenses && Licenses.length > 0)) {
              _context.next = 15;
              break;
            }

            status = (0, _get2.default)(Licenses[0], "status");
            _context.t0 = queryValue;
            _context.next = _context.t0 === "cancel" ? 9 : _context.t0 === "reject" ? 11 : 13;
            break;

          case 9:
            if (status === "APPROVED") {
              (0, _set2.default)(Licenses[0], "action", "CANCEL");
            }
            return _context.abrupt("break", 15);

          case 11:
            if (status === "PAID") {
              (0, _set2.default)(Licenses[0], "action", "REJECT");
            }
            return _context.abrupt("break", 15);

          case 13:
            if (status === "PAID") {
              (0, _set2.default)(Licenses[0], "action", "APPROVE");
            }
            return _context.abrupt("break", 15);

          case 15:
            if (!(0, _get2.default)(preparedFinalObject, (0, _utils2.getCheckBoxJsonpath)(queryValue))) {
              _context.next = 31;
              break;
            }

            _context.t1 = queryValue;
            _context.next = _context.t1 === "cancel" ? 19 : _context.t1 === "reject" ? 21 : 23;
            break;

          case 19:
            dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.cancelledBy", userName));
            return _context.abrupt("break", 25);

          case 21:
            dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.rejectedBy", userName));
            return _context.abrupt("break", 25);

          case 23:
            dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.approvedBy", userName));
            return _context.abrupt("break", 25);

          case 25:
            _context.next = 27;
            return (0, _commons.updateTradeDetails)({ Licenses: Licenses });

          case 27:
            response = _context.sent;

            if (response) {
              applicationNumber = (0, _get2.default)(response, "Licenses[0].applicationNumber");
              secondNumber = (0, _get2.default)(response, "Licenses[0].licenseNumber");
              tenantId = (0, _get2.default)(response, "Licenses[0].tenantId");
              route = (0, _utils2.onClickNextButton)(applicationNumber, secondNumber, queryValue, tenantId);

              dispatch((0, _actions2.setRoute)(route));
            } else {
              response && response.Error && response.Error[0] && dispatch((0, _actions.toggleSnackbar)(true, (0, _get2.default)("response", Error[0].message), "error"));
            }
            _context.next = 32;
            break;

          case 31:
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please accept the terms !",
              labelKey: "ERR_ACCEPT_THE_TERMS"
            }, "error"));

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function onNextButtonClick(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var footerApprove = exports.footerApprove = function footerApprove(applicationNumber, tenantId, queryPurpose) {
  return (0, _utils2.getCommonApplyFooter)({
    previousButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px",
          marginRight: "16px",
          borderRadius: "inherit"
        }
      },
      children: {
        nextButtonLabel: (0, _utils.getLabel)({
          labelName: "BACK",
          labelKey: "TL_COMMON_BUTTON_BACK"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: (0, _utils2.onClickPreviousButton)(queryPurpose, applicationNumber, tenantId)
      }
    },

    nextButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px",
          marginRight: "45px",
          borderRadius: "inherit"
        }
      },
      children: {
        nextButtonLabel: (0, _utils2.getFooterButtons)(queryPurpose)
      },
      onClickDefination: {
        action: "condition",
        callBack: onNextButtonClick
      }
    }
  });
};