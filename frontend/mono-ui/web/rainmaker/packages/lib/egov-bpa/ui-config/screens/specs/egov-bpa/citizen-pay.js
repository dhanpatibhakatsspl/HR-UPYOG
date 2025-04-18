"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _estimateDetails = require("./payResource/estimate-details");

var _estimateDetails2 = _interopRequireDefault(_estimateDetails);

var _footer = require("./payResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Application for BPA (" + (0, _utils2.getCurrentFinancialYear)() + ")", //later use getFinancialYearDates
    labelKey: "BPA_COMMON_APPLY_BPA"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bpa",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
    }
  }
});

var fetchBill = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, applicationNumber, tenantId) {
    var payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils2.generateBill)(dispatch, applicationNumber, tenantId);

          case 2:
            payload = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails[0]");

            //Collection Type Added in CS v1.1

            payload && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].collectionType", "COUNTER"));

            if ((0, _get2.default)(payload, "totalAmount") != undefined) {
              //set amount paid as total amount from bill - destination changed in CS v1.1
              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid", payload.totalAmount));
              //set total amount in instrument
              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.amount", payload.totalAmount));
            }

            //Initially select instrument type as Cash
            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.instrumentType.name", "Cash"));

            //set tenantId
            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].tenantId", tenantId));

            //set tenantId in instrument
            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.tenantId", tenantId));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchBill(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var loadBpaData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, applicationNumber, tenantId) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _commons2.getAppSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNos", value: applicationNumber }]);

          case 2:
            response = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("BPA", (0, _get2.default)(response, "BPA", [])));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function loadBpaData(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    loadBpaData(dispatch, applicationNumber, tenantId);
    fetchBill(state, dispatch, applicationNumber, tenantId);
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
                labelKey: "BPA_PAYMENT_HEAD"
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