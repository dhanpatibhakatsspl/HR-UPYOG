"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePdfFromDiv = exports.convertUnitsToSqFt = exports.transformPropertyDataToAssessInfo = exports.getEstimateFromBill = exports.getFinancialYearFromQuery = exports.getOwnerCategoryByYear = exports.getOwnerCategory = exports.sortDropdown = exports.findCorrectDateObjPenaltyIntrest = exports.findCorrectDateObj = exports.getQueryValue = exports.getCurrentFinancialYear = exports.getLatestPropertyDetails = exports.getFormattedDate = exports.getRowData = exports.resetFormWizard = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assessInfoFormManager = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/assessInfoFormManager");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _sortBy = require("lodash/sortBy");

var _sortBy2 = _interopRequireDefault(_sortBy);

var _uniqBy = require("lodash/uniqBy");

var _uniqBy2 = _interopRequireDefault(_uniqBy);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resetFormWizard = exports.resetFormWizard = function resetFormWizard(form, removeForm) {
  var formKeys = form && Object.keys(form);
  var formToReset = ["basicInformation", "propertyAddress", "plotDetails", "ownershipType", "institutionAuthority", "institutionDetails", "cashInfo", "paymentModes", "receiptInfo", "additionalRebate"];
  formKeys.forEach(function (formKey) {
    if (formToReset.includes(formKey) || formKey.startsWith("ownerInfo") || formKey.startsWith("customSelect_") || formKey.startsWith("floorDetails_")) {
      removeForm(formKey);
    }
  });
};

var onApplicationClick = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(applicationNo, tenantId, propertyId, history, creationReason) {
    var businessService;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _commons.getApplicationType)(applicationNo, tenantId, creationReason);

          case 2:
            businessService = _context.sent;

            (0, _commons.navigateToApplication)(businessService, history, applicationNo, tenantId, propertyId);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function onApplicationClick(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var linkStyle = {
  height: 20,
  lineHeight: "auto",
  minWidth: "inherit",
  cursor: "pointer",
  textDecoration: "underline"
};

var getApplicationLink = function getApplicationLink(applicationNo, tenantId, propertyId, history, creationReason) {
  return _react2.default.createElement(
    "a",
    {
      style: linkStyle,
      onClick: function onClick() {
        return onApplicationClick(applicationNo, tenantId, propertyId, history, creationReason);
      }
    },
    applicationNo
  );
};

var getLink = function getLink(userType, history, id, tenantId) {
  return _react2.default.createElement(
    "a",
    {
      style: linkStyle,
      onClick: userType === "CITIZEN" ? function (e) {
        history.push("/property-tax/my-properties/property/" + id + "/" + tenantId);
      } : function (e) {
        history.push("/property-tax/property/" + id + "/" + tenantId);
      }
    },
    id
  );
};

var getStatusColor = function getStatusColor(status) {
  switch (status) {
    case 'INWORKFLOW':
      return status = _react2.default.createElement(
        "span",
        { style: { color: "red" } },
        status
      );
    case 'ACTIVE':
      return status = _react2.default.createElement(
        "span",
        { style: { color: "green" } },
        status
      );
    default:
      return status;
  }
};

var getRowData = exports.getRowData = function getRowData(property, history) {
  var date = (0, _commons.getDateFromEpoch)(property.auditDetails.createdTime);
  var userType = JSON.parse((0, _localStorageUtils.getUserInfo)()).type;
  return {

    applicationNo: getApplicationLink(property.acknowldgementNumber, property.tenantId, property.propertyId, history, property.creationReason),
    propertyId: getLink(userType, history, property.propertyId, property.tenantId),
    applicationType: property.creationReason,
    name: property.owners[0].name,
    date: date,
    status: getStatusColor(property.status)

  };
};

var getFormattedDate = exports.getFormattedDate = function getFormattedDate(date) {
  var dateArray = new Date(date).toString().split(' ');
  if (dateArray.length > 0) {
    return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[3];
  } else {
    return 'dd-mmm-yyyy';
  }
};

var getLatestPropertyDetails = exports.getLatestPropertyDetails = function getLatestPropertyDetails(propertyDetailsArray) {
  if (propertyDetailsArray) {
    var currentFinancialYear = getCurrentFinancialYear();
    if (propertyDetailsArray.length > 1) {
      var assessmentsOfCurrentYear = propertyDetailsArray.filter(function (item) {
        return item.financialYear === currentFinancialYear;
      });
      var propertyDetails = assessmentsOfCurrentYear.length > 0 ? assessmentsOfCurrentYear : propertyDetailsArray;
      return propertyDetails.reduce(function (acc, curr) {
        return acc.assessmentDate > curr.assessmentDate ? acc : curr;
      });
    } else {
      return propertyDetailsArray[0];
    }
  } else {
    return;
  }
};

var getCurrentFinancialYear = exports.getCurrentFinancialYear = function getCurrentFinancialYear() {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth > 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1.slice(2);
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.slice(2);
  }
  return fiscalYr;
};

var getQueryValue = exports.getQueryValue = function getQueryValue(query, key) {
  return query && decodeURIComponent(query.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
};

var findCorrectDateObj = exports.findCorrectDateObj = function findCorrectDateObj(financialYear, category) {
  category.sort(function (a, b) {
    var yearOne = a.fromFY && a.fromFY.slice(0, 4);
    var yearTwo = b.fromFY && b.fromFY.slice(0, 4);
    if (yearOne < yearTwo) {
      return 1;
    } else return -1;
  });
  var assessYear = financialYear && financialYear.slice(0, 4);
  var chosenDateObj = {};
  var categoryYear = category.reduce(function (categoryYear, item) {
    var year = item.fromFY && item.fromFY.slice(0, 4);
    categoryYear.push(year);
    return categoryYear;
  }, []);
  var index = categoryYear.indexOf(assessYear);
  if (index > -1) {
    chosenDateObj = category[index];
  } else {
    for (var i = 0; i < categoryYear.length; i++) {
      if (assessYear > categoryYear[i]) {
        chosenDateObj = category[i];
        break;
      }
    }
  }
  var month = null;
  if (chosenDateObj.startingDay) {
    month = getMonth(chosenDateObj.startingDay);
    if (month === 1 || month === 2 || month === 3) {
      chosenDateObj.startingDay = chosenDateObj.startingDay + ("/" + ++assessYear);
    } else {
      chosenDateObj.startingDay = chosenDateObj.startingDay + ("/" + assessYear);
    }
  } else if (chosenDateObj.endingDay) {
    month = getMonth(chosenDateObj.endingDay);
    if (month === 1 || month === 2 || month === 3) {
      chosenDateObj.endingDay = chosenDateObj.endingDay + ("/" + ++assessYear);
    } else {
      chosenDateObj.endingDay = chosenDateObj.endingDay + ("/" + assessYear);
    }
  }
  return chosenDateObj;
};

var findCorrectDateObjPenaltyIntrest = exports.findCorrectDateObjPenaltyIntrest = function findCorrectDateObjPenaltyIntrest(financialYear, category) {
  category.sort(function (a, b) {
    var yearOne = a.fromFY && a.fromFY.slice(0, 4);
    var yearTwo = b.fromFY && b.fromFY.slice(0, 4);
    if (yearOne < yearTwo) {
      return 1;
    } else return -1;
  });
  var assessYear = financialYear && financialYear.slice(0, 4);
  var chosenDateObj = {};
  var categoryYear = category.reduce(function (categoryYear, item) {
    var year = item.fromFY && item.fromFY.slice(0, 4);
    categoryYear.push(year);
    return categoryYear;
  }, []);
  var index = categoryYear.indexOf(assessYear);
  if (index > -1) {
    chosenDateObj = category[index];
  } else {
    for (var i = 0; i < categoryYear.length; i++) {
      if (assessYear > categoryYear[i]) {
        chosenDateObj = category[i];
        break;
      }
    }
  }
  var month = null;
  if (chosenDateObj.startingDay) {
    var yearDiff = assessYear - chosenDateObj.fromFY.split("-")[0];
    var date = chosenDateObj.startingDay.split("/");
    var yr = parseInt(date.pop()) + yearDiff;
    var len = date.push(yr.toString());
    chosenDateObj.startingDay = date.join("/");
    month = getMonth(chosenDateObj.startingDay);
  }
  return chosenDateObj;
};

var getMonth = function getMonth(date) {
  return parseInt(date.split("/")[1]);
};

var sortDropdown = exports.sortDropdown = function sortDropdown(data, sortBy, isAscending) {
  var sortedData = data.slice().sort(function (a, b) {
    var textA = a[sortBy].toUpperCase();
    var textB = b[sortBy].toUpperCase();
    return isAscending ? textA < textB ? -1 : textA > textB ? 1 : 0 : textA < textB ? 1 : textA > textB ? -1 : 0;
  });
  return sortedData;
};
var getOwnerCategory = exports.getOwnerCategory = function getOwnerCategory() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var OwnerCatArray = data.map(function (item, index) {
    return { label: item.name, value: item.code };
  });
  return OwnerCatArray;
};
var getOwnerCategoryByYear = exports.getOwnerCategoryByYear = function getOwnerCategoryByYear(data, financialYear) {
  data.sort(function (a, b) {
    var yearOne = a.fromFY && a.fromFY.slice(0, 4);
    var yearTwo = b.fromFY && b.fromFY.slice(0, 4);
    if (yearOne < yearTwo) {
      return -1;
    } else return 1;
  });

  var fY = financialYear.slice(0, 4);
  var OwnerCatArray = data.reduce(function (OwnerCatArray, item) {
    var year = item.fromFY && item.fromFY.slice(0, 4);
    if (year <= fY) {
      OwnerCatArray.push({ label: item.name, value: item.code });
    }
    return OwnerCatArray;
  }, []);
  return OwnerCatArray;
};

var getFinancialYearFromQuery = exports.getFinancialYearFromQuery = function getFinancialYearFromQuery() {
  var financialYearFromQuery = window.location.search.split("FY=")[1];
  if (financialYearFromQuery) {
    return financialYearFromQuery.split("&")[0];
  }
  return null;
};

var getEstimateFromBill = exports.getEstimateFromBill = function getEstimateFromBill(bill) {
  var taxHeads = ["PT_TAX", "PT_UNIT_USAGE_EXEMPTION", "PT_OWNER_EXEMPTION", "PT_FIRE_CESS", "PT_CANCER_CESS", "PT_TIME_PENALTY", "PT_TIME_REBATE", "PT_TIME_INTEREST", "PT_ADHOC_PENALTY", "PT_ADHOC_REBATE", "PT_ADVANCE_CARRYFORWARD", "PT_DECIMAL_CEILING_DEBIT", "PT_ROUNDOFF"]; //Hardcoding as backend is not sending in correct order

  var _ref2 = bill && bill[0],
      billDetails = _ref2.billDetails,
      tenantId = _ref2.tenantId;

  var _ref3 = billDetails && billDetails[0],
      collectedAmount = _ref3.collectedAmount,
      totalAmount = _ref3.totalAmount,
      billAccountDetails = _ref3.billAccountDetails;

  var taxHeadsFromAPI = billAccountDetails.map(function (item) {
    return item.taxHeadCode;
  });
  var transformedTaxHeads = taxHeads.reduce(function (result, current) {
    if (taxHeadsFromAPI.indexOf(current) > -1) {
      result.push(current);
    }
    return result;
  }, []);
  var estimate = { totalAmount: 0 };
  estimate.totalAmount = totalAmount;
  estimate.tenantId = tenantId;
  estimate.collectedAmount = collectedAmount;
  var taxHeadEstimates = transformedTaxHeads.reduce(function (taxHeadEstimates, current) {
    var taxHeadContent = billAccountDetails.filter(function (item) {
      return item.taxHeadCode && item.taxHeadCode === current;
    });
    taxHeadContent && taxHeadContent[0] && taxHeadEstimates.push({
      taxHeadCode: taxHeadContent[0].taxHeadCode,
      // estimateAmount: taxHeadContent[0].debitAmount ? taxHeadContent[0].debitAmount : taxHeadContent[0].crAmountToBePaid,
      estimateAmount: taxHeadContent[0].amount,
      category: taxHeadContent[0].purpose
    });
    return taxHeadEstimates;
  }, []);
  // collectedAmount > 0 &&
  //   taxHeadEstimates.push({
  //     taxHeadCode: "PT_ADVANCE_CARRYFORWARD",
  //     estimateAmount: collectedAmount,
  //     category: "EXEMPTION",
  //   });
  estimate.taxHeadEstimates = taxHeadEstimates;
  return [(0, _extends3.default)({}, estimate)];
};

var transformPropertyDataToAssessInfo = exports.transformPropertyDataToAssessInfo = function transformPropertyDataToAssessInfo(data) {
  var propertyType = data["Properties"][0]["propertyDetails"][0]["propertyType"];
  var propertySubType = data["Properties"][0]["propertyDetails"][0]["propertySubType"];
  var usageCategoryMajor = data["Properties"][0]["propertyDetails"][0]["usageCategoryMajor"];
  var usageCategoryMinor = data["Properties"][0]["propertyDetails"][0]["usageCategoryMinor"];
  var propType = propertySubType === null ? propertyType : propertySubType;
  var propUsageType = usageCategoryMinor == null ? usageCategoryMajor : usageCategoryMinor;
  var formConfigPath = (0, _assessInfoFormManager.getPlotAndFloorFormConfigPath)(propUsageType, propType);
  var path = formConfigPath["path"];
  var dictFloor = {};
  var dictCustomSelect = {};

  var customSelectconfig = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/customSelect.js").default;
  var basicInfoConfig = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/basicInformation.js").default;
  var configPlot = null,
      configFloor = null;

  basicInfoConfig = (0, _cloneDeep2.default)(basicInfoConfig);
  (0, _set2.default)(basicInfoConfig, "fields.typeOfUsage.value", propUsageType);
  (0, _set2.default)(basicInfoConfig, "fields.typeOfBuilding.value", propType);
  if (propType === "SHAREDPROPERTY") {
    configPlot = { fields: { floorCount: { value: 1 } } };
  }

  if (formConfigPath["hasPlot"]) {
    configPlot = require("egov-ui-kit/config/forms/specs/" + path + "/plotDetails.js").default;
    configPlot = (0, _cloneDeep2.default)(configPlot);
    Object.keys(configPlot["fields"]).map(function (item) {
      var jsonPath = configPlot["fields"][item]["jsonPath"];
      if (item === "plotSize" && (propType === "VACANT" || propType === "INDEPENDENTPROPERTY")) {
        var value = (0, _get2.default)(data, modifyEndOfJsonPath(jsonPath, "landArea"));
        configPlot["fields"][item]["value"] = value;
      } else {
        var _value = (0, _get2.default)(data, jsonPath);
        configPlot["fields"][item]["value"] = _value;
      }
    });
  }

  if (formConfigPath["hasFloor"]) {
    configFloor = require("egov-ui-kit/config/forms/specs/" + path + "/floorDetails.js").default;
    var units = data["Properties"][0]["propertyDetails"][0]["units"];

    //For assigning consecutive indexes in formkeys irrespective of floor no.
    var floorIndexObj = prepareUniqueFloorIndexObj(units);
    for (var unitIndex = 0; unitIndex < units.length; unitIndex++) {
      var floorNo = units[unitIndex]["floorNo"];
      var floorIndex = floorIndexObj[floorNo];
      var formKey = propUsageType !== "RESIDENTIAL" && propType === "SHAREDPROPERTY" ? "floorDetails_0_unit_" + unitIndex : "floorDetails_" + floorIndex + "_unit_" + unitIndex;
      configFloor = (0, _cloneDeep2.default)(configFloor);
      Object.keys(configFloor["fields"]).forEach(function (item) {
        var jsonPath = configFloor["fields"][item]["jsonPath"];
        jsonPath = jsonPath.replace(/units\[[0-9]\]/g, "units[" + unitIndex + "]");
        configFloor["fields"][item].jsonPath = jsonPath;
        var valueInJSON = (0, _get2.default)(data, jsonPath);
        if (valueInJSON === null) {
          var categoryValue = jsonPath.split(".").pop();
          if (categoryValue === "usageCategoryMinor") {
            valueInJSON = (0, _get2.default)(data, modifyEndOfJsonPath(jsonPath, "usageCategoryMajor"));
          } else if (categoryValue === "usageCategoryDetail") {
            valueInJSON = (0, _get2.default)(data, modifyEndOfJsonPath(jsonPath, "usageCategorySubMinor"));
          }
        }
        configFloor["fields"][item].value = valueInJSON;
      });
      configFloor.unitsIndex = unitIndex;
      dictFloor[formKey] = configFloor;

      if (!("customSelect_" + floorIndex in dictCustomSelect)) {
        customSelectconfig = (0, _cloneDeep2.default)(customSelectconfig);
        customSelectconfig["fields"]["floorName"]["value"] = floorNo;
        dictCustomSelect["customSelect_" + floorIndex] = customSelectconfig;
      }
    }
  }

  return (0, _extends3.default)({ basicInformation: basicInfoConfig, plotDetails: configPlot }, dictFloor, dictCustomSelect);
};

var prepareUniqueFloorIndexObj = function prepareUniqueFloorIndexObj(units) {
  units = (0, _sortBy2.default)((0, _uniqBy2.default)(units, "floorNo"), function (unit) {
    return parseInt(unit.floorNo) || -99999;
  });
  var floorIndexObj = units.reduce(function (floorIndexObj, item, index) {
    if ((0, _isUndefined2.default)(floorIndexObj[item.floorNo])) {
      floorIndexObj[item.floorNo] = index;
    }
    return floorIndexObj;
  }, {});
  return floorIndexObj;
};

var convertUnitsToSqFt = exports.convertUnitsToSqFt = function convertUnitsToSqFt(unitArray) {
  return unitArray.map(function (unit) {
    var value = unit.unitArea;
    value = value * 9.0;
    value = Math.round(value * 100) / 100;
    unit.unitArea = value;
    return unit;
  });
};

var modifyEndOfJsonPath = function modifyEndOfJsonPath(jsonpath, toReplaceWith) {
  var jP = jsonpath.split(".");
  jP.pop();
  return jP.join(".") + "." + toReplaceWith;
};

var generatePdfFromDiv = exports.generatePdfFromDiv = function generatePdfFromDiv(action, applicationNumber, divIdName) {
  var target = document.querySelector(divIdName);

  (0, _html2canvas2.default)(target, {
    scale: 0.8,
    onclone: function onclone(clonedDoc) {
      if (clonedDoc.getElementById("pdf-header")) {
        clonedDoc.getElementById("pdf-header").style.display = "block";
      }
      if (clonedDoc.getElementById("property-assess-form")) {
        clonedDoc.getElementById("property-assess-form").style.display = "none";
      }
      if (clonedDoc.getElementById("pt-header-button-container")) {
        clonedDoc.getElementById("pt-header-button-container").style.display = "none";
      }
      if (clonedDoc.getElementById("pt-flex-child-button")) {
        clonedDoc.getElementById("pt-flex-child-button").style.display = "none";
      }
      if (clonedDoc.getElementById("pt-header-due-amount")) {
        clonedDoc.getElementById("pt-header-due-amount").style.display = "none";
      }
    }
  }).then(function (canvas) {

    var data = canvas.toDataURL("image/png", 1);
    var imgWidth = 200;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    var doc = new _jspdf2.default("p", "mm");
    var position = 0;
    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    if (action === "download") {
      doc.save("preview-" + applicationNumber + ".pdf");
    } else if (action === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }
  });
};