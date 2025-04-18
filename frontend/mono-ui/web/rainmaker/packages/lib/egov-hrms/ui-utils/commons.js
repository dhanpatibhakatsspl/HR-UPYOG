"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToFilestoreid = exports.findItemInArrayOfObject = exports.handleFileUpload = exports.acceptedFiles = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.updateEmployee = exports.createEmployee = exports.getSearchResults = exports.getLocaleLabelsforTL = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils = require("../ui-config/screens/specs/utils");

var _api = require("../ui-utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLocaleLabelsforTL = exports.getLocaleLabelsforTL = function getLocaleLabelsforTL(label, labelKey, localizationLabels) {
  if (labelKey) {
    var translatedLabel = (0, _utils.getTranslatedLabel)(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

// HRMS Search API
var getSearchResults = exports.getSearchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.httpRequest)("post", "/egov-hrms/employees/_search", "", queryObject);

          case 3:
            response = _context.sent;


            response.Employees = [].concat((0, _toConsumableArray3.default)(response.Employees));
            return _context.abrupt("return", response);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message, labelKey: _context.t0.message }, "error"));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function getSearchResults(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// HRMS Create API
var createEmployee = exports.createEmployee = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject, payload, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/egov-hrms/employees/_create", "", queryObject, { Employees: payload });

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelKey: _context2.t0.message }, "error"));
            throw _context2.t0;

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function createEmployee(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

// HRMS Update API
var updateEmployee = exports.updateEmployee = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject, payload, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/egov-hrms/employees/_update", "", queryObject, { Employees: payload });

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context3.t0.message, labelKey: _context3.t0.message }, "error"));
            throw _context3.t0;

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function updateEmployee(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

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

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
  var mimeType = file["type"];
  return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

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

var handleFileUpload = exports.handleFileUpload = function handleFileUpload(event, handleDocument, props) {
  var S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  var uploadDocument = true;
  var inputProps = props.inputProps,
      maxFileSize = props.maxFileSize;

  var input = event.target;
  if (input.files && input.files.length > 0) {
    var files = input.files;
    Object.keys(files).forEach(function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(key, index) {
        var file, fileValid, isSizeValid, fileStoreId, _fileStoreId;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                file = files[key];
                fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
                isSizeValid = getFileSize(file) <= maxFileSize;

                if (!fileValid) {
                  // dispatch(
                  //   toggleSnackbar(
                  //     true,
                  //     `Only image or pdf files can be uploaded`,
                  //     "error"
                  //   )
                  // );
                  alert("Only image or pdf files can be uploaded");
                  uploadDocument = false;
                }
                if (!isSizeValid) {
                  // dispatch(
                  //   toggleSnackbar(
                  //     true,
                  //     `Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`,
                  //     "error"
                  //   )
                  // );
                  alert("Maximum file size can be " + Math.round(maxFileSize / 1000) + " MB");
                  uploadDocument = false;
                }

                if (!uploadDocument) {
                  _context4.next = 17;
                  break;
                }

                if (!file.type.match(/^image\//)) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 9;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, "TL", file, _common2.default.tenantId);

              case 9:
                fileStoreId = _context4.sent;

                handleDocument(file, fileStoreId);
                _context4.next = 17;
                break;

              case 13:
                _context4.next = 15;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, "TL", file, _common2.default.tenantId);

              case 15:
                _fileStoreId = _context4.sent;

                handleDocument(file, _fileStoreId);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function (_x9, _x10) {
        return _ref4.apply(this, arguments);
      };
    }());
  }
};

var setApplicationNumberBox = function setApplicationNumberBox(state, dispatch) {
  var applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].applicationNumber", null);
  if (applicationNumber) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", applicationNumber));
  }
};

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

var convertToFilestoreid = exports.convertToFilestoreid = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(link) {
    var FILESTORE, response, base64, fileStoreId;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            FILESTORE = {
              endPoint: "filestore/v1/files"
            };
            _context5.next = 3;
            return _axios2.default.get((0, _commons.getFileUrl)(link), {
              responseType: "arraybuffer",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/*"
              }
            });

          case 3:
            response = _context5.sent;

            // var response1 = await axios.get(getFileUrl(link), {
            //   responseType: "blob",
            //   headers: {
            //     "Content-Type": "application/json",
            //     Accept: "application/*"
            //   }
            // });
            base64 = Buffer.from(response.data, 'binary').toString('base64');
            _context5.next = 7;
            return (0, _api.uploadFile)(FILESTORE.endPoint, 'rainmaker-pgr', base64, _common2.default.tenantId);

          case 7:
            fileStoreId = _context5.sent;
            return _context5.abrupt("return", fileStoreId);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function convertToFilestoreid(_x11) {
    return _ref5.apply(this, arguments);
  };
}();