"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutRequest = exports.loginRequest = exports.edcrHttpRequest = exports.httpRequest = exports.wrapRequestBody = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _some = require("lodash/some");

var _some2 = _interopRequireDefault(_some);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = _axios2.default.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json"
  }
});

var edcrInstance = _axios2.default.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json"
  }
});

var wrapRequestBody = exports.wrapRequestBody = function wrapRequestBody(requestBody, action, customRequestInfo) {
  var authToken = (0, _localStorageUtils.getAccessToken)();
  var RequestInfo = {
    apiId: "Rainmaker",
    ver: ".01",
    // ts: getDateInEpoch(),
    action: action,
    did: "1",
    key: "",
    msgId: "20170310130900|" + (0, _localStorageUtils.getLocale)(),
    requesterId: "",
    authToken: authToken
  };

  RequestInfo = (0, _extends3.default)({}, RequestInfo, customRequestInfo);
  return Object.assign({}, {
    RequestInfo: RequestInfo
  }, requestBody);
};

var wrapEdcrRequestBody = function wrapEdcrRequestBody(requestBody, action, customRequestInfo) {
  var authToken = (0, _localStorageUtils.getAccessToken)();
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var uuid = userInfo.uuid;
  var userInfos = {
    id: uuid,
    tenantId: (0, _localStorageUtils.getTenantId)()
  };

  var Ids = process.env.REACT_APP_NAME === "Citizen" && action != "search" ? userInfos : null;
  var usrInfo = action == "search" ? null : Ids;
  var RequestInfo = {
    apiId: "1",
    ver: "1",
    ts: "01-01-2017 01:01:01",
    action: "create",
    did: "jh",
    key: "",
    msgId: "gfcfc",
    correlationId: "wefiuweiuff897",
    authToken: authToken,
    userInfo: usrInfo
  };

  RequestInfo = (0, _extends3.default)({}, RequestInfo, customRequestInfo);
  return Object.assign({}, {
    RequestInfo: RequestInfo
  }, requestBody);
};

var httpRequest = exports.httpRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "get";
    var endPoint = arguments[1];
    var action = arguments[2];
    var queryObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var requestBody = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var headers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
    var customRequestInfo = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

    var apiError, tenantId, isTenantId, response, responseStatus, _error$response, data, status;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _store2.default.dispatch((0, _actions.toggleSpinner)());
            apiError = "Api Error";


            if (headers) instance.defaults = Object.assign(instance.defaults, {
              headers: headers
            });

            /* Fix for central instance to send tenantID in all query params  */
            tenantId = process.env.REACT_APP_NAME === "Citizen" ? _common2.default.tenantId : (endPoint && endPoint.includes("mdms") ? _common2.default.tenantId : (0, _localStorageUtils.getTenantId)()) || _common2.default.tenantId;
            isTenantId = true;

            if (queryObject && queryObject.length > 0) {
              queryObject.forEach(function (valueData) {
                if (valueData && isTenantId && valueData.key == "tenantId") isTenantId = false;
              });
            }

            if (!(0, _some2.default)(queryObject, ["key", "tenantId"]) && _common2.default.singleInstance && isTenantId && endPoint && !endPoint.includes("tenantId")) {
              queryObject && queryObject.push({
                key: "tenantId",
                value: tenantId
              });
            }
            endPoint = (0, _commons.addQueryArg)(endPoint, queryObject);
            _context.prev = 8;
            _context.t0 = method;
            _context.next = _context.t0 === "post" ? 12 : 16;
            break;

          case 12:
            _context.next = 14;
            return instance.post(endPoint, wrapRequestBody(requestBody, action, customRequestInfo));

          case 14:
            response = _context.sent;
            return _context.abrupt("break", 19);

          case 16:
            _context.next = 18;
            return instance.get(endPoint);

          case 18:
            response = _context.sent;

          case 19:
            responseStatus = parseInt(response.status, 10);

            _store2.default.dispatch((0, _actions.toggleSpinner)());

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", response.data);

          case 23:
            _context.next = 30;
            break;

          case 25:
            _context.prev = 25;
            _context.t1 = _context["catch"](8);
            _error$response = _context.t1.response, data = _error$response.data, status = _error$response.status;

            if (status === 400 && data === "") {
              apiError = "INVALID_TOKEN";
            } else {
              apiError = data.hasOwnProperty("Errors") && data.Errors && data.Errors.length && data.Errors[0].message || data.hasOwnProperty("error") && data.error.fields && data.error.fields.length && data.error.fields[0].message || data.hasOwnProperty("error_description") && data.error_description || apiError;
            }
            _store2.default.dispatch((0, _actions.toggleSpinner)());

          case 30:
            throw new Error(apiError);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8, 25]]);
  }));

  return function httpRequest() {
    return _ref.apply(this, arguments);
  };
}();

var edcrHttpRequest = exports.edcrHttpRequest = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "post";
    var endPoint = arguments[1];
    var action = arguments[2];
    var queryObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var requestBody = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var headers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
    var customRequestInfo = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

    var apiError, response, responseStatus, _error$response2, data, status;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _store2.default.dispatch((0, _actions.toggleSpinner)());
            apiError = "No Record Found";
            // const authToken = getAccessToken();
            // headers = { "Content-Type": "application/json", "auth-token": authToken }

            if (headers) edcrInstance.defaults = Object.assign(edcrInstance.defaults, {
              headers: headers
            });

            endPoint = (0, _commons.addQueryArg)(endPoint, queryObject);
            _context2.prev = 4;
            _context2.next = 7;
            return edcrInstance.post(endPoint, wrapEdcrRequestBody(requestBody, action, customRequestInfo));

          case 7:
            response = _context2.sent;
            responseStatus = parseInt(response.status, 10);

            _store2.default.dispatch((0, _actions.toggleSpinner)());

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", response.data);

          case 12:
            _context2.next = 19;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](4);
            _error$response2 = _context2.t0.response, data = _error$response2.data, status = _error$response2.status;

            if (status === 400 && data === "") {
              apiError = "INVALID_TOKEN";
            } else {
              apiError = data.hasOwnProperty("Errors") && data.Errors && data.Errors.length && data.Errors[0].message || data.hasOwnProperty("error") && data.error.fields && data.error.fields.length && data.error.fields[0].message || data.hasOwnProperty("error_description") && data.error_description || apiError;
            }
            _store2.default.dispatch((0, _actions.toggleSpinner)());

          case 19:
            throw new Error(apiError);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[4, 14]]);
  }));

  return function edcrHttpRequest() {
    return _ref2.apply(this, arguments);
  };
}();

var loginRequest = exports.loginRequest = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var apiError;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            apiError = "Api Error";
            _context3.prev = 1;

            // api call for login
            alert("Logged in");
            return _context3.abrupt("return");

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);

            apiError = _context3.t0.message;
            // alert(e.message);

          case 9:
            throw new Error(apiError);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  }));

  return function loginRequest() {
    return _ref3.apply(this, arguments);
  };
}();

var logoutRequest = exports.logoutRequest = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var apiError;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            apiError = "Api Error";
            _context4.prev = 1;

            alert("Logged out");
            return _context4.abrupt("return");

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](1);

            apiError = _context4.t0.message;
            // alert(e.message);

          case 9:
            throw new Error(apiError);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 6]]);
  }));

  return function logoutRequest() {
    return _ref4.apply(this, arguments);
  };
}();