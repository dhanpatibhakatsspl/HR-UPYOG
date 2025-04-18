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

var _cancelReceiptDetails = require("./cancelReceiptResource/cancelReceiptDetails");

var _cancelReceiptFooter = require("./cancelReceiptResource/cancelReceiptFooter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Cancel Receipt", //later use getFinancialYearDates
    labelKey: "CR_COMMON_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-abg",
    componentPath: "ApplicationContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "receiptNumbers"),
      label: {
        labelValue: "Receipt Details Receipt No.",
        labelKey: "CR_RECEIPT_DETAILS_NUMBER"
      }
    },
    visible: true
  }
});

var setSearchResponse = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, consumerNumber, businessService, tenantId) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _commons2.getPaymentSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, {
              key: "businessService",
              value: businessService
            }, { key: "receiptNumbers", value: consumerNumber }], dispatch);

          case 3:
            response = _context.sent;


            dispatch((0, _actions.prepareFinalObject)("PaymentReceipt", (0, _get2.default)(response, 'Payments[0]', {})));
            dispatch((0, _actions.prepareFinalObject)("PaymentReceipt.pendingAmountCalculated", Number((0, _get2.default)(response, 'Payments[0].totalDue', 0)) - Number((0, _get2.default)(response, 'Payments[0].totalAmountPaid', 0))));
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);

            // enableFieldAndHideSpinner('search',"components.div.children.UCSearchCard.children.cardContent.children.buttonContainer.children.searchButton",dispatch);
            console.error(_context.t0);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message, labelCode: _context.t0.message }, "error"));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function setSearchResponse(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var viewReceipt = {
  uiFramework: "material-ui",
  name: "viewReceipt",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {

    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "receiptNumbers");
    var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    setSearchResponse(state, dispatch, applicationNumber, businessService, tenantId);
    if ((0, _commons.getQueryArg)(window.location.href, "edit")) {} else {
      dispatch((0, _actions.prepareFinalObject)('paymentWorkflows', [{}]));
    }

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "viewReceipt"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6
              }
            }, header)
          }
        },
        viewReceiptDetailsCard: _cancelReceiptDetails.viewReceiptDetailsCard,
        viewReceiptFooter: _cancelReceiptFooter.viewReceiptFooter
      }
    }
  }
};

exports.default = viewReceipt;