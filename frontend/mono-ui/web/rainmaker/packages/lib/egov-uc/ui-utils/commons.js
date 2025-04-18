"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findItemInArrayOfObject = exports.getSearchResults = exports.getChallanSearchResult = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require("./api");

var _utils = require("../ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _store = require("../ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons2 = require("egov-ui-kit/utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getChallanSearchResult = exports.getChallanSearchResult = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.httpRequest)("post", "echallan-services/eChallan/v1/_search", "", queryObject);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message, labelCode: _context.t0.message }, "error"));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getChallanSearchResult(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getSearchResults = exports.getSearchResults = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject) {
    var businessService, response, _response, _response2;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            businessService = '';

            queryObject && Array.isArray(queryObject) && queryObject.map(function (query) {
              if (query.key == "businessServices") {
                businessService = query.value;
                if ((typeof businessService === "undefined" ? "undefined" : (0, _typeof3.default)(businessService)) == 'object') {
                  query.value = businessService.join();
                }
              }
            });

            if (!(typeof businessService == 'string')) {
              _context3.next = 10;
              break;
            }

            _context3.next = 6;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)(businessService), "", queryObject);

          case 6:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 10:
            if (!(process.env.REACT_APP_NAME === "Citizen")) {
              _context3.next = 17;
              break;
            }

            _context3.next = 13;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)('-1'), "", queryObject);

          case 13:
            _response = _context3.sent;
            return _context3.abrupt("return", _response);

          case 17:
            if (!((typeof businessService === "undefined" ? "undefined" : (0, _typeof3.default)(businessService)) == 'object')) {
              _context3.next = 23;
              break;
            }

            _response2 = { "Payments": [] };

            businessService.map(function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(businessSer) {
                var _response2$Payments, respo;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)(businessSer), "", queryObject);

                      case 3:
                        respo = _context2.sent;

                        (_response2$Payments = _response2.Payments).push.apply(_response2$Payments, (0, _toConsumableArray3.default)(respo.Payments));

                        _context2.next = 10;
                        break;

                      case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);

                        console.log(_context2.t0);

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined, [[0, 7]]);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());

            if (!(_response2.Payments.length == 0)) {
              _context3.next = 22;
              break;
            }

            throw { message: 'PAYMENT_SEARCH_FAILED' };

          case 22:
            return _context3.abrupt("return", _response2);

          case 23:
            _context3.next = 30;
            break;

          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](0);

            (0, _commons.enableFieldAndHideSpinner)('search', "components.div.children.UCSearchCard.children.cardContent.children.buttonContainer.children.searchButton", _store2.default.dispatch);
            console.error(_context3.t0);
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context3.t0.message, labelCode: _context3.t0.message }, "error"));

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 25]]);
  }));

  return function getSearchResults(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};