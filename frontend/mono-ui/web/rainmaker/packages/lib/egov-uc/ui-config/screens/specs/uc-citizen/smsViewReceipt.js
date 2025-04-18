"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _recieptPdf = require("../utils/recieptPdf");

var _commons2 = require("egov-common/ui-utils/commons");

var _commons3 = require("../../../../ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchAndGenerate = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, receiptNo, tenantId) {
    var queryObj, response, receiptQueryString;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObj = [{
              key: "receiptNumbers",
              value: receiptNo
            }, {
              key: "tenantId",
              value: tenantId
            }];
            _context.next = 3;
            return (0, _commons3.getSearchResults)(queryObj);

          case 3:
            response = _context.sent;

            if (response && response.Payments && response.Payments.length) {
              dispatch((0, _actions.prepareFinalObject)("receiptSearchResponse", response));
              receiptQueryString = [{ key: "receiptNumbers", value: receiptNo }, { key: "tenantId", value: tenantId }];

              (0, _commons2.download)(receiptQueryString);
            } else {
              dispatch((0, _actions.toggleSnackbar)(true, {
                labelName: "No receipt found !",
                labelKey: "UC_CITIZEN_NO_RECEIPT_FOUND"
              }, "error"));
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchAndGenerate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var ucViewReceipt = {
  uiFramework: "material-ui",
  name: "viewReceiptFromSMS",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    // const mobileNo = getQueryArg(window.location.href, "mobileNo");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var receiptNo = (0, _commons.getQueryArg)(window.location.href, "receiptNo");
    fetchAndGenerate(dispatch, receiptNo, tenantId);

    return action;
  },
  components: {
    div: {}
  }
};

exports.default = ucViewReceipt;