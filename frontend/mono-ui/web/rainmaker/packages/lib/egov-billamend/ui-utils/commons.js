"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBillAmdSearchResult = exports.searchBill = exports.getBillAmendSearchResult = exports.getImageUrlByFile = exports.getFileSize = exports.isFileValid = exports.findItemInArrayOfObject = exports.handleFileUpload = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils = require("../ui-config/screens/specs/bill-amend/utils");

var _api2 = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleFileUpload = exports.handleFileUpload = function handleFileUpload(event, handleDocument, props) {
  var S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  var uploadDocument = true;
  var maxFileSize = props.maxFileSize,
      formatProps = props.formatProps,
      moduleName = props.moduleName;

  var input = event.target;
  if (input.files && input.files.length > 0) {
    var files = input.files;
    Object.keys(files).forEach(function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key, index) {
        var file, fileValid, isSizeValid, fileStoreId, _fileStoreId;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                file = files[key];
                fileValid = isFileValid(file, (0, _commons.acceptedFiles)(formatProps.accept));
                isSizeValid = getFileSize(file) <= maxFileSize;

                if (!fileValid) {
                  alert("Only image or pdf files can be uploaded");
                  uploadDocument = false;
                }
                if (!isSizeValid) {
                  alert("Maximum file size can be " + Math.round(maxFileSize / 1000) + " MB");
                  uploadDocument = false;
                }

                if (!uploadDocument) {
                  _context.next = 17;
                  break;
                }

                if (!file.type.match(/^image\//)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 9;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, moduleName, file, _common2.default.tenantId);

              case 9:
                fileStoreId = _context.sent;

                handleDocument(file, fileStoreId);
                _context.next = 17;
                break;

              case 13:
                _context.next = 15;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, moduleName, file, _common2.default.tenantId);

              case 15:
                _fileStoreId = _context.sent;

                handleDocument(file, _fileStoreId);

              case 17:
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

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};
var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
  var mimeType = file["type"];
  return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var getImageUrlByFile = exports.getImageUrlByFile = function getImageUrlByFile(file) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

var getBillAmendSearchResult = exports.getBillAmendSearchResult = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject, dispatch) {
    var qo, newQuery, response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            qo = {
              // "amendmentId": '3edf1f2d-761e-4e8b-a990-505b648cf5eb'
            };

            queryObject.map(function (query) {
              return qo[query.key] = query.value;
            });
            newQuery = [];

            Object.keys(qo).map(function (key) {
              newQuery.push({
                key: key,
                value: qo[key]
              });
            });

            _context2.next = 7;
            return (0, _api2.httpRequest)("post", "/billing-service/amendment/_search", "_search", newQuery);

          case 7:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);

            console.error(_context2.t0);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelCode: _context2.t0.message }, "error"));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 11]]);
  }));

  return function getBillAmendSearchResult(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var searchBill = exports.searchBill = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject, dispatch) {
    var newQuery, newQueryObj, returnObject, response, _returnObject$Bill, _response, _returnObject$Bill2;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            newQuery = {};

            queryObject.map(function (query) {
              newQuery[query.key] = query.value;
            });
            newQueryObj = [{
              "key": 'tenantId',
              "value": newQuery['tenantId']
            }, {
              "key": 'businessService',
              "value": newQuery['businessService']
            }];

            if (newQuery['mobileNumber'] != '' && !newQuery['consumerCode']) {
              newQueryObj.push({
                "key": 'mobileNumber',
                "value": newQuery['mobileNumber']
              });
            } else {
              newQueryObj.push({
                "key": 'connectionNumber',
                "value": newQuery['consumerCode']
              });
            }
            returnObject = { 'Bill': [] };

            if (!(newQuery['businessService'] == 'WS')) {
              _context3.next = 16;
              break;
            }

            newQueryObj.push({
              "key": 'searchType',
              "value": 'CONNECTION'
            });
            newQueryObj.push({
              "key": 'isPropertyDetailsRequired',
              "value": true
            });

            _context3.next = 11;
            return (0, _utils.getWaterDetails)(newQueryObj);

          case 11:
            response = _context3.sent;

            if (response !== null && response !== undefined && response.WaterConnection && response.WaterConnection.length > 0) {
              (_returnObject$Bill = returnObject.Bill).push.apply(_returnObject$Bill, (0, _toConsumableArray3.default)(response.WaterConnection));
            }
            return _context3.abrupt("return", returnObject);

          case 16:
            if (!(newQuery['businessService'] == 'SW')) {
              _context3.next = 24;
              break;
            }

            newQueryObj.push({
              "key": 'searchType',
              "value": 'CONNECTION'
            });
            newQueryObj.push({
              "key": 'isPropertyDetailsRequired',
              "value": true
            });
            _context3.next = 21;
            return (0, _utils.getSewerageDetails)(newQueryObj);

          case 21:
            _response = _context3.sent;

            if (_response !== null && _response !== undefined && _response.SewerageConnections && _response.SewerageConnections.length > 0) {
              (_returnObject$Bill2 = returnObject.Bill).push.apply(_returnObject$Bill2, (0, _toConsumableArray3.default)(_response.SewerageConnections));
            }
            return _context3.abrupt("return", returnObject);

          case 24:
            _context3.next = 30;
            break;

          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](0);

            console.error(_context3.t0);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context3.t0.message, labelCode: _context3.t0.message }, "warning"));

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 26]]);
  }));

  return function searchBill(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getBillAmdSearchResult = exports.getBillAmdSearchResult = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api2.httpRequest)("post", "/billing-service/amendment/_search", "_search", queryObject);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            console.error(_context4.t0);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context4.t0.message, labelCode: _context4.t0.message }, "error"));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getBillAmdSearchResult(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();