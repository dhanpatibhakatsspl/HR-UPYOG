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

var _api = require("egov-ui-framework/ui-utils/api");

var _billDetails = require("./payResource/billDetails");

var _amount = require("./payResource/amount");

var _capturePayment = require("./payResource/capturePayment");

var _G8ReceiptDetails = require("./payResource/G8ReceiptDetails");

var _footer = require("./payResource/footer");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, billId, tenantId) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return searchBill(state, dispatch, billId, tenantId);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getAllData(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var searchBill = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, billId, tenantId) {
    var payload, estimateData, amount;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/_search?billId=" + billId + "&tenantId=" + tenantId, "", [], {});

          case 3:
            payload = _context2.sent;

            if (payload && payload.Bill[0]) {
              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill", payload.Bill));
              estimateData = createEstimateData(payload.Bill[0]);

              estimateData && estimateData.length && dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));

              amount = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails[0].totalAmount", null);

              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument", {
                amount: amount,
                instrumentType: { name: "Cash" },
                tenantId: tenantId
              }));
              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].collectionType", "COUNTER"));
              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid", amount));
              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].amountPaid", amount));
              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].tenantId", tenantId));
            }
            _context2.next = 9;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function searchBill(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var createEstimateData = function createEstimateData(billObject) {
  var billDetails = billObject && billObject.billDetails;
  var fees = billDetails && billDetails[0].billAccountDetails && billDetails[0].billAccountDetails.map(function (item) {
    return {
      name: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode },
      value: item.amount,
      info: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode }
    };
  });
  return fees;
};

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Universal Bill",
    labelKey: "ABG_UNIVERSAL_BILL_COMMON_HEADER"
  }),
  billNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-abg",
    componentPath: "BillNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "billNumber")
    }
  }
});

var generateBill = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch, consumerCode, tenantId, businessService) {
    var payload, billId, estimateData;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/_search?consumerCode=" + consumerCode + "&service=" + businessService + "&tenantId=" + tenantId, "", [], {});

          case 3:
            payload = _context3.sent;
            billId = (0, _get2.default)(payload, "Bill", []).length - 1;

            if (payload && payload.Bill[billId]) {
              dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill", payload.Bill));
              estimateData = createEstimateData(payload.Bill[billId]);

              estimateData && estimateData.length && dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));
              dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.consumerCode", consumerCode));
              dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.businessService", businessService));
              // dispatch(setRoute(`/uc/pay?tenantId=${tenantId}`));
            }
            _context3.next = 10;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 8]]);
  }));

  return function generateBill(_x9, _x10, _x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var billId = (0, _commons.getQueryArg)(window.location.href, "billId");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    getAllData(state, dispatch, billId, tenantId);

    // if (applicationNumber)
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
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
        body: (0, _utils.getCommonCard)({
          billDetails: _billDetails.billDetails,
          amount: _amount.amountToBePaid,
          capturePayment: _capturePayment.capturePayment,
          G8ReceiptDetails: _G8ReceiptDetails.G8ReceiptDetails
          // breakAfterCard: getBreak()
        }),
        footer: _footer.footer
      }
    }
  }
};

exports.default = screenConfig;