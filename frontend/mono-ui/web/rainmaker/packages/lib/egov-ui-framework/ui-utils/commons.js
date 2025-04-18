"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.captureSource = exports.sortDropdownLabels = exports.sortDropdownNames = exports.disableFieldAndShowSpinner = exports.enableFieldAndHideSpinner = exports.disableField = exports.enableField = exports.getTransformData = exports.getMdmsJson = exports.getObjectKeys = exports.getObjectValues = exports.showHideAdhocPopup = exports.getRequiredDocData = exports.getStatusKey = exports.isPublicSearch = exports.getMaxDate = exports.getTodaysDateInYMD = exports.getCommonPayUrl = exports.getUserDataFromUuid = exports.downloadPDFFileUsingBase64 = exports.validateFields = exports.findItemInArrayOfObject = exports.getUlbGradeLabel = exports.getMultiUnits = exports.getSelectedTabIndex = exports.orderWfProcessInstances = exports.appendModulePrefix = exports.getTransformedLocale = exports.handleFileUpload = exports.acceptedFiles = exports.setBusinessServiceDataToLocalStorage = exports.addWflowFileUrl = exports.setDocuments = exports.getFileUrl = exports.getFileUrlFromAPI = exports.replaceStrInPath = exports.getLocaleLabels = exports.epochToYmd = exports.getTranslatedLabel = exports.getTransformedLocalStorgaeLabels = exports.transformById = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.getDateInEpoch = exports.trimObj = exports.fetchFromLocalStorage = exports.ifUserRoleExists = exports.persistInLocalStorage = exports.slugify = exports.isFieldEmpty = exports.addQueryArg = exports.getQueryArg = exports.addComponentJsonpath = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _reqDocs = require("egov-ui-framework/ui-containers/RequiredDocuments/reqDocs");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("./api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addComponentJsonpath = exports.addComponentJsonpath = function addComponentJsonpath(components) {
  var jsonPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "components";

  for (var componentKey in components) {
    if (components.hasOwnProperty(componentKey)) {
      if (components[componentKey].children) {
        components[componentKey].componentJsonpath = jsonPath + "." + componentKey;
        var childJsonpath = components[componentKey].componentJsonpath + ".children";
        addComponentJsonpath(components[componentKey].children, childJsonpath);
      } else {
        components[componentKey].componentJsonpath = jsonPath + "." + componentKey;
      }
    }
  }
  return components;
};

var getQueryArg = exports.getQueryArg = function getQueryArg(url, name) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var addQueryArg = exports.addQueryArg = function addQueryArg(url) {
  var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var urlParts = url.split("?");
  var path = urlParts[0];
  var queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach(function (query) {
    var key = query.key;
    var value = query.value;
    var newQuery = key + "=" + value;
    queryParts.push(newQuery);
  });
  var newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

var isFieldEmpty = exports.isFieldEmpty = function isFieldEmpty(field) {
  if (field === undefined || field === null) {
    return true;
  }
  if ((typeof field === "undefined" ? "undefined" : (0, _typeof3.default)(field)) !== "object") {
    field = field.toString().trim();
    return (0, _isEmpty2.default)(field);
  }
  return false;
};

var slugify = exports.slugify = function slugify(term) {
  return term.toLowerCase().replace(/\s+/, "-");
};

var persistInLocalStorage = exports.persistInLocalStorage = function persistInLocalStorage(obj) {
  Object.keys(obj).forEach(function (objKey) {
    var objValue = obj[objKey];
    (0, _localStorageUtils.localStorageSet)(objKey, objValue);
  }, undefined);
};

var ifUserRoleExists = exports.ifUserRoleExists = function ifUserRoleExists(role) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var roles = (0, _get2.default)(userInfo, "roles");
  var roleCodes = roles ? roles.map(function (role) {
    return role.code;
  }) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

var fetchFromLocalStorage = exports.fetchFromLocalStorage = function fetchFromLocalStorage(key) {
  return (0, _localStorageUtils.localStorageGet)(key) || null;
};

var trimObj = exports.trimObj = function trimObj(obj) {
  if (!Array.isArray(obj) && (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) !== "object") return obj;
  for (var key in obj) {
    obj[key.trim()] = typeof obj[key] === "string" ? obj[key].trim() : trimObj(obj[key]);
    if (key === "") delete obj[key];
  }
  return obj;
};

var getDateInEpoch = exports.getDateInEpoch = function getDateInEpoch() {
  return new Date().getTime();
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

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
  var mimeType = file["type"];
  return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

var transformById = exports.transformById = function transformById(payload, id) {
  return payload && payload.reduce(function (result, item) {
    result[item[id]] = (0, _extends3.default)({}, item);

    return result;
  }, {});
};

var getTransformedLocalStorgaeLabels = exports.getTransformedLocalStorgaeLabels = function getTransformedLocalStorgaeLabels() {
  var localeLabels = JSON.parse((0, _localStorageUtils.getLocalization)("localization_" + (0, _localStorageUtils.getLocale)()));
  return transformById(localeLabels, "code");
};

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

var epochToYmd = exports.epochToYmd = function epochToYmd(et) {
  // Return null if et already null
  if (!et) return null;
  // Return the same format if et is already a string (boundary case)
  if (typeof et === "string") return et;
  var date = new Date(et);
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  // date = `${date.getFullYear()}-${month}-${day}`;
  var formatted_date = date.getFullYear() + "-" + month + "-" + day;
  return formatted_date;
};

var getLocaleLabels = exports.getLocaleLabels = function getLocaleLabels(label, labelKey, localizationLabels) {
  if (!localizationLabels) localizationLabels = transformById(JSON.parse((0, _localStorageUtils.getLocalization)("localization_" + (0, _localStorageUtils.getLocale)())), "code");
  if (labelKey) {
    var translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return translatedLabel;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

var replaceStrInPath = exports.replaceStrInPath = function replaceStrInPath(inputString, search, replacement) {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };
  return inputString.replaceAll(search, replacement);
};

var getFileUrlFromAPI = exports.getFileUrlFromAPI = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileStoreId, tenantId) {
    var queryObject, fileUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: tenantId || _common2.default.tenantId }, { key: "fileStoreIds", value: fileStoreId }];
            _context.prev = 1;
            _context.next = 4;
            return (0, _api.httpRequest)("get", "/filestore/v1/files/url", "", queryObject);

          case 4:
            fileUrl = _context.sent;
            return _context.abrupt("return", fileUrl);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function getFileUrlFromAPI(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getAllFileStoreIds = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ProcessInstances) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", ProcessInstances && ProcessInstances.reduce(function (result, eachInstance) {
              if (eachInstance.documents) {
                var fileStoreIdArr = eachInstance.documents.map(function (item) {
                  return item.fileStoreId;
                });
                result[eachInstance.id] = fileStoreIdArr.join(",");
              }
              return result;
            }, {}));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getAllFileStoreIds(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getFileUrl = exports.getFileUrl = function getFileUrl() {
  var linkText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var linkList = linkText && typeof linkText == "string" && linkText.split(",") || [];
  var fileURL = "";
  linkList && linkList.map(function (link) {
    if (!link.includes("large") && !link.includes("medium") && !link.includes("small")) {
      fileURL = link;
    }
  });
  return fileURL;
};

var setDocuments = exports.setDocuments = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(payload, sourceJsonPath, destJsonPath, dispatch, businessService) {
    var uploadedDocData, fileStoreIds, fileUrlPayload, reviewDocData;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            uploadedDocData = (0, _get2.default)(payload, sourceJsonPath, []);
            // uploadedDocData = uploadedDocData && uploadedDocData.filter(document => document && Object.keys(document).length > 0 && document.active);

            fileStoreIds = uploadedDocData && uploadedDocData.map(function (item) {
              return item.fileStoreId;
            }).join(",");
            _context3.t0 = fileStoreIds;

            if (!_context3.t0) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return getFileUrlFromAPI(fileStoreIds);

          case 6:
            _context3.t0 = _context3.sent;

          case 7:
            fileUrlPayload = _context3.t0;
            reviewDocData = uploadedDocData && uploadedDocData.map(function (item, index) {
              return {
                title: businessService + "_" + item.documentType || "",
                link: fileUrlPayload && fileUrlPayload[item.fileStoreId] && getFileUrl(fileUrlPayload[item.fileStoreId]) || "",
                linkText: "View",
                name: fileUrlPayload && fileUrlPayload[item.fileStoreId] && decodeURIComponent(getFileUrl(fileUrlPayload[item.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1)
              };
            });

            reviewDocData && dispatch((0, _actions2.prepareFinalObject)(destJsonPath, reviewDocData));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function setDocuments(_x7, _x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

var addWflowFileUrl = exports.addWflowFileUrl = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ProcessInstances, prepareFinalObject) {
    var fileStoreIdByAction, fileUrlPayload, processInstances;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getAllFileStoreIds(ProcessInstances);

          case 2:
            fileStoreIdByAction = _context4.sent;
            _context4.next = 5;
            return getFileUrlFromAPI(Object.values(fileStoreIdByAction).join(","));

          case 5:
            fileUrlPayload = _context4.sent;
            processInstances = (0, _cloneDeep2.default)(ProcessInstances);

            processInstances.map(function (item) {
              if (item.documents && item.documents.length > 0) {
                item.documents.forEach(function (i) {
                  if (i.fileStoreId && fileUrlPayload[i.fileStoreId]) {
                    i.link = getFileUrl(fileUrlPayload[i.fileStoreId]);
                    i.title = "TL_" + i.documentType;
                    i.name = decodeURIComponent(getFileUrl(fileUrlPayload[i.fileStoreId]).split("?")[0].split("/").pop().slice(13));
                    i.linkText = "View";
                  }
                });
              }
            });
            prepareFinalObject("workflow.ProcessInstances", processInstances);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function addWflowFileUrl(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

var setBusinessServiceDataToLocalStorage = exports.setBusinessServiceDataToLocalStorage = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject, dispatch) {
    var payload;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            dispatch((0, _actions2.toggleSpinner)());
            _context5.next = 4;
            return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/businessservice/_search", "_search", queryObject);

          case 4:
            payload = _context5.sent;

            if (payload && payload.BusinessServices && payload.BusinessServices.length > 0) {
              (0, _localStorageUtils.localStorageSet)("businessServiceData", JSON.stringify((0, _get2.default)(payload, "BusinessServices")));
            } else {
              dispatch((0, _actions2.toggleSnackbar)(true, {
                labelName: "Business Service returned empty object",
                labelKey: "ERR_NOT_AUTHORISED_BUSINESS_SERVICE"
              }, "error"));
            }
            dispatch((0, _actions2.toggleSpinner)());
            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);

            dispatch((0, _actions2.toggleSpinner)());
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Not authorized to access Business Service!",
              labelKey: "ERR_NOT_AUTHORISED_BUSINESS_SERVICE"
            }, "error"));

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 9]]);
  }));

  return function setBusinessServiceDataToLocalStorage(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

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

var handleFileUpload = exports.handleFileUpload = function handleFileUpload(event, handleDocument, props, afterFileSelected, ifError) {
  var S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  var uploadDocument = true;
  var inputProps = props.inputProps,
      maxFileSize = props.maxFileSize,
      _props$moduleName = props.moduleName,
      moduleName = _props$moduleName === undefined ? "common" : _props$moduleName;

  var input = event.target;
  if (input.files && input.files.length > 0) {
    var files = input.files;
    Object.keys(files).forEach(function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(key, index) {
        var file, fileValid, isSizeValid, fileStoreId, _fileStoreId;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                file = files[key];
                fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
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
                  _context6.next = 24;
                  break;
                }

                afterFileSelected && typeof afterFileSelected == "function" && afterFileSelected();
                _context6.prev = 7;

                if (!file.type.match(/^image\//)) {
                  _context6.next = 15;
                  break;
                }

                _context6.next = 11;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, moduleName, file, _common2.default.tenantId);

              case 11:
                fileStoreId = _context6.sent;

                handleDocument(file, fileStoreId);
                _context6.next = 19;
                break;

              case 15:
                _context6.next = 17;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, moduleName, file, _common2.default.tenantId);

              case 17:
                _fileStoreId = _context6.sent;

                handleDocument(file, _fileStoreId);

              case 19:
                _context6.next = 24;
                break;

              case 21:
                _context6.prev = 21;
                _context6.t0 = _context6["catch"](7);

                ifError && typeof ifError == "function" && ifError();

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, undefined, [[7, 21]]);
      }));

      return function (_x16, _x17) {
        return _ref6.apply(this, arguments);
      };
    }());
  }
};

//localizations
var getTransformedLocale = exports.getTransformedLocale = function getTransformedLocale(label) {
  if (typeof label === "number") return label;
  return label && label.toUpperCase().replace(/[.:-\s\/]/g, "_");
};

var appendModulePrefix = exports.appendModulePrefix = function appendModulePrefix(value, localePrefix) {
  var moduleName = localePrefix.moduleName,
      masterName = localePrefix.masterName;


  var transformedValue = getTransformedLocale(moduleName) + "_" + getTransformedLocale(masterName) + "_" + getTransformedLocale(value);
  return transformedValue;
};

var orderWfProcessInstances = exports.orderWfProcessInstances = function orderWfProcessInstances(processInstances) {
  processInstances = (0, _orderBy2.default)(processInstances, "auditDetails.lastModifiedTime", "asc");
  var initiatedFound = false;
  var filteredInstances = processInstances.reverse().reduce(function (acc, item) {
    if (item.action == "INITIATE" && !initiatedFound) {
      initiatedFound = true;
      acc.push(item);
    } else if (item.action !== "INITIATE") {
      acc.push(item);
    }
    return acc;
  }, []);
  return filteredInstances.reverse();
};

var getSelectedTabIndex = exports.getSelectedTabIndex = function getSelectedTabIndex(paymentType) {
  switch (paymentType) {
    case "Cash":
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
    case "Cheque":
      return {
        selectedPaymentMode: "cheque",
        selectedTabIndex: 1,
        fieldsToValidate: ["payeeDetails", "chequeDetails"]
      };
    case "DD":
      return {
        selectedPaymentMode: "demandDraft",
        selectedTabIndex: 2,
        fieldsToValidate: ["payeeDetails", "demandDraftDetails"]
      };
    case "Card":
      return {
        selectedPaymentMode: "card",
        selectedTabIndex: 3,
        fieldsToValidate: ["payeeDetails", "cardDetails"]
      };
    default:
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
  }
};
var getMultiUnits = exports.getMultiUnits = function getMultiUnits(multiUnits) {
  var hasTradeType = false;
  var hasAccessoryType = false;

  var mergedUnits = multiUnits && multiUnits.reduce(function (result, item) {
    hasTradeType = item.hasOwnProperty("tradeType");
    hasAccessoryType = item.hasOwnProperty("accessoryCategory");
    if (item && item !== null && (hasTradeType || hasAccessoryType)) {
      if (item.hasOwnProperty("id")) {
        if (item.hasOwnProperty("active") && item.active) {
          if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
            (0, _set2.default)(item, "active", false);
            result.push(item);
          } else {
            result.push(item);
          }
        }
      } else {
        if (!item.hasOwnProperty("isDeleted")) {
          result.push(item);
        }
      }
    }
    return result;
  }, []);

  return mergedUnits;
};

var getUlbGradeLabel = exports.getUlbGradeLabel = function getUlbGradeLabel(ulbGrade) {
  if (ulbGrade) {
    var ulbWiseHeaderName = ulbGrade.toUpperCase();
    if (ulbWiseHeaderName.indexOf(" ") > 0) {
      ulbWiseHeaderName = ulbWiseHeaderName.split(" ").join("_");
    }
    return "ULBGRADE" + "_" + ulbWiseHeaderName;
  }
};

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

var validateFields = exports.validateFields = function validateFields(objectJsonPath, state, dispatch) {
  var screen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "apply";

  var fields = (0, _get2.default)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
      }), dispatch, true)) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};

var downloadPDFFileUsingBase64 = exports.downloadPDFFileUsingBase64 = function downloadPDFFileUsingBase64(receiptPDF, filename) {
  if (window && window.mSewaApp && window.mSewaApp.isMsewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File) {
    // we are running under webview
    receiptPDF.getBase64(function (data) {
      window.mSewaApp.downloadBase64File(data, filename);
    });
  } else {
    // we are running in browser
    receiptPDF.download(filename);
  }
};

if (window) {
  window.downloadPDFFileUsingBase64 = downloadPDFFileUsingBase64;
}
// Get user data from uuid API call
var getUserDataFromUuid = exports.getUserDataFromUuid = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(bodyObject) {
    var response;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;

            // const response = await httpRequest(
            //   "post",
            //   "/user/_search",
            //   "",
            //   [],
            //   bodyObject
            // );

            response = (0, _commons.getUserSearchedResponse)();
            return _context7.abrupt("return", response);

          case 5:
            _context7.prev = 5;
            _context7.t0 = _context7["catch"](0);

            console.log(_context7.t0);
            return _context7.abrupt("return", {});

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 5]]);
  }));

  return function getUserDataFromUuid(_x19) {
    return _ref7.apply(this, arguments);
  };
}();

var getCommonPayUrl = exports.getCommonPayUrl = function getCommonPayUrl(dispatch, applicationNo, tenantId, businessService) {
  var url = "/egov-common/pay?consumerCode=" + applicationNo + "&tenantId=" + tenantId + "&businessService=" + businessService;
  dispatch((0, _actions.setRoute)(url));
};

var getTodaysDateInYMD = exports.getTodaysDateInYMD = function getTodaysDateInYMD() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = date.getFullYear() + "-" + month + "-" + day;
  return date;
};

var getMaxDate = exports.getMaxDate = function getMaxDate(yr) {
  var date = new Date();
  var year = date.getFullYear() - yr;
  var month = date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = year + "-" + month + "-" + day;
  return date;
};

var isPublicSearch = exports.isPublicSearch = function isPublicSearch() {
  return location && location.pathname && location.pathname.includes("/withoutAuth");
};

var getStatusKey = exports.getStatusKey = function getStatusKey(status) {
  switch (status) {
    case "ACTIVE":
      return { labelName: "Active", labelKey: "ACTIVE" };
    case "INACTIVE":
      return { labelName: "Inactive", labelKey: "INACTIVE" };
    case "INITIATED":
      return { labelName: "Initiated", labelKey: "INITIATED" };
    case "APPLIED":
      return { labelName: "Applied", labelKey: "APPLIED" };
    case "PAID":
      return { labelName: "Paid", labelKey: "PAID" };

    case "APPROVED":
      return { labelName: "Approved", labelKey: "APPROVED" };
    case "REJECTED":
      return { labelName: "Rejected", labelKey: "REJECTED" };
    case "CANCELLED":
      return { labelName: "Cancelled", labelKey: "CANCELLED" };
    case "PENDINGAPPROVAL ":
      return {
        labelName: "Pending for Approval",
        labelKey: "PENDINGAPPROVAL"
      };
    case "PENDINGPAYMENT":
      return {
        labelName: "Pending payment",
        labelKey: "PENDINGPAYMENT"
      };
    case "DOCUMENTVERIFY":
      return {
        labelName: "Pending for Document Verification",
        labelKey: "DOCUMENTVERIFY"
      };
    case "FIELDINSPECTION":
      return {
        labelKey: "FIELDINSPECTION",
        labelName: "Pending for Field Inspection"
      };
    default:
      return {
        labelName: status,
        labelKey: status
      };
  }
};

var getRequiredDocData = exports.getRequiredDocData = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(action, dispatch, moduleDetails, closePopUp) {
    var tenantId, mdmsBody, payload, moduleName, documents, reqDocuments;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            tenantId = process.env.REACT_APP_NAME === "Citizen" ? JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity || _common2.default.tenantId : (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: moduleDetails[0].moduleName === "ws-services-masters" || moduleDetails[0].moduleName === "PropertyTax" ? _common2.default.tenantId : tenantId,
                moduleDetails: moduleDetails
              }
            };
            _context8.prev = 2;
            payload = null;
            _context8.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context8.sent;
            moduleName = moduleDetails[0].moduleName;
            documents = (0, _get2.default)(payload.MdmsRes, moduleName + ".Documents", []);


            if (moduleName === "PropertyTax") {
              payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
            }
            reqDocuments = (0, _reqDocs.getRequiredDocuments)(documents, moduleName, footerCallBackForRequiredDataModal(moduleName, closePopUp));

            (0, _set2.default)(action, "screenConfig.components.adhocDialog.children.popup", reqDocuments);
            dispatch((0, _actions2.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            return _context8.abrupt("return", { payload: payload, reqDocuments: reqDocuments });

          case 16:
            _context8.prev = 16;
            _context8.t0 = _context8["catch"](2);

            console.log(_context8.t0);

          case 19:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[2, 16]]);
  }));

  return function getRequiredDocData(_x20, _x21, _x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();

var footerCallBackForRequiredDataModal = function footerCallBackForRequiredDataModal(moduleName, closePopUp) {
  var tenant = (0, _localStorageUtils.getTenantId)();
  switch (moduleName) {
    case "FireNoc":
      return function (state, dispatch) {
        dispatch((0, _actions2.prepareFinalObject)("FireNOCs", []));
        dispatch((0, _actions2.prepareFinalObject)("DynamicMdms", {}));
        dispatch((0, _actions2.prepareFinalObject)("documentsUploadRedux", {}));
        var applyUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/apply" : "/fire-noc/apply";
        dispatch((0, _actions.setRoute)(applyUrl));
      };
    case "PropertyTax":
      return function (state, dispatch) {
        dispatch((0, _actions2.prepareFinalObject)("documentsUploadRedux", {}));
        var applyUrl = "/property-tax/assessment-form";
        dispatch((0, _actions.setRoute)(applyUrl));
      };
    case "ws-services-masters":
      return function (state, dispatch) {
        dispatch((0, _actions2.prepareFinalObject)("WaterConnection", []));
        dispatch((0, _actions2.prepareFinalObject)("SewerageConnection", []));
        dispatch((0, _actions2.prepareFinalObject)("applyScreen", {}));
        dispatch((0, _actions2.prepareFinalObject)("searchScreen", {}));
        var applyUrl = process.env.REACT_APP_NAME === "Citizen" ? "/wns/apply" : "/wns/apply";
        dispatch((0, _actions.setRoute)(applyUrl));
      };
    case "TradeLicense":
      if (closePopUp) {
        return function (state, dispatch) {
          dispatch((0, _actions2.prepareFinalObject)("Licenses", []));
          dispatch((0, _actions2.prepareFinalObject)("LicensesTemp", []));
          dispatch((0, _actions2.prepareFinalObject)("DynamicMdms", {}));
          var applyUrl = "/tradelicence/apply?tenantId=" + tenant;
          dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.adhocDialog", "props.open", false));
          dispatch((0, _actions.setRoute)(applyUrl));
        };
      }
  }
};
var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch, screenKey) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.adhocDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, "components.adhocDialog", "props.open", !toggle));
};
var getObjectValues = exports.getObjectValues = function getObjectValues(objData) {
  return objData && Object.values(objData).map(function (item) {
    return item;
  });
};
var getObjectKeys = exports.getObjectKeys = function getObjectKeys(objData) {
  return objData && Object.keys(objData).map(function (item) {
    return { code: item, active: true };
  });
};
var getMdmsJson = exports.getMdmsJson = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(state, dispatch, reqObj) {
    var setPath, setTransformPath, dispatchPath, moduleName, name, filter, mdmsBody, payload, result;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            setPath = reqObj.setPath, setTransformPath = reqObj.setTransformPath, dispatchPath = reqObj.dispatchPath, moduleName = reqObj.moduleName, name = reqObj.name, filter = reqObj.filter;
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: moduleName,
                  masterDetails: [{ name: name, filter: filter }]
                }]
              }
            };
            _context9.prev = 2;
            payload = null;
            _context9.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context9.sent;
            result = (0, _get2.default)(payload, "MdmsRes." + moduleName + "." + name, []);
            // let filterResult = type ? result.filter(item => item.type == type) : result;

            (0, _set2.default)(payload, setPath, result);
            payload = getTransformData(payload, setPath, setTransformPath);
            dispatch((0, _actions2.prepareFinalObject)(dispatchPath, (0, _get2.default)(payload, dispatchPath, [])));
            //dispatch(prepareFinalObject(dispatchPath, payload.DynamicMdms));
            dispatch((0, _actions2.prepareFinalObject)("DynamicMdms.apiTriggered", false));
            _context9.next = 18;
            break;

          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9["catch"](2);

            console.log(_context9.t0);
            dispatch((0, _actions2.prepareFinalObject)("DynamicMdms.apiTriggered", false));

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[2, 14]]);
  }));

  return function getMdmsJson(_x24, _x25, _x26) {
    return _ref9.apply(this, arguments);
  };
}();
var getTransformData = exports.getTransformData = function getTransformData(object, getPath, transerPath) {
  var data = (0, _get2.default)(object, getPath);
  var transformedData = {};
  var formTreeBase = function formTreeBase(transformedData, row) {
    var splitList = row.code.split(".");
    splitList.map(function (value, i) {
      transformedData = i == splitList.length - 1 ? transformedData[value] = row : transformedData[value] || (transformedData[value] = {});
    });
  };
  data.map(function (a) {
    formTreeBase(transformedData, a);
  });
  (0, _set2.default)(object, transerPath, transformedData);
  return object;
};

var enableField = exports.enableField = function enableField(screenKey) {
  var jsonPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "components";
  var dispatch = arguments[2];

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, jsonPath, "props.disabled", false));
};
var disableField = exports.disableField = function disableField(screenKey) {
  var jsonPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "components";
  var dispatch = arguments[2];

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, jsonPath, "props.disabled", true));
};
var enableFieldAndHideSpinner = exports.enableFieldAndHideSpinner = function enableFieldAndHideSpinner(screenKey) {
  var jsonPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "components";
  var dispatch = arguments[2];

  dispatch((0, _actions2.hideSpinner)());
  enableField(screenKey, jsonPath, dispatch);
};
var disableFieldAndShowSpinner = exports.disableFieldAndShowSpinner = function disableFieldAndShowSpinner(screenKey) {
  var jsonPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "components";
  var dispatch = arguments[2];

  dispatch((0, _actions2.showSpinner)());
  disableField(screenKey, jsonPath, dispatch);
};

var sortDropdownNames = exports.sortDropdownNames = function sortDropdownNames(e1, e2) {
  if (e1 && e1.name && typeof e1.name == "string") {
    return e1 && e1.name && e1.name.localeCompare && e1.name.localeCompare(e2 && e2.name && e2.name || "");
  } else if (e1 && e1.name && typeof e1.name == "number") {
    return e1.name - e2.name;
  } else {
    return 1;
  }
};

var sortDropdownLabels = exports.sortDropdownLabels = function sortDropdownLabels(e1, e2) {
  if (e1 && e1.label && typeof e1.label == "string") {
    return e1 && e1.label && e1.label.localeCompare && e1.label.localeCompare(e2 && e2.label && e2.label || "");
  } else if (e1 && e1.label && typeof e1.label == "number") {
    return e1.label - e2.label;
  } else {
    return 1;
  }
};

var captureSource = exports.captureSource = function captureSource() {
  //Set the source of the Booking.
  if (window.mSewaApp) (0, _localStorageUtils.localStorageSet)("isNative", "true");else (0, _localStorageUtils.localStorageSet)("isNative", "false");
  var isNative = (0, _localStorageUtils.localStorageGet)("isNative") === "true";
  try {
    var source = process.env.REACT_APP_NAME === "Citizen" ? isNative ? "mobileapp" : "web" : "ivr";
    return source;
  } catch (error) {
    console.error(error);
  }
};