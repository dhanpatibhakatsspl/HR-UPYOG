"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wfEsclationSearch = exports.getLocalityData = exports.getInboxConfig = exports.getMdmsData = exports.wfBusinessSearch = exports.wfSearch = exports.workflowSearch = exports.workflowSearchCount = exports.httpRequest = exports.cancelSignal = exports.getSignal = exports.getController = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = void 0;

var getController = exports.getController = function getController() {
  controller = controller ? controller : new AbortController();
  return controller;
};
var getSignal = exports.getSignal = function getSignal() {
  return getController().signal;
};
var cancelSignal = exports.cancelSignal = function cancelSignal() {
  getController().abort();
  controller = new AbortController();
};

var httpRequest = exports.httpRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(apiURL, body) {
    var myHeaders, raw, requestOptions, url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            myHeaders = new Headers();

            myHeaders.append("authority", "uat.digit.org");
            myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"");
            myHeaders.append("accept", "application/json, text/plain, */*");
            myHeaders.append("sec-ch-ua-mobile", "?0");
            myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36");
            myHeaders.append("content-type", "application/json;charset=UTF-8");
            myHeaders.append("origin", "https://uat.digit.org");
            myHeaders.append("sec-fetch-site", "same-origin");
            myHeaders.append("sec-fetch-mode", "cors");
            myHeaders.append("sec-fetch-dest", "empty");
            myHeaders.append("referer", "https://uat.digit.org/employee/inbox");
            myHeaders.append("accept-language", "en-US,en;q=0.9");

            raw = {
              "RequestInfo": {
                "apiId": "Rainmaker",
                "ver": ".01",
                "ts": "",
                "action": "_search",
                "did": "1",
                "key": "",
                "msgId": "20170310130900|en_IN",
                "authToken": localStorage.getItem("Employee.token")
              }
            };

            if (body) {
              raw = (0, _extends3.default)({}, raw, body);
            }

            requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(raw),
              redirect: 'follow',
              signal: getSignal()
            };
            url = window.location.origin;
            return _context.abrupt("return", fetch(url + "/" + apiURL, requestOptions).then(function (response) {
              return response.text();
            }).then(function (response) {
              if (response && !response.includes("InvalidAccessTokenException")) {
                return JSON.parse(response);
              } else {
                throw new Error("CANCELLED");
              }
            })
            //   .then(result => console.log(result))
            .catch(function (error) {
              console.error(error);return error;
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function httpRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var workflowSearchCount = exports.workflowSearchCount = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(businessService) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", httpRequest("egov-workflow-v2/egov-wf/process/_count?tenantId=" + localStorage.getItem("inb-tenantId") + "&businessService=" + businessService));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function workflowSearchCount(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var workflowSearch = exports.workflowSearch = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(businessService) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", wfSearch([{ key: "tenantId", value: localStorage.getItem("inb-tenantId") }, { key: "offset", value: "0" }, { key: "limit", value: "10" }, { key: "businessService", value: businessService }]));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function workflowSearch(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var wfSearch = exports.wfSearch = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var queryArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", httpRequest("egov-workflow-v2/egov-wf/process/_search?" + (0, _utils.convertQueryArgToString)(queryArg)));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function wfSearch() {
    return _ref4.apply(this, arguments);
  };
}();

var wfBusinessSearch = exports.wfBusinessSearch = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var queryArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", httpRequest("egov-workflow-v2/egov-wf/businessservice/_search?" + (0, _utils.convertQueryArgToString)(queryArg)));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function wfBusinessSearch() {
    return _ref5.apply(this, arguments);
  };
}();

var getMdmsData = exports.getMdmsData = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(mdmsCriteria) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", httpRequest("egov-mdms-service/v1/_search", { "MdmsCriteria": mdmsCriteria }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getMdmsData(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var getInboxConfig = exports.getInboxConfig = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    var tenant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", getMdmsData({
              "tenantId": tenant,
              "moduleDetails": [{
                "moduleName": "common-masters",
                "masterDetails": [{
                  "name": "wfSlaConfig"
                }, {
                  "name": "TablePaginationOptions"
                }, {
                  "name": "CommonInboxConfig"
                }]
              }]
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function getInboxConfig() {
    return _ref7.apply(this, arguments);
  };
}();

var getLocalityData = exports.getLocalityData = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var module = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var applicationNos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", httpRequest("egov-searcher/locality/" + module + "/_get", {
              "searchCriteria": {
                "referenceNumber": applicationNos
              }
            }).then(function (resp) {
              if (!resp || !resp.Localities) {
                return {};
              }
              var localityData = {};
              resp.Localities.map(function (locality) {
                localityData[locality.referencenumber] = locality.locality;
              });
              return localityData;
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function getLocalityData() {
    return _ref8.apply(this, arguments);
  };
}();

var wfEsclationSearch = exports.wfEsclationSearch = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
    var queryArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", httpRequest("egov-workflow-v2/egov-wf/escalate/_search?" + (0, _utils.convertQueryArgToString)(queryArg)));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function wfEsclationSearch() {
    return _ref9.apply(this, arguments);
  };
}();