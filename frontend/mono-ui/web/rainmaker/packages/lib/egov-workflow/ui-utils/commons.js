"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchResults = exports.getNextFinancialYearForRenewal = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require("egov-ui-framework/ui-utils/api");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _store = require("redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNextFinancialYearForRenewal = exports.getNextFinancialYearForRenewal = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(currentFinancialYear) {
    var payload, mdmsBody, financialYears, currrentFYending;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = null;
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantId)(),
                moduleDetails: [{
                  moduleName: "egf-master",
                  masterDetails: [{ name: "FinancialYear", filter: "[?(@.module == \"TL\")]" }]
                }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;
            financialYears = (0, _get2.default)(payload.MdmsRes, "egf-master.FinancialYear");
            currrentFYending = financialYears.filter(function (item) {
              return item.code === currentFinancialYear;
            })[0].endingDate;
            return _context.abrupt("return", financialYears.filter(function (item) {
              return item.startingDate === currrentFYending;
            })[0].code);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 11]]);
  }));

  return function getNextFinancialYearForRenewal(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getSearchResults = exports.getSearchResults = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(tenantId, licenseNumber) {
    var queryObject, response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, { key: "offset", value: "0" }, { key: "licenseNumbers", value: licenseNumber }];
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_search", "", queryObject);

          case 4:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelCode: _context2.t0.message }, "error"));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function getSearchResults(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();