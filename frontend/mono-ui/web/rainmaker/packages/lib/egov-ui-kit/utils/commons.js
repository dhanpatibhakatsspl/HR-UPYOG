"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertUserForSingleInstance = exports.downloadWNSBillFromConsumer = exports.printWNSBill = exports.downloadWNSBill = exports.translate = exports.getResultUrl = exports.getUserSearchedResponse = exports.getFetchBillAPI = exports.getPaymentSearchAPI = exports.getBusinessServiceMdmsData = exports.fetchConsumerBill = exports.searchConsumer = exports.businessServiceInfo = exports.getModuleName = exports.downloadFromLink = exports.openPdf = exports.printPdf = exports.downloadPdf = exports.getMohallaData = exports.isDocumentValid = exports.getApplicationType = exports.navigateToApplication = exports.setRoute = exports.getTotalAmountDue = exports.onNotificationClick = exports.getTransformedNotifications = exports.hasTokenExpired = exports.trimObj = exports.fetchDropdownData = exports.mergeMDMSDataArray = exports.upperCaseFirst = exports.startSMSRecevier = exports.transformComplaintForComponent = exports.findLatestAssignee = exports.getTenantForLatLng = exports.flatten = exports.transformLocalizationLabels = exports.getLatestCreationTime = exports.getCommaSeperatedAddress = exports.returnSLAStatus = exports.getPropertyFromObj = exports.getNameFromId = exports.isFileImage = exports.getFileSize = exports.getTransformedStatus = exports.isImage = exports.getCityNameByCode = exports.fetchImages = exports.getTranslatedLabel = exports.getUlbGradeLabel = exports.prepareFormData = exports.addBodyClass = exports.getBodyClassFromPath = exports.epochToDate = exports.getDateFromEpoch = exports.mapCompIDToName = exports.getCurrentAddress = exports.prepareForm = exports.getRequestUrl = exports.fetchFromLocalStorage = exports.persistInLocalStorage = exports.slugify = exports.isFieldEmpty = exports.addQueryArg = exports.getQueryArg = exports.getGeneralMDMSDataDropdownName = exports.generalMDMSDataRequestObj = exports.getTransformedDropdown = exports.getUsageCategory = exports.getCategoryObject = exports.getSingleCodeObject = exports.hyphenSeperatedDateTime = exports.transformById = exports.displayLocalizedStatusMessage = exports.displayStatus = exports.statusToLocalisationKeyMapping = exports.statusToMessageMapping = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _actions3 = require("egov-ui-kit/redux/form/actions");

var _api2 = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _endPoints2 = require("./endPoints");

var _formActionUtils = require("./PTCommon/FormWizardUtils/formActionUtils");

var _formUtils = require("./PTCommon/FormWizardUtils/formUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var statusToMessageMapping = exports.statusToMessageMapping = {
  rejected: "Rejected",
  closed: "Closed",
  open: "Opened",
  "re-assign": "Re-assigned",
  assigned: "Assigned",
  resolved: "Resolved",
  reassignrequested: "Re-assign Requested"
};

//status messages in home page and my complaints page
var statusToLocalisationKeyMapping = exports.statusToLocalisationKeyMapping = {
  rejected: "CS_COMMON_STATUS_REJECTED",
  closed: "CS_COMMON_STATUS_CLOSED",
  open: "CS_COMMON_STATUS_SUBMITTED",
  reopened: "CS_COMMON_STATUS_REOPENED",
  reassigned: "CS_COMMON_STATUS_REASSIGNED",
  assigned: "CS_COMMON_STATUS_ASSIGNED",
  resolved: "CS_COMMON_STATUS_RESOLVED",
  reassignrequested: "CS_COMMON_STATUS_REASSIGN_REQUESTED"
};

var displayStatus = exports.displayStatus = function displayStatus(status) {
  return status ? statusToMessageMapping[status && status.toLowerCase()] : "";
};

var displayLocalizedStatusMessage = exports.displayLocalizedStatusMessage = function displayLocalizedStatusMessage(status) {
  return status ? statusToLocalisationKeyMapping[status && status.toLowerCase()] : "";
};
var transformById = exports.transformById = function transformById(payload, id) {
  return payload && payload.reduce(function (result, item) {
    if (!item.hasOwnProperty("active") || item.hasOwnProperty("active") && item.active) {
      result[item[id]] = (0, _extends3.default)({}, item);
    }

    return result;
  }, {});
};

var hyphenSeperatedDateTime = exports.hyphenSeperatedDateTime = function hyphenSeperatedDateTime(d) {
  return d;
};

var getSingleCodeObject = exports.getSingleCodeObject = function getSingleCodeObject(dataKey, tempObj, MDMSdata, keys) {
  keys.forEach(function (key) {
    var splittedKey = key.split(".");
    tempObj[splittedKey[splittedKey.length - 1]] = MDMSdata[dataKey][key];
    tempObj[splittedKey[splittedKey.length - 1]].code = splittedKey[splittedKey.length - 1];
  });
  return tempObj;
};

var getCategoryObject = exports.getCategoryObject = function getCategoryObject(categoryCode, MDMSdata, dataKey, key, parentKey, parentKeyValue) {
  var tempObj = {};
  tempObj[categoryCode] = MDMSdata[dataKey][key];
  tempObj[categoryCode].code = categoryCode;
  tempObj[categoryCode][parentKey] = parentKeyValue;
  return tempObj;
};

var getUsageCategory = exports.getUsageCategory = function getUsageCategory(dataKey, tempObj, MDMSdata, keys) {
  keys.forEach(function (key) {
    var splittedKey = key.split(".");
    var categoryCode = splittedKey.pop();
    if (splittedKey.length === 0) {
      tempObj["UsageCategoryMajor"] = (0, _extends3.default)({}, tempObj["UsageCategoryMajor"], getCategoryObject(categoryCode, MDMSdata, dataKey, key));
    } else if (splittedKey.length === 1) {
      tempObj["UsageCategoryMinor"] = (0, _extends3.default)({}, tempObj["UsageCategoryMinor"], getCategoryObject(categoryCode, MDMSdata, dataKey, key, "usageCategoryMajor", splittedKey[splittedKey.length - 1]));
    } else if (splittedKey.length === 2) {
      tempObj["UsageCategorySubMinor"] = (0, _extends3.default)({}, tempObj["UsageCategorySubMinor"], getCategoryObject(categoryCode, MDMSdata, dataKey, key, "usageCategoryMinor", splittedKey[splittedKey.length - 1]));
    } else if (splittedKey.length === 3) {
      tempObj["UsageCategoryDetail"] = (0, _extends3.default)({}, tempObj["UsageCategoryDetail"], getCategoryObject(categoryCode, MDMSdata, dataKey, key, "usageCategorySubMinor", splittedKey[splittedKey.length - 1]));
    }
  });
  return tempObj;
};

var getTransformedDropdown = exports.getTransformedDropdown = function getTransformedDropdown(MDMSdata, dataKeys) {
  dataKeys.forEach(function (dataKey) {
    if (MDMSdata && MDMSdata.hasOwnProperty(dataKey)) {
      var keys = MDMSdata[dataKey] && Object.keys(MDMSdata[dataKey]);
      var tempObj = {};
      if (keys && keys.length > 0) {
        if (dataKey !== "UsageCategory") {
          MDMSdata[dataKey] = getSingleCodeObject(dataKey, tempObj, MDMSdata, keys);
        } else {
          MDMSdata = (0, _extends3.default)({}, MDMSdata, getUsageCategory(dataKey, tempObj, MDMSdata, keys));
        }
      }
    }
  });
  return MDMSdata;
};

var generalMDMSDataRequestObj = exports.generalMDMSDataRequestObj = function generalMDMSDataRequestObj(tenantId) {
  var requestBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [{
        moduleName: "PropertyTax",
        masterDetails: [{
          name: "Floor"
        }, {
          name: "OccupancyType"
        }, {
          name: "OwnerShipCategory"
        }, {
          name: "OwnerType"
        }, {
          name: "PropertySubType"
        }, {
          name: "PropertyType"
        }, {
          name: "SubOwnerShipCategory"
        }, {
          name: "UsageCategory"
        }]
      }]
    }
  };
  return requestBody;
};

var getGeneralMDMSDataDropdownName = exports.getGeneralMDMSDataDropdownName = function getGeneralMDMSDataDropdownName() {
  var keys = ["Floor", "OccupancyType", "OwnerShipCategory", "OwnerType", "PropertySubType", "PropertyType", "SubOwnerShipCategory", "UsageCategory"];
  return keys;
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

var fetchFromLocalStorage = exports.fetchFromLocalStorage = function fetchFromLocalStorage(key) {
  return (0, _localStorageUtils.localStorageGet)(key) || null;
};

var getRequestUrl = exports.getRequestUrl = function getRequestUrl(url, params) {
  var query = Object.keys(params).map(function (k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
  }).join("&");
  return url + "?" + query;
};

var prepareForm = exports.prepareForm = function prepareForm(params) {
  var formData = new FormData();
  for (var k in params) {
    formData.append(k, params[k]);
  }
  return formData;
};

var getMonthName = function getMonthName(monthIndex) {
  switch (monthIndex) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "";
  }
};

var getCurrLocation = function getCurrLocation() {
  return new Promise(function (resolve) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var currLoc = {};
        currLoc.lat = position.coords.latitude.toFixed(6);
        currLoc.lng = position.coords.longitude.toFixed(6);
        resolve(currLoc);
      });
    }
  });
};

var getCurrentAddress = exports.getCurrentAddress = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var currLoc, url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getCurrLocation();

          case 2:
            currLoc = _context.sent;
            url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currLoc.lat + "," + currLoc.lng + "&key=" + _common2.default.MAP_API_KEY;
            _context.prev = 4;
            return _context.abrupt("return", _axios2.default.get(url).then(function (res) {
              if (res.data.status === "OK") {
                if (res.data.results[0]) {
                  var currAddress = {};
                  currAddress.lat = currLoc.lat;
                  currAddress.lng = currLoc.lng;
                  currAddress.address = res.data.results[0].formatted_address;
                  return currAddress;
                }
              }
            }));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](4);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 8]]);
  }));

  return function getCurrentAddress() {
    return _ref.apply(this, arguments);
  };
}();

var mapCompIDToName = exports.mapCompIDToName = function mapCompIDToName(IDObj, compID) {
  return IDObj[compID] ? IDObj[compID].serviceCode : "Default";
};

var getDateFromEpoch = exports.getDateFromEpoch = function getDateFromEpoch(epoch) {
  var dateObj = new Date(epoch);
  var year = dateObj.getFullYear().toString().slice(2, 4);
  var month = getMonthName(dateObj.getMonth() + 1);
  var day = dateObj.getDate();
  return day + "-" + month + "-" + year;
};

var epochToDate = exports.epochToDate = function epochToDate(et) {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formattedDate;
};

var getBodyClassFromPath = exports.getBodyClassFromPath = function getBodyClassFromPath(path) {
  var bodyClass = path.split("/").filter(function (part) {
    return part.trim().length > 0;
  }).join("-");
  return bodyClass;
};

// remove the previous tokens; temp fix
// forEach not present in the prototype chain of some older browsers
var addBodyClass = exports.addBodyClass = function addBodyClass(path) {
  var bodyClass = getBodyClassFromPath(path);
  try {
    document.body.classList.forEach(function (className) {
      return document.body.classList.remove(className);
    });
    bodyClass && document.body.classList.add(bodyClass);
  } catch (error) {}
};

var prepareFormData = exports.prepareFormData = function prepareFormData(form) {
  var formFields = form.fields;
  return Object.keys(formFields).reduce(function (formData, fieldKey) {
    var _formFields$fieldKey = formFields[fieldKey],
        file = _formFields$fieldKey.file,
        jsonPath = _formFields$fieldKey.jsonPath;
    var value = formFields[fieldKey].value;

    if (file) {
      value = (form.files && form.files[fieldKey] || []).map(function (fieldFile) {
        return fieldFile.fileStoreId;
      });
    }
    return (0, _set2.default)(formData, jsonPath, value);
  }, {});
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

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

var fetchImages = exports.fetchImages = function fetchImages(actionArray) {
  var imageArray = [];
  actionArray.forEach(function (action, index) {
    action.action === "open" && action.media && imageArray.push(action.media);
  });
  return imageArray[0] ? imageArray[0] : [];
};

// export const getUserInfo = () => {
//   let userInfo = getUserInfo();
//   try {
//     userInfo = JSON.parse(userInfo);
//   } catch (error) {
//     userInfo = null;
//   }
//   return userInfo;
// };

var getCityNameByCode = exports.getCityNameByCode = function getCityNameByCode(code, localizationLabels) {
  var tenantId = code && code.replace(".", "_").toUpperCase();
  return code && getTranslatedLabel("TENANT_TENANTS_" + tenantId, localizationLabels);
};

var isImage = exports.isImage = function isImage(url) {
  var acceptedImageTypes = ["jpg", "jpeg", "png"];
  var urlParts = url && url.split("?");
  var imageType = urlParts && urlParts.length && urlParts[0].split(".") && urlParts[0].split(".").length && urlParts[0].split(".").pop();
  return imageType && acceptedImageTypes.indexOf(imageType) !== -1 || false;
};

//using in Employee Screens

var dateDiffInDays = function dateDiffInDays(a, b) {
  var millsPerDay = 1000 * 60 * 60 * 24;
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / millsPerDay);
};

// export const getCommaSeperatedAddress = (buildingName, street) => {
//   return buildingName && street ? `${buildingName}, ${street}` : "NA";
// };

var getTransformedStatus = exports.getTransformedStatus = function getTransformedStatus(status) {
  var transformedStatus = "";
  switch (status && status.toLowerCase()) {
    case "open":
    case "new":
    case "reassignrequested":
      transformedStatus = "UNASSIGNED";
      break;
    case "resolved":
    case "rejected":
    case "closed":
      transformedStatus = "CLOSED";
      break;
    case "assigned":
      transformedStatus = "ASSIGNED";
      break;
    default:
      transformedStatus = "UNASSIGNED";
      break;
  }
  return transformedStatus;
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileImage = exports.isFileImage = function isFileImage(file) {
  var mimeType = file["type"];
  return mimeType && mimeType.split("/")[0] == "image" || false;
};

var getNameFromId = exports.getNameFromId = function getNameFromId(obj, id, defaultValue) {
  return obj && id && obj[id] ? obj[id].name : defaultValue;
};

var getPropertyFromObj = exports.getPropertyFromObj = function getPropertyFromObj(obj, id, property, defaultValue) {
  return obj && obj[id] ? obj[id][property] : defaultValue;
};

var returnSLAStatus = exports.returnSLAStatus = function returnSLAStatus(slaHours, submittedTime) {
  var millsToAdd = slaHours * 60 * 60 * 1000;
  var toBeFinishedBy = millsToAdd + submittedTime;
  var slaStatement = "";
  var daysCount = dateDiffInDays(new Date(Date.now()), new Date(toBeFinishedBy));
  if (daysCount < 0) {
    slaStatement = Math.abs(daysCount) === 1 ? "CS_OVERDUE_BY_DAY" : "CS_OVERDUE_BY_DAYS";
    //slaStatement = Math.abs(daysCount) === 1 ? `Overdue by ${Math.abs(daysCount)} day` : `Overdue by ${Math.abs(daysCount)} days`;
  } else {
    slaStatement = Math.abs(daysCount) === 1 ? "CS_DAY_LEFT" : "CS_DAYS_LEFT";
    //slaStatement = Math.abs(daysCount) === 1 ? `${Math.abs(daysCount)} day left` : `${Math.abs(daysCount)} days left`;
  }
  return {
    slaStatement: slaStatement,
    daysCount: daysCount
  };
};

var getCommaSeperatedAddress = exports.getCommaSeperatedAddress = function getCommaSeperatedAddress(address, cities) {
  var name = address && address.locality && address.locality.name ? address.locality.name : "";
  var cityName = address && address.city ? address.city : "";
  var pincode = address && address.pincode ? address.pincode : "";
  // cities &&
  //   cities.forEach((city) => {
  //     if (city.code === cityValue) {
  //       cityName = city.name;
  //     }
  //   });
  var addressKeys = ["doorNo", "buildingName", "street"];
  var addressArray = addressKeys.reduce(function (result, curr) {
    if (address && address[curr]) {
      result.push(address[curr]);
    }
    return [].concat((0, _toConsumableArray3.default)(result));
  }, []);
  addressArray = pincode ? [].concat((0, _toConsumableArray3.default)(addressArray), [name, cityName, pincode]) : [].concat((0, _toConsumableArray3.default)(addressArray), [name, cityName]);
  return addressArray.join(", ");
};

var getLatestCreationTime = exports.getLatestCreationTime = function getLatestCreationTime(complaint) {
  for (var i = 0; i < complaint.actions.length; i++) {
    if (complaint.actions[i].action === "reopen") {
      return complaint.actions[i].when;
    }
  }
  return complaint.auditDetails.createdTime;
};

var transformLocalizationLabels = exports.transformLocalizationLabels = function transformLocalizationLabels(localizationLabels) {
  var labelsById = transformById(localizationLabels, "code");
  return labelsById;
};

var flatten = exports.flatten = function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? undefined.flatten(toFlatten) : toFlatten);
  }, []);
};

var getTenantForLatLng = exports.getTenantForLatLng = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(lat, lng) {
    var queryObjList, response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryObjList = [{ key: "lat", value: lat }, { key: "lng", value: lng }, { key: "tenantId", value: _common2.default.tenantId }];
            response = void 0;

            if (!(lat && lng)) {
              _context2.next = 13;
              break;
            }

            _context2.prev = 3;
            _context2.next = 6;
            return (0, _api2.httpRequest)(_endPoints.TENANT.POST.URL, _endPoints.TENANT.POST.ACTION, queryObjList);

          case 6:
            response = _context2.sent;
            return _context2.abrupt("return", response.Tenant.code);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](3);
            throw new Error(_context2.t0.message);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 10]]);
  }));

  return function getTenantForLatLng(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var findLatestAssignee = exports.findLatestAssignee = function findLatestAssignee(actionArray) {
  for (var i = 0; i < actionArray.length; i++) {
    if (actionArray[i].status === "assigned") {
      return actionArray[i].assignee;
    }
  }
  return null;
};

var getLatestAction = function getLatestAction(actionArr) {
  return actionArr.reduce(function (result, current) {
    if (current.when > result) {
      result = current.when;
    }
    return result;
  }, 0);
};

// export const getAddressDetail = (addressDetail) => {
//   const { houseNoAndStreetName, landmark, mohalla, city } = addressDetail;
//   return houseNoAndStreetName && landmark
//     ? `${houseNoAndStreetName},${mohalla},${landmark},${city}`
//     : !houseNoAndStreetName && landmark
//     ? `${mohalla},${landmark},${city}`
//     : houseNoAndStreetName && !landmark
//     ? `${houseNoAndStreetName},${mohalla},${city}`
//     : `${mohalla},${city}`;
// };

var transformComplaintForComponent = exports.transformComplaintForComponent = function transformComplaintForComponent(complaints, role, employeeById, citizenById, categoriesById, displayStatus) {
  var defaultPhoneNumber = "";
  var transformedComplaints = Object.values(complaints.byId).map(function (complaintDetail, index) {
    var filedUserName = complaintDetail && complaintDetail.citizen && complaintDetail.citizen.name;
    var isFiledByCSR = complaintDetail && complaintDetail.actions && complaintDetail.actions[complaintDetail.actions.length - 1].by && complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[1] && complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[1] === "Citizen Service Representative";
    return {
      header: getPropertyFromObj(complaints.categoriesById, complaintDetail.serviceCode, "serviceCode", "NA"),
      date: complaintDetail.auditDetails.createdTime,
      latestCreationTime: getLatestCreationTime(complaintDetail),
      complaintNo: complaintDetail.serviceRequestId,
      images: fetchImages(complaintDetail.actions).filter(function (imageSource) {
        return isImage(imageSource);
      }),
      complaintStatus: complaintDetail.status && getTransformedStatus(complaintDetail.status),
      rawStatus: complaintDetail.status && complaintDetail.status,
      address: complaintDetail.address ? complaintDetail.address : "",
      addressDetail: complaintDetail.addressDetail ? complaintDetail.addressDetail : {},
      reassign: complaintDetail.status === "reassignrequested" ? true : false,
      reassignRequestedBy: complaintDetail.status === "reassignrequested" ? getPropertyFromObj(employeeById, complaintDetail.actions[0].by.split(":")[0], "name", "NA") : "NA",
      latestActionTime: complaintDetail && complaintDetail.actions && getLatestAction(complaintDetail.actions),
      submittedBy: filedUserName ? isFiledByCSR ? filedUserName + " (Citizen Service Desk)" : filedUserName : "NA",
      citizenPhoneNumber: complaintDetail && complaintDetail.citizen && complaintDetail.citizen.mobileNumber,
      assignedTo: complaintDetail && getPropertyFromObj(employeeById, findLatestAssignee(complaintDetail.actions), "name", "NA"),
      employeePhoneNumber: employeeById && employeeById[findLatestAssignee(complaintDetail.actions)] ? employeeById[findLatestAssignee(complaintDetail.actions)].mobileNumber : defaultPhoneNumber,
      status: role === "citizen" ? displayStatus(complaintDetail.status, complaintDetail.assignee, complaintDetail.actions.filter(function (complaint) {
        return complaint.status;
      })[0].action) : getTransformedStatus(complaintDetail.status) === "CLOSED" ? complaintDetail.rating ? displayStatus(complaintDetail.rating + "/5") : displayStatus(complaintDetail.actions[0].status) : displayStatus(returnSLAStatus(getPropertyFromObj(categoriesById, complaintDetail.serviceCode, "slaHours", "NA"), getLatestCreationTime(complaintDetail)).slaStatement),
      SLA: returnSLAStatus(getPropertyFromObj(categoriesById, complaintDetail.serviceCode, "slaHours", "NA"), getLatestCreationTime(complaintDetail)).daysCount
    };
  });
  return transformedComplaints;
};

var startSMSRecevier = exports.startSMSRecevier = function startSMSRecevier() {
  try {
    if (typeof androidAppProxy !== "undefined") {
      window.androidAppProxy.requestSMS();
    }
  } catch (error) {}
};

var upperCaseFirst = exports.upperCaseFirst = function upperCaseFirst(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
};

//Specific for MDMS Screens
var mergeMDMSDataArray = exports.mergeMDMSDataArray = function mergeMDMSDataArray(oldData, newRow) {
  var rawData = [].concat((0, _toConsumableArray3.default)(oldData));
  rawData.forEach(function (item, index) {
    if (item.code === newRow.code) {
      //Update Case
      rawData.splice(index, 1);
    }
  });
  var mergedData = [newRow].concat((0, _toConsumableArray3.default)(rawData));
  return mergedData;
};

var fetchDropdownData = exports.fetchDropdownData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch, dataFetchConfig, formKey, fieldKey, state, boundary) {
    var url, action, requestBody, queryParams, hierarchyType, localizationLabels, payloadSpec, dropdownData, ddData, message;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = dataFetchConfig.url, action = dataFetchConfig.action, requestBody = dataFetchConfig.requestBody, queryParams = dataFetchConfig.queryParams, hierarchyType = dataFetchConfig.hierarchyType;
            _context3.prev = 1;

            if (!url) {
              _context3.next = 11;
              break;
            }

            localizationLabels = {};

            if (state && state.app) localizationLabels = state.app && state.app.localizationLabels || {};
            _context3.next = 7;
            return (0, _api2.httpRequest)(url, action, queryParams || [], requestBody);

          case 7:
            payloadSpec = _context3.sent;
            dropdownData = boundary ? // ? jp.query(payloadSpec, dataFetchConfig.dataPath)
            payloadSpec.TenantBoundary[0].boundary : dataFetchConfig.dataPath.reduce(function (dropdownData, path) {
              dropdownData = [].concat((0, _toConsumableArray3.default)(dropdownData), (0, _toConsumableArray3.default)((0, _get2.default)(payloadSpec, path)));
              return dropdownData;
            }, []);
            ddData = dropdownData && dropdownData.length > 0 && dropdownData.reduce(function (ddData, item) {
              var option = {};
              if (fieldKey === "mohalla" && item.code) {
                var mohallaCode = queryParams[0].value.toUpperCase().replace(/[.]/g, "_") + "_" + hierarchyType + "_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_");
                option = {
                  label: getTranslatedLabel(mohallaCode, localizationLabels),
                  value: item.code
                };
              } else {
                option = {
                  label: item.name,
                  value: item.code
                };
              }

              // let option = {
              //   label:
              //     fieldKey === "mohalla"
              //       ? `${queryParams[0].value.toUpperCase().replace(/[.]/g, "_")}_${hierarchyType}_${item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")}`
              //       : item.name,
              //   value: item.code,
              // };
              //Only for boundary
              item.area && (option.area = item.area);
              ddData.push(option);
              return ddData;
            }, []);

            dispatch((0, _actions3.setFieldProperty)(formKey, fieldKey, "dropDownData", ddData));

          case 11:
            _context3.next = 18;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            message = _context3.t0.message;

            if (fieldKey === "mohalla") {
              dispatch((0, _actions2.toggleSnackbarAndSetText)(true, { labelName: "There is no admin boundary data available for this tenant", labelKey: "ERR_NO_ADMIN_BOUNDARY_FOR_TENANT" }, "error"));
            } else {
              dispatch((0, _actions2.toggleSnackbarAndSetText)(true, { labelName: message, labelKey: message }, "error"));
            }
            return _context3.abrupt("return");

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 13]]);
  }));

  return function fetchDropdownData(_x4, _x5, _x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var trimObj = exports.trimObj = function trimObj(obj) {
  if (!Array.isArray(obj) && (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) != "object") return obj;
  for (var key in obj) {
    obj[key.trim()] = typeof obj[key] === "string" ? obj[key].trim() : trimObj(obj[key]);
    if (key === "") delete obj[key];
  }
  return obj;
};

var hasTokenExpired = exports.hasTokenExpired = function hasTokenExpired(status, data) {
  if (status === 401) {
    if (data && data.Errors && Array.isArray(data.Errors) && data.Errors.length > 0 && data.Errors[0].code === "InvalidAccessTokenException") return true;
  }
  return false;
};

var getEndpointfromUrl = function getEndpointfromUrl(url, name) {
  if (url && url.includes("digit-ui")) {
    return url;
  }
  var result = url.split(name + "=")[1];
  return result;
};

var getTimeFormat = function getTimeFormat(epochTime) {
  epochTime = new Date(epochTime);
  var Period = epochTime.getHours() < 12 ? "AM" : "PM";
  var Format = epochTime.getHours() % 12 > 0 ? epochTime.getHours() % 12 : 12;
  return Format.toString() + ":" + epochTime.toString().split(":")[1] + " " + Period;
};
var getDateFormat = function getDateFormat(epochTime) {
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  epochTime = new Date(epochTime);
  var day = epochTime.getDate();
  var Month = epochTime.getMonth();
  return day.toString() + " " + monthNames[Month];
};

var getEventSLA = function getEventSLA(item) {
  var days = (Date.now() - item.auditDetails.lastModifiedTime) / (1000 * 60 * 60 * 24);
  var sla = void 0;

  if (item.eventType === "EVENTSONGROUND") {
    var disp = getDateFormat(item.eventDetails.fromDate) + " " + getTimeFormat(item.eventDetails.fromDate) + "-" + getDateFormat(item.eventDetails.toDate) + " " + getTimeFormat(item.eventDetails.toDate);
    sla =
    // <div style={{ display: "flex" }}>
    //   <Icon name="access-time" action="device" viewBox="0 0 24 24" style={{ height: "20px", width: "35px" }} />
    _react2.default.createElement(_translationNode2.default, { leftWrapperStyle: true, fontSize: 13, color: "rgba(0, 0, 0, 0.60)", label: disp, containerStyle: { marginBottom: 5, marginLeft: -7 } })
    // </div>
    ;
  } else {
    if (days >= 60) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_MONTH", dynamicArray: [Math.floor(days / 30)], fontSize: 12 });else if (days >= 30) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_MONTH_ONE", dynamicArray: [Math.floor(days / 30)], fontSize: 12 });else if (days >= 14) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_WEEK", dynamicArray: [Math.floor(days / 7)], fontSize: 12 });else if (days >= 7) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_WEEK_ONE", dynamicArray: [Math.floor(days / 7)], fontSize: 12 });else if (days >= 2) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_DAY", dynamicArray: [Math.floor(days)], fontSize: 12 });else if (days >= 1) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_DAY_ONE", dynamicArray: [Math.floor(days)], fontSize: 12 });else if (days % 1 * 24 >= 2) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_TIME", dynamicArray: [Math.floor(days % 1 * 24)], fontSize: 12 });else if (days % 1 * 24 >= 1) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_TIME_ONE", dynamicArray: [Math.floor(days % 1 * 24)], fontSize: 12 });else if (days % 1 * 24 * 60 >= 2) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_MINUTE", dynamicArray: [Math.floor(days % 1 * 24 * 60)], fontSize: 12 });else if (days % 1 * 24 * 60 >= 1) sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_MINUTE_ONE", dynamicArray: [Math.floor(days % 1 * 24 * 60)], fontSize: 12 });else sla = _react2.default.createElement(_translationNode2.default, { label: "CS_SLA_NOW", fontSize: 12 });
  }

  return sla;
};

var getEventDate = function getEventDate(eventDate) {
  var month = new Date(eventDate).toString().split(" ")[1].toUpperCase();
  var day = new Date(eventDate).getDate();
  return month + ":" + day;
};

var setDocuments = function setDocuments(fileUrl) {
  return {
    title: "",
    link: fileUrl && fileUrl.split(",")[0] || "",
    linkText: "View",
    name: decodeURIComponent(fileUrl.split(",")[0].split("?")[0].split("/").pop().slice(13)) || "Document"
  };
};

var getTransformedNotifications = exports.getTransformedNotifications = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(notifications) {
    var data, fileStoreIdArray, fieStoreIdString, _loop, i, fileUrls, finalArray;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = [];
            fileStoreIdArray = {};
            fieStoreIdString = [];

            _loop = function _loop() {
              var item = notifications[i];
              if (item.eventDetails && item.eventDetails.documents) {
                item.eventDetails.documents.forEach(function (element) {
                  fieStoreIdString.push(element.fileStoreId);
                  if (!(0, _get2.default)(fileStoreIdArray, item.id)) (0, _set2.default)(fileStoreIdArray, item.id, []);
                  fileStoreIdArray[item.id].push(element.fileStoreId);
                });
              }

              data.push({
                actions: item.actions,
                name: item.name,
                description: item.description,
                eventCategory: item.eventCategory,
                address: item.eventDetails && item.eventDetails.address,
                SLA: item.auditDetails && item.auditDetails.lastModifiedTime && getEventSLA(item),
                buttons: item.actions && item.actions.actionUrls ? item.actions.actionUrls.map(function (actionUrls) {
                  return {
                    label: actionUrls.code,
                    route: getEndpointfromUrl(actionUrls.actionUrl, "redirectTo")
                  };
                }) : [],
                eventDate: item.eventDetails && getEventDate(item.eventDetails.fromDate) || "",
                eventToDate: item.eventDetails && getEventDate(item.eventDetails.toDate) || "",
                type: item.eventType,
                id: item.id,
                tenantId: item.tenantId,
                locationObj: item.eventDetails && { lat: item.eventDetails.latitude || 12.9199988, lng: item.eventDetails.longitude || 77.67078 },
                entryFees: item.eventDetails && item.eventDetails.fees,
                referenceId: item.referenceId
              });
            };

            for (i = 0; i < notifications.length; i++) {
              _loop();
            }
            _context4.next = 7;
            return (0, _commons.getFileUrlFromAPI)(fieStoreIdString.join(","));

          case 7:
            fileUrls = _context4.sent;
            finalArray = data && data.reduce(function (result, item) {
              var doc = (0, _get2.default)(fileStoreIdArray, item.id) && (0, _get2.default)(fileStoreIdArray, item.id).map(function (item, index) {
                return setDocuments((0, _get2.default)(fileUrls, item));
              });
              result.push((0, _extends3.default)({}, item, {
                documents: doc
              }));
              return result;
            }, []);
            return _context4.abrupt("return", finalArray);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getTransformedNotifications(_x10) {
    return _ref4.apply(this, arguments);
  };
}();

var onNotificationClick = exports.onNotificationClick = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(history) {
    var permanentCity, queryObject, requestBody;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            permanentCity = JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity;
            queryObject = [{
              key: "tenantId",
              value: permanentCity ? permanentCity : (0, _localStorageUtils.getTenantId)()
            }];
            requestBody = {
              RequestInfo: {
                apiId: "org.egov.pt",
                ver: "1.0",
                ts: 1502890899493,
                action: "asd",
                did: "4354648646",
                key: "xyz",
                msgId: "654654",
                requesterId: "61",
                authToken: (0, _localStorageUtils.getAccessToken)()
              }
            };
            _context5.next = 6;
            return (0, _api2.httpRequest)("/egov-user-event/v1/events/lat/_update", "_update", queryObject, requestBody);

          case 6:
            history.push("/notifications");
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);

            (0, _actions2.toggleSnackbarAndSetText)(true, { labelName: "Count update error", labelKey: "Count update error" }, "error");

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 9]]);
  }));

  return function onNotificationClick(_x11) {
    return _ref5.apply(this, arguments);
  };
}();

var getTotalAmountDue = exports.getTotalAmountDue = function getTotalAmountDue(payload) {
  return payload && payload.Bill && payload.Bill.length > 0 && payload.Bill[0].totalAmount ? payload.Bill[0].totalAmount : 0;
};

var setRoute = exports.setRoute = function setRoute(link) {
  // let moduleName = process.env.REACT_APP_NAME === "Citizen" ? '/citizen' : '/employee';
  // window.location.href =
  //   process.env.NODE_ENV === "production"
  //     ? moduleName + link
  //     : link;

  (0, _formActionUtils.routeTo)(link);
};

var navigateToApplication = exports.navigateToApplication = function navigateToApplication(businessService, propsHistory, applicationNo, tenantId, propertyId) {
  if (businessService == "PT.MUTATION") {
    setRoute("/pt-mutation/search-preview?applicationNumber=" + applicationNo + "&propertyId=" + propertyId + "&tenantId=" + tenantId);
  } else if (businessService == "PT.CREATE") {
    setRoute("/property-tax/application-preview?propertyId=" + propertyId + "&applicationNumber=" + applicationNo + "&tenantId=" + tenantId + "&type=property");
  } else if (businessService == "PT.UPDATE") {
    setRoute("/property-tax/application-preview?propertyId=" + propertyId + "&applicationNumber=" + applicationNo + "&tenantId=" + tenantId + "&type=updateProperty");
  } else if (businessService == "PT.LEGACY") {
    setRoute("/property-tax/application-preview?propertyId=" + propertyId + "&applicationNumber=" + applicationNo + "&tenantId=" + tenantId + "&type=legacy");
  } else {
    setRoute((0, _formUtils.getPropertyInfoScreenUrl)(propertyId, tenantId));
  }
};

var getApplicationType = exports.getApplicationType = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(applicationNumber, tenantId, creationReason) {
    var queryObject, payload;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            queryObject = [{ key: "businessIds", value: applicationNumber }, { key: "history", value: true }, { key: "tenantId", value: tenantId }];
            _context6.prev = 1;

            if (!creationReason) {
              _context6.next = 22;
              break;
            }

            if (!(creationReason == "MUTATION")) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", "PT.MUTATION");

          case 7:
            if (!(creationReason == "CREATE")) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", "PT.CREATE");

          case 11:
            if (!(creationReason == "LEGACY_ENTRY")) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", "PT.LEGACY");

          case 15:
            if (!(creationReason == "UPDATE")) {
              _context6.next = 19;
              break;
            }

            return _context6.abrupt("return", "PT.UPDATE");

          case 19:
            return _context6.abrupt("return", "NA");

          case 20:
            _context6.next = 27;
            break;

          case 22:
            _context6.next = 24;
            return (0, _api2.httpRequest)("egov-workflow-v2/egov-wf/process/_search", "_search", queryObject);

          case 24:
            payload = _context6.sent;

            if (!(payload && payload.ProcessInstances.length > 0)) {
              _context6.next = 27;
              break;
            }

            return _context6.abrupt("return", payload.ProcessInstances[0].businessService);

          case 27:
            _context6.next = 31;
            break;

          case 29:
            _context6.prev = 29;
            _context6.t0 = _context6["catch"](1);

          case 31:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 29]]);
  }));

  return function getApplicationType(_x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();

var isDocumentValid = exports.isDocumentValid = function isDocumentValid(docUploaded, requiredDocCount) {
  var totalDocsKeys = Object.keys(docUploaded) || [];
  var isValid = true;
  for (var key = 0; key < totalDocsKeys.length; key++) {
    if (docUploaded[key].isDocumentRequired) {
      if (docUploaded[key].documents && docUploaded[key].dropdown && docUploaded[key].dropdown.value) {
        isValid = true;
      } else {
        isValid = false;
        break;
      }
    } else {
      if (docUploaded[key].documents && (!docUploaded[key].dropdown || !docUploaded[key].dropdown.value)) {
        isValid = false;
        break;
      }
    }
  }
  return isValid;
};

var getMohallaData = exports.getMohallaData = function getMohallaData(payload, tenantId) {
  return payload && payload.TenantBoundary[0] && payload.TenantBoundary[0].boundary && payload.TenantBoundary[0].boundary.reduce(function (result, item) {
    result.push((0, _extends3.default)({}, item, {
      name: tenantId.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
    }));
    return result;
  }, []);
};

var downloadPdf = exports.downloadPdf = function downloadPdf(link) {
  var openIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_blank";

  var win = window.open(link, openIn);
  if (win) {
    win.focus();
  }
};

var printPdf = exports.printPdf = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(link) {
    var response, file, fileURL, myWindow;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _axios2.default.get(link, {
              responseType: "arraybuffer",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/pdf"
              }
            });

          case 2:
            response = _context7.sent;
            file = new Blob([response.data], { type: "application/pdf" });
            fileURL = URL.createObjectURL(file);
            myWindow = window.open(fileURL);

            if (myWindow != undefined) {
              myWindow.addEventListener("load", function (event) {
                myWindow.focus();
                myWindow.print();
              });
            }

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function printPdf(_x16) {
    return _ref7.apply(this, arguments);
  };
}();

var openPdf = exports.openPdf = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(link) {
    var openIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_blank";
    var response, file, fileURL, myWindow;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(window && window.mSewaApp && window.mSewaApp.isMsewaApp && window.mSewaApp.isMsewaApp())) {
              _context8.next = 4;
              break;
            }

            downloadPdf(link, "_self");
            _context8.next = 11;
            break;

          case 4:
            _context8.next = 6;
            return _axios2.default.get(link, {
              responseType: "arraybuffer",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/pdf"
              }
            });

          case 6:
            response = _context8.sent;
            file = new Blob([response.data], { type: "application/pdf" });
            fileURL = URL.createObjectURL(file);
            myWindow = window.open(fileURL, openIn);

            if (myWindow != undefined) {
              myWindow.addEventListener("load", function (event) {
                myWindow.focus();
              });
            }

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function openPdf(_x17) {
    return _ref8.apply(this, arguments);
  };
}();

var downloadFromLink = exports.downloadFromLink = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(link) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "help.pdf";

    var _link;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (window && window.mSewaApp && window.mSewaApp.isMsewaApp && window.mSewaApp.isMsewaApp()) {
              downloadPdf(link, "_self");
            } else {
              _link = document.createElement("a");
              // create a blobURI pointing to our Blob

              _link.href = _link;
              _link.download = filename;
              // some browser needs the anchor to be in the doc
              document.body.append(_link);
              _link.click();
              _link.remove();
              // in case the Blob uses a lot of memory
              setTimeout(function () {
                return URL.revokeObjectURL(_link.href);
              }, 7000);
            }

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function downloadFromLink(_x19) {
    return _ref9.apply(this, arguments);
  };
}();

var getModuleName = exports.getModuleName = function getModuleName() {
  var pathName = window.location.pathname;
  if (pathName.indexOf("inbox") > -1) {
    return "rainmaker-common,rainmaker-noc,rainmaker-pgr";
  } else if (pathName.indexOf("dss") > -1) {
    return "rainmaker-dss";
  } else if (pathName.indexOf("receipts") > -1) {
    return "rainmaker-receipts";
  } else if (pathName.indexOf("property-tax") > -1 || pathName.indexOf("rainmaker-pt") > -1 || pathName.indexOf("pt-mutation") > -1) {
    return "rainmaker-pt,rainmaker-pgr";
  } else if (pathName.indexOf("pt-common-screens") > -1 || pathName.indexOf("pt-mutation/public-search") > -1) {
    return "rainmaker-pt";
  } else if (pathName.indexOf("complaint") > -1 || pathName.indexOf("pgr") > -1 || pathName.indexOf("resolve-success") > -1 || pathName.indexOf("employee-directory") > -1 || pathName.indexOf("reopen-acknowledgement") > -1 || pathName.indexOf("feedback") > -1 || pathName.indexOf("request-reassign") > -1 || pathName.indexOf("reassign-success") > -1) {
    return "rainmaker-pgr";
  } else if (pathName.indexOf("wns") > -1 || pathName.indexOf("wns/public-search") > -1) {
    return "rainmaker-ws";
  } else if (pathName.indexOf("tradelicense") > -1 || pathName.indexOf("rainmaker-tl") > -1 || pathName.indexOf("tradelicence") > -1 || pathName.indexOf("tradelicense-citizen") > -1) {
    return "rainmaker-tl";
  } else if (pathName.indexOf("hrms") > -1) {
    return "rainmaker-hr";
  } else if (pathName.indexOf("bill-amend") > -1) {
    return "rainmaker-bill-amend,rainmaker-abg";
  } else if (pathName.indexOf("fire-noc") > -1) {
    return "rainmaker-noc,rainmaker-pgr,rainmaker-common";
  } else if (pathName.indexOf("dss/home") > -1) {
    return "rainmaker-dss";
  } else if (pathName.indexOf("language-selection") > -1) {
    return "rainmaker-common,rainmaker-noc,rainmaker-pgr";
  } else if (pathName.indexOf("login") > -1) {
    return "rainmaker-common,rainmaker-noc,rainmaker-pgr";
  } else if (pathName.indexOf("pay") > -1) {
    return "rainmaker-noc";
  } else if (pathName.indexOf("abg") > -1) {
    return "rainmaker-abg";
  } else if (pathName.indexOf("bills") > -1) {
    return "rainmaker-ws,rainmaker-abg,rainmaker-bills";
  } else if (pathName.indexOf("uc") > -1) {
    return "rainmaker-uc";
  } else if (pathName.indexOf("pgr-home") > -1 || pathName.indexOf("rainmaker-pgr") > -1) {
    return "rainmaker-pgr";
  } else if (pathName.indexOf("bpastakeholder") > -1 || pathName.indexOf("edcrscrutiny") > -1 || pathName.indexOf("egov-bpa") > -1 || pathName.indexOf("oc-bpa") > -1) {
    return "rainmaker-bpa,rainmaker-bpareg";
  } else if (pathName.indexOf("noc") > -1) {
    return "rainmaker-common-noc";
  } else if (pathName.indexOf("birth") > -1 || pathName.indexOf("death") > -1 || pathName.indexOf("bnd") > -1) {
    return "rainmaker-bnd";
  } else {
    return "rainmaker-common,rainmaker-noc,rainmaker-pgr";
  }
};

var businessServiceInfo = exports.businessServiceInfo = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(mdmsBody, businessService) {
    var payload, businessServiceInfoItem, businessServiceArray;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _api2.httpRequest)("/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 2:
            payload = _context10.sent;
            businessServiceInfoItem = null;
            businessServiceArray = payload.MdmsRes.BillingService.BusinessService;

            businessServiceArray && businessServiceArray.map(function (item) {
              if (item.code == businessService) {
                businessServiceInfoItem = item;
              }
            });
            return _context10.abrupt("return", businessServiceInfoItem);

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function businessServiceInfo(_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();

var searchConsumer = exports.searchConsumer = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(items, queryObject) {
    var payload, consumerDetails;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _api2.httpRequest)("/" + items.fetchConsumerUrl, "_search", queryObject);

          case 2:
            payload = _context11.sent;
            consumerDetails = payload && payload.WaterConnection ? payload.WaterConnection : payload.SewerageConnections;
            return _context11.abrupt("return", consumerDetails);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function searchConsumer(_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();

var fetchConsumerBill = exports.fetchConsumerBill = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(items, queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _api2.httpRequest)("/" + items.fecthBillUrl, "_search", queryObject);

          case 2:
            response = _context12.sent;
            return _context12.abrupt("return", response && response.Bill && response.Bill[0]);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function fetchConsumerBill(_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}();

var getBusinessServiceMdmsData = exports.getBusinessServiceMdmsData = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(dispatch, tenantId, businessService) {
    var mdmsBody, businessServiceItem;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "BillingService",
                  masterDetails: [{ name: "BusinessService" }]
                }]
              }
            };
            _context13.prev = 1;
            _context13.next = 4;
            return businessServiceInfo(mdmsBody, businessService);

          case 4:
            businessServiceItem = _context13.sent;

            dispatch((0, _actions.prepareFinalObject)("businessServiceInfo", businessServiceItem));
            _context13.next = 10;
            break;

          case 8:
            _context13.prev = 8;
            _context13.t0 = _context13["catch"](1);

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[1, 8]]);
  }));

  return function getBusinessServiceMdmsData(_x27, _x28, _x29) {
    return _ref13.apply(this, arguments);
  };
}();

var getPaymentSearchAPI = exports.getPaymentSearchAPI = function getPaymentSearchAPI() {
  var businessService = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var isCitizenbusinessService = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (businessService == "-1") {
    return "" + _endPoints2.PAYMENTSEARCH.GET.URL + _endPoints2.PAYMENTSEARCH.GET.ACTION;
  } else if (process.env.REACT_APP_NAME === "Citizen" && !isCitizenbusinessService) {
    return "" + _endPoints2.PAYMENTSEARCH.GET.URL + _endPoints2.PAYMENTSEARCH.GET.ACTION;
  }
  return "" + _endPoints2.PAYMENTSEARCH.GET.URL + businessService + "/" + _endPoints2.PAYMENTSEARCH.GET.ACTION;
};

var getFetchBillAPI = exports.getFetchBillAPI = function getFetchBillAPI() {
  return "" + _endPoints2.FETCHBILL.GET.URL;
};

// const userObject=JSON.parse(localStorage.getItem("citizen.userRequestObject"))||{};
// return {user:[userObject]};

var getUserSearchedResponse = exports.getUserSearchedResponse = function getUserSearchedResponse() {
  var userObject = JSON.parse(localStorage.getItem("citizen.userRequestObject")) || {};
  if (process.env.REACT_APP_NAME == "Citizen" && _common2.default.singleInstance) {
    userObject = convertUserForSingleInstance(userObject);
  }
  return { user: [userObject] };
};

var getResultUrl = exports.getResultUrl = function getResultUrl(moduleName, reportName) {
  var reportResultUrl = "/report/" + moduleName + "/" + reportName + "/_get";
  return reportResultUrl;
};
var translate = exports.translate = function translate(locale_text) {
  return locale_text;
};

var downloadWNSBill = exports.downloadWNSBill = function downloadWNSBill(queryObj, fileName) {
  (0, _generatePDF.searchAndDownloadPdf)("/egov-pdf/download/WNS/wnsbill", queryObj, fileName);
};

var printWNSBill = exports.printWNSBill = function printWNSBill(queryObj) {
  (0, _generatePDF.searchAndPrintPdf)("/egov-pdf/download/WNS/wnsbill", queryObj);
};

var wnsBill = function wnsBill(consumerCode, tenantId, service) {
  var query = [{ key: "applicationNumber", value: consumerCode }, { key: "tenantId", value: tenantId }, { key: "bussinessService", value: service }];
  downloadWNSBill(query, service + "-BILL-" + consumerCode + ".pdf");
};

var downloadWNSBillFromConsumer = exports.downloadWNSBillFromConsumer = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(consumerCode, tenantId, service) {
    var serviceURL, response;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            serviceURL = service == "WS" ? "ws-services/wc/_search" : "sw-services/swc/_search";
            _context14.next = 3;
            return (0, _api.httpRequest)("post", serviceURL + "?tenantId=" + tenantId + "&isConnectionSearch=true&connectionNumber=" + consumerCode, "_search", [], {});

          case 3:
            response = _context14.sent;

            if (response && response.WaterConnection && response.WaterConnection.length > 0) {
              wnsBill(response.WaterConnection[0].applicationNo, tenantId, service);
            } else if (response && response.SewerageConnections && response.SewerageConnections.length > 0) {
              wnsBill(response.SewerageConnections[0].applicationNo, tenantId, service);
            }

          case 5:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function downloadWNSBillFromConsumer(_x32, _x33, _x34) {
    return _ref14.apply(this, arguments);
  };
}();

/* TO CONVERT USER TO CENTRAL INSTANCE */
var convertUserForSingleInstance = exports.convertUserForSingleInstance = function convertUserForSingleInstance() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var tenantId = _common2.default.tenantId;
  localStorage.setItem("Citizen.tenant-id", tenantId);
  localStorage.setItem("tenant-id", tenantId);
  user.tenantId = tenantId;
  return (0, _extends3.default)({}, user);
};