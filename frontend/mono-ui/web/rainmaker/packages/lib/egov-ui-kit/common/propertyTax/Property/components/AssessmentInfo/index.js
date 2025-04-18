"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnitInfo = exports.getAssessmentInfo = exports.getOccupancyInfo = exports.getUnitUsageTypeInfo = exports.getaddressPropertyEntryTypeInfo = exports.getRainWaterHarvestingInfo = exports.getPlotSizeInfo = exports.getUsageTypeInfo = exports.getBuildingTypeInfo = undefined;

var _utils = require("egov-ui-kit/redux/app/utils");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PropertyInfoCard = require("../PropertyInfoCard");

var _PropertyInfoCard2 = _interopRequireDefault(_PropertyInfoCard);

var _commons2 = require("egov-ui-framework/ui-utils/commons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkNA = function checkNA() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return val != null && val ? "" + val : 'NA';
}; // import { connect } from "react-redux";

var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
var localizationLabelsData = (0, _utils.initLocalizationLabels)(locale);

var transform = function transform(floor, key, generalMDMSDataById, propertyDetails) {
  var propertySubType = propertyDetails.propertySubType,
      usageCategoryMajor = propertyDetails.usageCategoryMajor;
  var masterName = key.masterName,
      dataKey = key.dataKey;

  if (!masterName) {
    return floor["occupancyType"] === "RENTED" ? "INR " + floor["arv"] : Math.round(floor[dataKey] * 100) / 100 + " sq yards";
  } else {
    if (floor[dataKey]) {
      if (dataKey === "usageCategoryDetail") {
        return generalMDMSDataById["UsageCategoryDetail"] ? generalMDMSDataById["UsageCategoryDetail"][floor[dataKey]].name : generalMDMSDataById["UsageCategorySubMinor"] ? generalMDMSDataById["UsageCategorySubMinor"][floor["usageCategorySubMinor"]].name : "NA";
      }
      // if (usageCategoryMajor === "RESIDENTIAL" && propertySubType === "SHAREDPROPERTY" && dataKey === "floorNo") {
      //   return "NA";
      // }
      if (floor[dataKey] === "NONRESIDENTIAL") {
        return generalMDMSDataById["UsageCategoryMinor"] ? generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name : "NA";
      } else {
        return generalMDMSDataById[masterName] ? generalMDMSDataById[masterName][floor[dataKey]].name : "NA";
      }
    } else {
      return "NA";
    }
  }
};

var getBuildingTypeInfo = exports.getBuildingTypeInfo = function getBuildingTypeInfo(generalMDMSDataById, propertyDetails) {
  if (!generalMDMSDataById) {
    return propertyDetails.propertySubType ? propertyDetails.propertySubType : propertyDetails.propertyType ? (0, _commons2.getLocaleLabels)("PROPERTYTAX_BILLING_SLAB_" + propertyDetails.propertyType, "PROPERTYTAX_BILLING_SLAB_" + propertyDetails.propertyType) : (0, _commons2.getLocaleLabels)('NA', 'NA');
  } else {
    return (0, _commons2.getLocaleLabels)("PROPERTYTAX_BILLING_SLAB_" + (0, _get2.default)(generalMDMSDataById, "PropertySubType." + propertyDetails.propertySubType + ".code", (0, _get2.default)(generalMDMSDataById, "PropertyType." + propertyDetails.propertyType + ".code", "NA")), "PROPERTYTAX_BILLING_SLAB_" + (0, _get2.default)(generalMDMSDataById, "PropertySubType." + propertyDetails.propertySubType + ".code", (0, _get2.default)(generalMDMSDataById, "PropertyType." + propertyDetails.propertyType + ".code", "NA")));
  }
};

var getUsageTypeInfo = exports.getUsageTypeInfo = function getUsageTypeInfo(propertyDetails) {
  return propertyDetails.usageCategoryMajor ? (0, _commons.getTranslatedLabel)('PROPERTYTAX_BILLING_SLAB_' + propertyDetails.usageCategoryMajor, localizationLabelsData) : "NA";
};

var getPlotSizeInfo = exports.getPlotSizeInfo = function getPlotSizeInfo(propertyDetails) {
  return propertyDetails.propertySubType === "SHAREDPROPERTY" ? checkNA(propertyDetails.landArea) : propertyDetails.uom ? propertyDetails.landArea + " " + propertyDetails.uom : Math.round(propertyDetails.landArea * 100) / 100 + " sq yards";
};

var getRainWaterHarvestingInfo = exports.getRainWaterHarvestingInfo = function getRainWaterHarvestingInfo(properties) {
  return (0, _get2.default)(properties, 'additionalDetails.isRainwaterHarvesting', false) ? (0, _commons.getTranslatedLabel)("PT_COMMON_YES", localizationLabelsData) : (0, _commons.getTranslatedLabel)("PT_COMMON_NO", localizationLabelsData);
};

var getaddressPropertyEntryTypeInfo = exports.getaddressPropertyEntryTypeInfo = function getaddressPropertyEntryTypeInfo(properties) {
  return (0, _commons.getTranslatedLabel)((0, _get2.default)(properties, "creationReason", "CREATE"), localizationLabelsData);
};

var getUnitUsageTypeInfo = exports.getUnitUsageTypeInfo = function getUnitUsageTypeInfo(unit, propertyDetails) {
  return unit && unit.usageCategoryMinor ? (0, _commons.getTranslatedLabel)('PROPERTYTAX_BILLING_SLAB_' + unit && unit.usageCategoryMinor, localizationLabelsData) : propertyDetails && propertyDetails.usageCategoryMinor ? (0, _commons.getTranslatedLabel)('PROPERTYTAX_BILLING_SLAB_' + propertyDetails && propertyDetails.usageCategoryMinor, localizationLabelsData) : unit && unit.usageCategoryMajor ? (0, _commons.getTranslatedLabel)('PROPERTYTAX_BILLING_SLAB_' + unit && unit.usageCategoryMajor, localizationLabelsData) : "NA";
};

var getOccupancyInfo = exports.getOccupancyInfo = function getOccupancyInfo(unit) {
  return unit && unit.occupancyType ? (0, _commons.getTranslatedLabel)('PROPERTYTAX_OCCUPANCYTYPE_' + unit && unit.occupancyType, localizationLabelsData) : "NA";
};

var getAssessmentInfo = exports.getAssessmentInfo = function getAssessmentInfo(propertyDetails, generalMDMSDataById, properties, oldPropertydetails, OldProperty) {
  var _ref = propertyDetails || {},
      _ref$units = _ref.units,
      units = _ref$units === undefined ? [] : _ref$units,
      noOfFloors = _ref.noOfFloors;

  return propertyDetails && [{
    key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_USAGE_TYPE", localizationLabelsData),
    value: getUsageTypeInfo(propertyDetails), //noOfFloors
    oldValue: oldPropertydetails && getUsageTypeInfo(oldPropertydetails)
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_TYPE_OF_BUILDING", localizationLabelsData),
    value: getBuildingTypeInfo(generalMDMSDataById, propertyDetails),
    oldValue: oldPropertydetails && getBuildingTypeInfo(generalMDMSDataById, oldPropertydetails)
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_PLOT_SIZE", localizationLabelsData),
    value: getPlotSizeInfo(propertyDetails),
    oldValue: oldPropertydetails && getPlotSizeInfo(oldPropertydetails)
  }, propertyDetails.propertySubType === "SHAREDPROPERTY" ? {
    key: (0, _commons.getTranslatedLabel)("PT_FLOOR_NO", localizationLabelsData),
    value: units && units.length > 0 ? "" + units[0].floorNo : "NA",
    oldValue: oldPropertydetails && oldPropertydetails.units && oldPropertydetails.units.length > 0 ? "" + oldPropertydetails.units[0].floorNo : "NA"
  } : {
    key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_NO_OF_FLOOR", localizationLabelsData),
    value: noOfFloors ? "" + noOfFloors : "NA", //noOfFloors
    oldValue: oldPropertydetails && oldPropertydetails.noOfFloors ? "" + noOfFloors : "NA"
  }, {
    key: (0, _commons.getTranslatedLabel)("PT_COMMONS_IS_RAINWATER_HARVESTING", localizationLabelsData),
    value: getRainWaterHarvestingInfo(properties),
    oldValue: OldProperty && getRainWaterHarvestingInfo(OldProperty)
  }, process.env.REACT_APP_NAME !== "Citizen" ? {
    key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_ENTRY_TYPE", localizationLabelsData),
    value: getaddressPropertyEntryTypeInfo(properties),
    oldValue: OldProperty && getaddressPropertyEntryTypeInfo(OldProperty)
  } : ""];
};

var getUnitInfo = exports.getUnitInfo = function getUnitInfo() {
  var units = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var propertyDetails = arguments[1];
  var oldPropertydetails = arguments[2];

  units = units || [];
  units = units && units.filter(function (unit) {
    return unit && (unit.active || unit.id == undefined);
  });
  var floors = [];
  units.map(function (unit, index) {
    if (unit) {
      var floor = [{
        key: (0, _commons.getTranslatedLabel)("PT_ASSESSMENT_UNIT_USAGE_TYPE", localizationLabelsData),
        value: getUnitUsageTypeInfo(unit, propertyDetails),
        oldValue: oldPropertydetails && oldPropertydetails.units && oldPropertydetails.units[index] && getUnitUsageTypeInfo(oldPropertydetails.units[index], oldPropertydetails) || "NA"
      }, {

        key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_OCCUPLANCY", localizationLabelsData),
        value: getOccupancyInfo(unit),
        oldValue: oldPropertydetails && oldPropertydetails.units && oldPropertydetails.units[index] && getOccupancyInfo(oldPropertydetails.units[index]) || "NA"
      }, {

        key: (0, _commons.getTranslatedLabel)("PT_FORM2_BUILT_AREA", localizationLabelsData),
        value: unit.unitArea ? unit.unitArea + '' : "NA",
        oldValue: oldPropertydetails && oldPropertydetails.units && oldPropertydetails.units[index] && "" + Math.round(oldPropertydetails.units[index].unitArea * 9 * 100) / 100 || "NA"
      }];
      if (unit.occupancyType === "RENTED") {
        floor.push({
          key: (0, _commons.getTranslatedLabel)("PT_FORM2_TOTAL_ANNUAL_RENT", localizationLabelsData),
          value: unit.arv ? unit.arv + '' : "NA",
          oldValue: oldPropertydetails && oldPropertydetails.units && oldPropertydetails.units[index] && oldPropertydetails.units[index].arv + '' || "NA"
        });
      }
      if (!floors[unit['floorNo']]) {
        floors[unit['floorNo']] = [floor];
      } else {
        floors[unit['floorNo']].push(floor);
      }
    }
  });
  return floors;
};

var AssessmentInfo = function AssessmentInfo(_ref2) {
  var properties = _ref2.properties,
      editIcon = _ref2.editIcon,
      generalMDMSDataById = _ref2.generalMDMSDataById,
      OldProperty = _ref2.OldProperty;

  var hideSubsectionLabel = false;
  var assessmentItems = [];
  var subUnitItems = [];
  var oldPropertydetails = '';
  var header = 'PT_ASSESMENT_INFO_SUB_HEADER';
  if (OldProperty && Object.keys(OldProperty).length > 0) {
    oldPropertydetails = OldProperty.propertyDetails[0];
  }
  if (properties) {
    var propertyDetails = properties.propertyDetails;

    if (propertyDetails && propertyDetails.length > 0) {
      subUnitItems = getUnitInfo(propertyDetails[0]['units'], propertyDetails[0], oldPropertydetails);
      assessmentItems = getAssessmentInfo(propertyDetails[0], generalMDMSDataById, properties, oldPropertydetails, OldProperty);
      if (propertyDetails[0].propertySubType === "SHAREDPROPERTY") {
        hideSubsectionLabel = true;
      }
    }
  }

  return _react2.default.createElement(_PropertyInfoCard2.default, { editIcon: editIcon, items: assessmentItems, header: header, subSection: subUnitItems, hideSubsectionLabel: hideSubsectionLabel });
};

exports.default = AssessmentInfo;