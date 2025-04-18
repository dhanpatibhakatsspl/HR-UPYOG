"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadPdfFile = exports.commonApiPost = exports.loginRequest = exports.uploadFile = exports.httpRequest = exports.multiHttpRequest = undefined;

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

var _actions = require("egov-ui-kit/redux/common/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _some = require("lodash/some");

var _some2 = _interopRequireDefault(_some);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("./commons");

var _localStorageUtils2 = require("./localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.data && error.response.data.location) {
    window.location = error.response.data.location;
  } else {
    return Promise.reject(error);
  }
});

var instance = _axios2.default.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json"
  }
});

var wrapRequestBody = function wrapRequestBody(requestBody, action, customRequestInfo) {
  var authToken = (0, _localStorageUtils.getAccessToken)();

  var RequestInfo = {
    apiId: "Rainmaker",
    ver: ".01",
    ts: "",
    action: action,
    did: "1",
    key: "",
    msgId: "20170310130900|" + (0, _localStorageUtils.getLocale)(),
    // requesterId: "",
    authToken: authToken
  };
  RequestInfo = (0, _extends3.default)({}, RequestInfo, customRequestInfo);
  return Object.assign({}, {
    RequestInfo: RequestInfo
  }, requestBody);
};

var multiHttpRequest = exports.multiHttpRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var endPoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];
    var queryObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var customRequestInfo = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

    var apiError, response, responseStatus, _error$response$, data, status;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            apiError = "Api Error";


            if (headers) instance.defaults = Object.assign(instance.defaults, {
              headers: headers
            });

            _context.prev = 2;
            _context.next = 5;
            return _axios2.default.all(requestBody.map(function (requestB, index) {
              if (queryObject && queryObject[index] && queryObject[index].length) {
                endPoint[index] = (0, _commons2.addQueryArg)(endPoint[index], queryObject[index]);
              }
              return instance.post(endPoint[index], wrapRequestBody(requestB, action, customRequestInfo));
            }));

          case 5:
            response = _context.sent;
            responseStatus = parseInt(response && Array.isArray(response) && response.length > 0 && response[0] && response[0].status, 10);

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", response && response.map(function (resp) {
              return resp.data;
            }));

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            _error$response$ = _context.t0.response[0], data = _error$response$.data, status = _error$response$.status;

            if ((0, _commons2.hasTokenExpired)(status, data)) {
              apiError = "INVALID_TOKEN";
            } else {
              apiError = data.hasOwnProperty("Errors") && data.Errors && data.Errors.length && data.Errors[0].message || data.hasOwnProperty("error") && data.error.fields && data.error.fields.length && data.error.fields[0].message || data.hasOwnProperty("error_description") && data.error_description || apiError;
            }

          case 15:
            throw new Error(apiError);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 11]]);
  }));

  return function multiHttpRequest() {
    return _ref.apply(this, arguments);
  };
}();

var httpRequest = exports.httpRequest = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(endPoint, action) {
    var queryObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var customRequestInfo = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    var ignoreTenantId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var isGetMethod = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    var tenantId, apiError, getResponse, getResponseStatus, response, responseStatus, _error$response, data, status;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            /* const tenantId = getTenantId() || commonConfig.tenantId; */
            /* Fix for central instance to send tenantID in all query params  */
            tenantId = process.env.REACT_APP_NAME === "Citizen" ? _common2.default.tenantId : (endPoint && endPoint.includes("mdms") ? _common2.default.tenantId : (0, _localStorageUtils.getTenantId)()) || _common2.default.tenantId;
            apiError = "Api Error";


            if (headers) instance.defaults = Object.assign(instance.defaults, {
              headers: headers
            });

            /* if (!some(queryObject, ["key", "tenantId"]) && !ignoreTenantId) { */
            /* Fix for central instance to send tenantID in all query params  */
            if (!(0, _some2.default)(queryObject, ["key", "tenantId"])) {
              _common2.default.singleInstance && endPoint && !endPoint.includes("tenantId") && queryObject && queryObject.push({
                key: "tenantId",
                value: tenantId
              });
            }
            if (queryObject && queryObject.length) {
              endPoint = (0, _commons2.addQueryArg)(endPoint, queryObject);
            }

            _context2.prev = 5;

            if (!isGetMethod) {
              _context2.next = 15;
              break;
            }

            _context2.next = 9;
            return instance.get(endPoint, wrapRequestBody(requestBody, action, customRequestInfo));

          case 9:
            getResponse = _context2.sent;
            getResponseStatus = parseInt(getResponse.status, 10);

            if (!(getResponseStatus === 200 || getResponseStatus === 201)) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", getResponse.data);

          case 13:
            _context2.next = 21;
            break;

          case 15:
            _context2.next = 17;
            return instance.post(endPoint, wrapRequestBody(requestBody, action, customRequestInfo));

          case 17:
            response = _context2.sent;
            responseStatus = parseInt(response.status, 10);

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt("return", response.data);

          case 21:
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](5);
            _error$response = _context2.t0.response, data = _error$response.data, status = _error$response.status;

            if ((0, _commons2.hasTokenExpired)(status, data)) {
              apiError = "INVALID_TOKEN";
            } else {
              apiError = data.hasOwnProperty("Errors") && data.Errors && data.Errors.length && data.Errors[0].message || data.hasOwnProperty("error") && data.error.fields && data.error.fields.length && data.error.fields[0].message || data.hasOwnProperty("error_description") && data.error_description || apiError;
            }

          case 27:
            throw new Error(apiError);

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 23]]);
  }));

  return function httpRequest(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var uploadFile = exports.uploadFile = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(endPoint, module, file, ulbLevel) {
    var tenantId, uploadInstance, requestParams, requestBody, tenantInfo, response, responseStatus, fileStoreIds, responseData, files;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Bad idea to fetch from local storage, change as feasible
            tenantId = (0, _localStorageUtils.getTenantId)() ? ulbLevel ? _common2.default.tenantId : _common2.default.tenantId : "";
            uploadInstance = _axios2.default.create({
              baseURL: window.location.origin,
              headers: {
                "Content-Type": "multipart/form-data",
                "auth-token": (0, _localStorageUtils.getAccessToken)()
              }
            });
            requestParams = {
              tenantId: tenantId,
              module: module,
              file: file
            };
            requestBody = (0, _commons2.prepareForm)(requestParams);
            _context3.prev = 4;
            tenantInfo = _common2.default.singleInstance ? "?tenantId=" + _common2.default.tenantId : "";
            _context3.next = 8;
            return uploadInstance.post("" + endPoint + tenantInfo, requestBody);

          case 8:
            response = _context3.sent;
            responseStatus = parseInt(response.status, 10);
            fileStoreIds = [];

            if (!(responseStatus === 201)) {
              _context3.next = 16;
              break;
            }

            responseData = response.data;
            files = responseData.files || [];

            fileStoreIds = files.map(function (f) {
              return f.fileStoreId;
            });
            return _context3.abrupt("return", fileStoreIds[0]);

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](4);
            throw new Error(_context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[4, 18]]);
  }));

  return function uploadFile(_x14, _x15, _x16, _x17) {
    return _ref3.apply(this, arguments);
  };
}();

var loginRequest = exports.loginRequest = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var refreshToken = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var grantType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "password";
    var tenantId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var userType = arguments[5];

    var loginInstance, apiError, params, response, responseStatus, _error$response2, data, status;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tenantId = tenantId ? tenantId : _common2.default.tenantId;
            loginInstance = _axios2.default.create({
              baseURL: window.location.origin,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic ZWdvdi11c2VyLWNsaWVudDo="
              }
            });
            apiError = "Api Error";
            params = new URLSearchParams();

            username && params.append("username", username);
            password && params.append("password", password);
            refreshToken && params.append("refresh_token", refreshToken);
            params.append("grant_type", grantType);
            params.append("scope", "read");
            params.append("tenantId", tenantId);
            userType && params.append("userType", userType);

            _context4.prev = 11;
            _context4.next = 14;
            return loginInstance.post("/user/oauth/token", params);

          case 14:
            response = _context4.sent;
            responseStatus = parseInt(response.status, 10);

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context4.next = 19;
              break;
            }

            (0, _localStorageUtils2.setUserObj)(JSON.stringify(response.data.UserRequest));
            return _context4.abrupt("return", response.data);

          case 19:
            _context4.next = 25;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](11);
            _error$response2 = _context4.t0.response, data = _error$response2.data, status = _error$response2.status;

            if (status === 400) {
              apiError = data.hasOwnProperty("error_description") && data.error_description || apiError;
            }

          case 25:
            throw new Error(apiError);

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[11, 21]]);
  }));

  return function loginRequest() {
    return _ref4.apply(this, arguments);
  };
}();
var commonApiPost = exports.commonApiPost = function commonApiPost(context) {
  var queryObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var doNotOverride = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isTimeLong = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var noPageSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var authToken = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
  var userInfo = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "";
  var isStateLevel = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var offset = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

  // const RequestInfo = {
  //   apiId: "Rainmaker",
  //   ver: ".01",
  //   ts: "",
  //   did: "1",
  //   key: "",
  //   msgId: "20170310130900|en_IN",
  //   requesterId: "",
  //   authToken,
  // };
  var RequestInfo = {
    apiId: "emp",
    ver: "1.0",
    ts: "",
    action: "create",
    did: "1",
    key: "abcdkey",
    msgId: "20170310130900",
    requesterId: "",
    authToken: authToken
  };
  var url = context;
  if (url && url[url.length - 1] === "/") url = url.substring(0, url.length - 1);
  if (!doNotOverride) {
    if (url.split("?").length > 1) {
      url += "&tenantId=" + ((0, _localStorageUtils.getTenantId)() ? isStateLevel ? _common2.default.tenantId : _common2.default.tenantId : "default");
    } else {
      url += "?tenantId=" + ((0, _localStorageUtils.getTenantId)() ? isStateLevel ? _common2.default.tenantId : _common2.default.tenantId : "default");
    }
  } else {
    url += "?";
  }
  for (var variable in queryObject) {
    if (typeof queryObject[variable] !== "undefined") {
      url += "&" + variable + "=" + queryObject[variable];
    }
  }

  if (/_search/.test(context) && !noPageSize) {
    url += "&pageSize=200";
  } else {
    url += "&pageSize=" + noPageSize;
  }

  url += "&offset=" + offset;

  RequestInfo.authToken = (0, _localStorageUtils.getAccessToken)();
  if (isTimeLong) {
    RequestInfo.ts = new Date().getTime();
  }

  if (authToken) {
    RequestInfo["authToken"] = authToken;
  }

  body["RequestInfo"] = RequestInfo;

  if (userInfo) {
    body["RequestInfo"]["userInfo"] = userInfo;
  }

  return instance.post(url, body).then(function (response) {
    return response.data;
  }).catch(function (response) {
    try {
      if (response && response.response && response.response.data && response.response.data[0] && response.response.data[0].error) {
        var _err = response.response.data[0].error.message || "";
        if (response.response.data[0].error.errorFields && Object.keys(response.response.data[0].error.errorFields).length) {
          for (var i = 0; i < response.response.data[0].error.errorFields.length; i++) {
            _err += "\n " + response.response.data[0].error.errorFields[i].message + " ";
          }
          throw new Error(_err);
        }
      } else if (response && response.response && response.response.data && response.response.data.error) {
        // let _err = common.translate(response.response.data.error.fields[0].code);
        var _err2 = "";

        _err2 = response.response.data.error.message ? response.response.data.error.fields ? "a) " + extractErrorMsg(response.response.data.error, "message", "description") + " : " : extractErrorMsg(response.response.data.error, "message", "description") : "";
        var fields = response.response.data.error.fields || [];
        for (var i = 0; i < fields.length; i++) {
          _err2 += i + 1 + ") " + extractErrorMsg(fields[i], "code", "message") + ".";
        }
        throw new Error(_err2);
      } else if (response && response.response && response.response.data && response.response.data.Errors) {
        // let _err = common.translate(response.response.data.error.fields[0].code);
        var _err3 = "";
        // _err=response.response.data.error.message?"a) "+extractErrorMsg(response.response.data.error, "message", "description")+" : ":"";
        // let fields=response.response.data.error.fields;
        if (response.response.data.Errors.length == 1) {
          if (response.response.data.Errors[0].message.includes("InvalidAccessTokenException")) {
            throw new Error((0, _commons.getLocaleLabels)("InvalidAccessTokenException"));
          }
          _err3 += (0, _commons.getLocaleLabels)(response.response.data.Errors[0].message) + ".";
        } else {
          for (var i = 0; i < response.response.data.Errors.length; i++) {
            _err3 += i + 1 + ") " + (0, _commons.getLocaleLabels)(response.response.data.Errors[i].message) + ".";
          }
        }

        throw new Error(_err3);
      } else if (response && response.response && response.response.data && response.response.data.hasOwnProperty("Data")) {
        var _err4 = (0, _commons.getLocaleLabels)(response.response.data.Message) + ".";
        throw new Error(_err4);
      } else if (response && response.response && !response.response.data && response.response.status === 400) {
        if (counter == 0) {
          document.title = "eGovernments";
          var locale = (0, _localStorageUtils.getLocale)();
          var _tntId = (0, _localStorageUtils.getTenantId)() || "default";
          var lang_response = (0, _localStorageUtils.localStorageGet)("lang_response");
          localStorage.clear();
          sessionStorage.clear();
          (0, _localStorageUtils.setLocale)(locale);
          (0, _localStorageUtils.setTenantId)(_tntId);
          (0, _localStorageUtils.localStorageSet)("lang_response", lang_response);
          alert("Session expired. Please login again.");
          //localStorage.reload = true;
          throw new Error("");
        }
      } else if (response) {
        throw new Error("Oops! Something isn't right. Please try again later.");
      } else {
        throw new Error("Server returned unexpected error. Please contact system administrator.");
      }
    } catch (e) {
      if (e.message) {
        throw new Error(e.message);
      } else throw new Error("Oops! Something isn't right. Please try again later.");
    }
  });
};

var downloadPdf = function downloadPdf(blob, fileName) {
  if (window.mSewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      mSewaApp.downloadBase64File(base64data, fileName);
    };
  } else {
    var link = document.createElement("a");
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(function () {
      return URL.revokeObjectURL(link.href);
    }, 7000);
  }
};

var printPdf = function printPdf(blob) {
  if (window.mSewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      mSewaApp.downloadBase64File(base64data, 'download.pdf');
    };
  } else {
    var fileURL = URL.createObjectURL(blob);
    var myWindow = window.open(fileURL);
    if (myWindow != undefined) {
      myWindow.addEventListener("load", function (event) {
        myWindow.focus();
        myWindow.print();
      });
    }
  }
};

var downloadPdfFile = exports.downloadPdfFile = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(endPoint, action) {
    var queryObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var customRequestInfo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var ignoreTenantId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var fileName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "download.pdf";
    var onSuccess = arguments[7];
    var tenantId, downloadInstance, response, responseStatus;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            tenantId = (0, _localStorageUtils.getTenantId)() || _common2.default.tenantId;
            downloadInstance = _axios2.default.create({
              baseURL: window.location.origin,
              responseType: "arraybuffer",
              headers: {
                "Content-Type": "application/json",
                Accept: _common2.default.singleInstance ? "application/pdf,application/json" : "application/pdf"
              }
            });


            if (!(0, _some2.default)(queryObject, ["key", "tenantId"]) && !ignoreTenantId) {
              queryObject && queryObject.push({
                key: "tenantId",
                value: tenantId
              });
            }
            if (queryObject && queryObject.length) {
              endPoint = (0, _commons2.addQueryArg)(endPoint, queryObject);
            }
            _context5.prev = 4;

            _store2.default.dispatch((0, _actions.showSpinner)());
            _context5.next = 8;
            return downloadInstance.post(endPoint, wrapRequestBody(requestBody, action, customRequestInfo));

          case 8:
            response = _context5.sent;
            responseStatus = parseInt(response.status, 10);


            if (responseStatus === 201 || responseStatus === 200) {
              fileName == "print" ? printPdf(new Blob([response.data], { type: "application/pdf" })) : downloadPdf(new Blob([response.data], { type: "application/pdf" }), fileName);
              onSuccess ? onSuccess() : {};
              _store2.default.dispatch((0, _actions.hideSpinner)());
            }
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](4);

            _store2.default.dispatch((0, _actions.hideSpinner)());
            throw new Error(_context5.t0);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[4, 13]]);
  }));

  return function downloadPdfFile(_x32, _x33) {
    return _ref5.apply(this, arguments);
  };
}();