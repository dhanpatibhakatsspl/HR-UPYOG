"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("../../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchData = exports.fetchData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var queryObject, responseWater, responseSewerage, water, sewerage, finalArray, myConnectionsResult;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{
              key: "mobileNumber",
              value: JSON.parse((0, _localStorageUtils.getUserInfo)()).mobileNumber
            }, {
              key: "tenantId",
              value: JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity ? JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity : JSON.parse((0, _localStorageUtils.getUserInfo)()).roles[0].tenantId
            }];
            responseWater = [], responseSewerage = [];
            _context.prev = 2;
            _context.next = 5;
            return (0, _commons.getWSMyResults)(queryObject, 'CONNECTION', dispatch);

          case 5:
            responseWater = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            responseWater = [];

          case 11:
            _context.prev = 11;
            _context.next = 14;
            return (0, _commons.getSWMyResults)(queryObject, 'CONNECTION', dispatch);

          case 14:
            responseSewerage = _context.sent;
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context["catch"](11);
            responseSewerage = [];

          case 20:
            try {
              water = responseWater && responseWater.WaterConnection ? responseWater.WaterConnection : [];
              sewerage = responseSewerage && responseSewerage.SewerageConnections ? responseSewerage.SewerageConnections : [];
              finalArray = water.concat(sewerage);

              if (finalArray !== undefined && finalArray !== null) {
                myConnectionsResult = finalArray.filter(function (item) {
                  return item.connectionNo !== "NA" && item.connectionNo !== null;
                });

                dispatch((0, _actions.prepareFinalObject)("myApplicationsCount", myConnectionsResult.length));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("home", "components.div.children.listCard1.props", "Count", finalArray.length ? finalArray.length : 0));
              }
            } catch (error) {}

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 8], [11, 17]]);
  }));

  return function fetchData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();