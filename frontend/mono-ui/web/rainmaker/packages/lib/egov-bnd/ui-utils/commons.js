"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchForDeath = exports.searchForBirth = exports.deleteAllRecords = exports.postXlsxFile = exports.uploadFile = exports.prepareForm = exports.handleFileUpload = exports.msToTime = exports.isFileValid = exports.getFileSize = exports.findItemInArrayOfObject = exports.acceptedFiles = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var acceptedFiles = exports.acceptedFiles = function acceptedFiles(acceptedExt) {
  var splitExtByName = acceptedExt.split(",");
  var acceptedFileTypes = splitExtByName.reduce(function (result, curr) {
    if (curr.includes("image")) {
      result.push("image");
    } else {
      result.push(curr.split(".")[1]);
    }
    return result;
  }, []);
  return acceptedFileTypes;
};
var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
  var mimeType = file["type"];
  //alert("mimeType of file is ",mimeType);
  return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

var msToTime = exports.msToTime = function msToTime(duration) {
  var milliseconds = Math.floor(duration % 1000 / 100),
      seconds = Math.floor(duration / 1000 % 60),
      minutes = Math.floor(duration / (1000 * 60) % 60),
      hours = Math.floor(duration / (1000 * 60 * 60) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + " Hours  " + minutes + " Min  " + seconds + " Seconds";
};

var handleFileUpload = exports.handleFileUpload = function handleFileUpload(event, handleDocument, props, module) {
  var maxFileSize = props.maxFileSize,
      formatProps = props.formatProps,
      moduleName = props.moduleName;

  var input = event.target;
  if (input.files && input.files.length > 0) {
    var files = input.files;
    Object.keys(files).forEach(function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key, index) {
        var file, fileValid, fileSize, isSizeValid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                file = files[key];
                fileValid = isFileValid(file, acceptedFiles(formatProps.accept));
                fileSize = getFileSize(file);
                isSizeValid = fileSize <= maxFileSize;

                alert("Size of the excel is " + Math.round(fileSize) + " KB \nEstimated Time to upload is : " + msToTime(Math.round(fileSize) * 1000 / 8.5) + " ");
                handleDocument(file);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
};

var prepareForm = exports.prepareForm = function prepareForm(params) {
  var formData = new FormData();
  for (var k in params) {
    formData.append(k, params[k]);
  }
  return formData;
};

var uploadFile = exports.uploadFile = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(endPoint, module, file) {
    var tenantId, uploadInstance, requestParams, requestBody, response, responseStatus, fileStoreIds;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Bad idea to fetch from local storage, change as feasible
            _store2.default.dispatch((0, _actions.toggleSpinner)());
            tenantId = (0, _localStorageUtils.getTenantId)();
            uploadInstance = _axios2.default.create({
              baseURL: window.location.origin,
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            requestParams = {
              tenantId: tenantId,
              module: module,
              file: file
            };
            requestBody = prepareForm(requestParams);
            _context2.prev = 5;
            _context2.next = 8;
            return uploadInstance.post(endPoint, requestBody);

          case 8:
            response = _context2.sent;
            responseStatus = parseInt(response.status, 10);
            fileStoreIds = [];

            _store2.default.dispatch((0, _actions.toggleSpinner)());

            if (!(responseStatus === 200)) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", response);

          case 16:
            return _context2.abrupt("return", "Service Error. Try again by logging in.");

          case 17:
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](5);

            _store2.default.dispatch((0, _actions.toggleSpinner)());
            throw new Error(_context2.t0);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 19]]);
  }));

  return function uploadFile(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var postXlsxFile = exports.postXlsxFile = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, module, file) {
    var tenantId, resp;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            tenantId = (0, _localStorageUtils.getTenantId)();
            _context3.next = 4;
            return uploadFile("birth-death-services/upload/_" + module + "?tenantid=" + tenantId, "" + module, file);

          case 4:
            resp = _context3.sent;
            return _context3.abrupt("return", resp);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: "ERR_API_ERROR", labelKey: "ERR_API_ERROR" }, "error"));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 8]]);
  }));

  return function postXlsxFile(_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteAllRecords = exports.deleteAllRecords = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, dispatch, module) {
    var requestBody, payload, tenantId, queryParams, endPoint;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:

            _store2.default.dispatch((0, _actions.toggleSpinner)());

            requestBody = {};
            payload = null;
            tenantId = (0, _localStorageUtils.getTenantId)();
            queryParams = [{ key: "tenantId", value: tenantId }];
            endPoint = module == "birth" ? "Birth" : "Death";
            _context4.prev = 6;
            _context4.next = 9;
            return (0, _api.httpRequest)("post", 'birth-death-services/common/delete' + endPoint + 'Import', 'delete' + endPoint + 'Import', queryParams, requestBody);

          case 9:
            payload = _context4.sent;

            _store2.default.dispatch((0, _actions.toggleSpinner)());
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: "", labelKey: payload }, "success"));
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](6);

            _store2.default.dispatch((0, _actions.toggleSpinner)());
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: "ERR_API_ERROR", labelKey: "ERR_API_ERROR" }, "error"));

          case 18:
            return _context4.abrupt("return", payload);

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[6, 14]]);
  }));

  return function deleteAllRecords(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var searchForBirth = exports.searchForBirth = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dispatch, queryParams, queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            dispatch((0, _actions.toggleSpinner)());
            _context5.next = 4;
            return (0, _api.httpRequest)("post", "birth-death-services/birth/_search", "_search", queryParams, {} //{ searchCriteria: queryObject }
            );

          case 4:
            response = _context5.sent;

            dispatch((0, _actions.toggleSpinner)());
            return _context5.abrupt("return", response);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);

            dispatch((0, _actions.toggleSpinner)());
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context5.t0.message, labelCode: _context5.t0.message }, "error"));

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 9]]);
  }));

  return function searchForBirth(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var searchForDeath = exports.searchForDeath = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dispatch, queryParams, queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;

            dispatch((0, _actions.toggleSpinner)());
            _context6.next = 4;
            return (0, _api.httpRequest)("post", "birth-death-services/death/_search", "_search", queryParams, {} //{ searchCriteria: queryObject }
            );

          case 4:
            response = _context6.sent;

            dispatch((0, _actions.toggleSpinner)());
            return _context6.abrupt("return", response);

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);

            dispatch((0, _actions.toggleSpinner)());
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context6.t0.message, labelCode: _context6.t0.message }, "error"));

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 9]]);
  }));

  return function searchForDeath(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();