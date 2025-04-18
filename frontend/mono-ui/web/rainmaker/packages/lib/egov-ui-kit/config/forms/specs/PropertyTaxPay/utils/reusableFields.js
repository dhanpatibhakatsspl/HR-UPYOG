"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeMaster = exports.getAbsentMasterObj = exports.getPresentMasterObj = exports.prepareDropDownData = exports.pincode = exports.mohalla = exports.street = exports.colony = exports.houseNumber = exports.dummy = exports.city = exports.beforeInitFormForPlot = exports.beforeInitForm = exports.floorName = exports.measuringUnit = exports.annualRent = exports.superArea = exports.builtArea = exports.occupancy = exports.subUsageType = exports.floorCount = exports.plotSize = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _actions = require("egov-ui-kit/redux/common/actions");

var _enableDependentFields = require("./enableDependentFields");

var _removeFloors = require("./removeFloors");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons2 = require("egov-ui-framework/ui-utils/commons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floorDropDownData = [];

for (var i = 1; i <= 25; i++) {
  floorDropDownData.push({ label: i.toString(), value: i });
}

var plotSize = exports.plotSize = {
  plotSize: {
    id: "assessment-plot-size",
    jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
    type: "number",
    floatingLabelText: "PT_FORM2_PLOT_SIZE",
    hintText: "PT_FORM2_PLOT_SIZE_PLACEHOLDER",
    errorMessage: "PT_PLOT_SIZE_ERROR_MESSAGE",
    required: true,
    fullWidth: true,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    numcols: 6,
    formName: "plotDetails",
    updateDependentFields: function updateDependentFields(_ref) {
      var formKey = _ref.formKey,
          field = _ref.field,
          dispatch = _ref.dispatch,
          state = _ref.state;

      var propertyType = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertyType");
      var propertySubType = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertySubType");
      if (propertyType === "VACANT" || propertySubType === "INDEPENDENTPROPERTY") {
        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].landArea", field.value));
        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].buildUpArea", null));
      }
    }
  }
};

var floorCount = exports.floorCount = {
  floorCount: {
    id: "assessment-number-of-floors",
    jsonPath: "Properties[0].propertyDetails[0].noOfFloors",
    type: "AutocompleteDropdown",
    floatingLabelText: "PT_FORM2_NUMBER_OF_FLOORS",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    toolTip: true,
    defaultSort: false,
    fullWidth: true,
    toolTipMessage: "PT_NUMBER_OF_FLOORS_TOOLTIP_MESSAGE",
    required: true,
    numcols: 6,
    gridDefination: {
      xs: 12,
      sm: 6
    },
    dropDownData: floorDropDownData,
    formName: "plotDetails",
    updateDependentFields: function updateDependentFields(_ref2) {
      var formKey = _ref2.formKey,
          field = _ref2.field,
          dispatch = _ref2.dispatch,
          state = _ref2.state;

      // removeFormKey(formKey, field, dispatch, state);
      var previousFloorNo = (0, _localStorageUtils.localStorageGet)("previousFloorNo") || -1;
      (0, _localStorageUtils.localStorageSet)("previousFloorNo", field.value);
      // dispatch(toggleSpinner());
      if (previousFloorNo > field.value) {
        for (var i = field.value; i < previousFloorNo; i++) {
          if (state.form.hasOwnProperty("customSelect_" + i)) {
            dispatch((0, _actions2.removeForm)("customSelect_" + i));
          }
          for (var variable in state.form) {
            if (state.form.hasOwnProperty(variable) && variable.startsWith("floorDetails_" + i)) {
              dispatch((0, _actions2.removeForm)(variable));
            }
          }
          var units = (0, _get2.default)(state, 'form.prepareFormData.Properties[0].propertyDetails[0].units', []);
          units = units && units.filter(function (unit) {
            return unit && unit.floorNo && unit.floorNo != "undefined" && unit.floorNo != i;
          });
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units", units));
        }
      }
    }
  }
};

var subUsageType = exports.subUsageType = {
  subUsageType: {
    id: "assessment-subUsageType",
    jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryDetail",
    type: "AutocompleteDropdown",
    localePrefix: "PROPERTYTAX_BILLING_SLAB",
    floatingLabelText: "PT_FORM2_SUB_USAGE_TYPE",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    dropDownData: [],
    required: true,
    numcols: 4,
    gridDefination: {
      xs: 12,
      sm: 4
    },
    formName: "plotDetails",
    updateDependentFields: function updateDependentFields(_ref3) {
      var formKey = _ref3.formKey,
          field = _ref3.field,
          dispatch = _ref3.dispatch,
          state = _ref3.state;

      var subUsageMinor = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryDetail[" + field.value + "]");
      if (!(0, _isEmpty2.default)(subUsageMinor)) {
        dispatch((0, _actions.prepareFormData)(field.jsonPath.split("usageCategoryDetail")[0] + "usageCategorySubMinor", subUsageMinor.usageCategorySubMinor));
      } else {
        dispatch((0, _actions.prepareFormData)(field.jsonPath.split("usageCategoryDetail")[0] + "usageCategorySubMinor", field.value));
        dispatch((0, _actions.prepareFormData)(field.jsonPath, null));
      }
    }
  }
};

var occupancy = exports.occupancy = {
  occupancy: {
    id: "assessment-occupancy",
    jsonPath: "Properties[0].propertyDetails[0].units[0].occupancyType",
    type: "AutocompleteDropdown",
    localePrefix: { moduleName: "PropertyTax", masterName: "OccupancyType" },
    floatingLabelText: "PT_FORM2_OCCUPANCY",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    required: true,
    numcols: 4,
    gridDefination: {
      xs: 12,
      sm: 4
    },
    dropDownData: [],
    formName: "plotDetails",
    updateDependentFields: function updateDependentFields(_ref4) {
      var formKey = _ref4.formKey,
          sourceField = _ref4.field,
          dispatch = _ref4.dispatch;
      var value = sourceField.value;

      var dependentFields1 = ["annualRent"];
      switch (value) {
        case "RENTED":
          (0, _enableDependentFields.setDependentFields)(dependentFields1, dispatch, formKey, false);
          break;
        default:
          (0, _enableDependentFields.setDependentFields)(dependentFields1, dispatch, formKey, true);
          break;
      }
    }
  }
};

var builtArea = exports.builtArea = {
  builtArea: {
    id: "assessment-built-area",
    jsonPath: "Properties[0].propertyDetails[0].units[0].unitArea",
    type: "number",
    floatingLabelText: "PT_FORM2_BUILT_AREA",
    hintText: "PT_FORM2_BUILT_UP_AREA_PLACEHOLDER",
    errorMessage: "PT_BUILT_AREA_ERROR_MESSAGE",
    toolTip: true,
    toolTipMessage: "PT_BUILT_UP_AREA_TOOLTIP_MESSAGE",
    required: true,
    hideField: false,
    numcols: 4,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    formName: "plotDetails"
  }
};

var superArea = exports.superArea = {
  superArea: {
    id: "assessment-super-area",
    jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
    type: "number",
    floatingLabelText: "PT_FORM2_TOTAL_BUILT_AREA",
    hintText: "PT_FORM2_TOTAL_BUILT_AREA_PLACEHOLDER",
    ErrorText: "Enter a valid super area size",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    toolTip: true,
    toolTipMessage: "Total Carpet Area + Total balcony area + Total thickness of outer walls + Total common area (lift, stairs, lobby etc.)",
    required: true,
    numcols: 4,
    hideField: false,
    updateDependentFields: function updateDependentFields(_ref5) {
      var formKey = _ref5.formKey,
          field = _ref5.field,
          dispatch = _ref5.dispatch,
          state = _ref5.state;

      dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units[0].unitArea", field.value));
    },
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    errorMessage: "PT_SUPER_AREA_ERROR_MESSAGE",
    formName: "plotDetails"
  }
};

var annualRent = exports.annualRent = {
  annualRent: {
    id: "assessment-annual-rent",
    jsonPath: "Properties[0].propertyDetails[0].units[0].arv",
    type: "number",
    floatingLabelText: "PT_FORM2_TOTAL_ANNUAL_RENT",
    hintText: "PT_FORM2_TOTAL_ANNUAL_RENT_PLACEHOLDER",
    ErrorText: "Enter a valid amount",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    toolTip: true,
    toolTipMessage: "PT_TOTAL_ANNUAL_RENT_TOOLTIP_MESSAGE",
    required: true,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    hideField: true,
    numcols: 4,
    formName: "plotDetails"
  }
};

var measuringUnit = exports.measuringUnit = {};

var floorName = exports.floorName = {
  floorName: {
    id: "floorName",
    type: "AutocompleteDropdown",
    floatingLabelText: "PT_FORM2_SELECT_FLOOR",
    localePrefix: { moduleName: "PropertyTax", masterName: "Floor" },
    hintText: "PT_FORM2_SELECT_FLOOR",
    numcols: 4,
    gridDefination: {
      xs: 12,
      sm: 4
    },
    defaultSort: false,
    errorMessage: "",
    required: true,
    jsonPath: "Properties[0].propertyDetails[0].units[0].floorNo",
    hideField: true,
    formName: "plotDetails"
  }
};

var beforeInitForm = exports.beforeInitForm = {
  beforeInitForm: function beforeInitForm(action, store) {
    var state = store.getState();
    var dispatch = store.dispatch;
    var form = action.form;
    var formKey = form.name,
        fields = form.fields;

    var propertyType = (0, _get2.default)(state, "form.basicInformation.fields.typeOfBuilding.value");

    var _ref6 = state.common && state.common.generalMDMSDataById,
        Floor = _ref6.Floor;

    if ((0, _get2.default)(action, "form.fields.floorName")) {
      if (propertyType === "SHAREDPROPERTY") {
        var floorData = prepareDropDownData(Floor);
        floorData && floorData.length > 0 && floorData.forEach(function (data) {
          data.label = (0, _commons2.getLocaleLabels)("PROPERTYTAX_FLOOR_" + data.value, "PROPERTYTAX_FLOOR_" + data.value);
        });
        (0, _set2.default)(action, "form.fields.floorName.hideField", false);
        (0, _set2.default)(action, "form.fields.floorName.dropDownData", floorData);
      } else {
        (0, _set2.default)(action, "form.fields.floorName.hideField", true);
      }
    }

    //For adding multiple units to prepareFormData
    if (formKey.startsWith("floorDetails_")) {
      var arr = formKey.split("_");
      var floorIndex = parseInt(arr[1]);
      var unitIndex = parseInt(arr[3]);
      var property = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0]");
      var unitsCount = null;
      var localizationLabels = state.app.localizationLabels;

      if (state.form[formKey]) {
        unitsCount = state.form[formKey].unitsIndex;
      } else {
        unitsCount = property && property.units && property.units.length;
        form.unitsIndex = unitsCount;
      }
      // Adding formName prop to each field item to display required Error message.
      var fieldsArray = Object.keys(form.fields);
      if (fieldsArray && fieldsArray.length > 0) {
        fieldsArray.map(function (key) {
          form.fields[key].formName = form.name;
        });
      }
      if (floorIndex === 0 && unitIndex === 0) {
        form.unitsIndex = 0;
        propertyType !== "SHAREDPROPERTY" && dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units[0].floorNo", "0"));
      } else {
        var updatedFields = Object.keys(fields).reduce(function (updatedFields, fieldKey) {
          var jsonPath = fields[fieldKey].jsonPath;
          updatedFields[fieldKey] = (0, _extends3.default)({}, fields[fieldKey], { unitsIndex: unitsCount });
          if (jsonPath.indexOf("units[") > -1) {
            var first = jsonPath.split("units[")[0];
            var last = jsonPath.split("units[")[1].split("]")[1];
            updatedFields[fieldKey].jsonPath = first + "units[" + unitsCount + "]" + last;
          }
          return updatedFields;
        }, {});
        (0, _set2.default)(action, "form.fields", (0, _extends3.default)({}, updatedFields));
        if (!state.form[formKey]) {
          var customSelectObj = state.form["customSelect_" + floorIndex];
          var floorNo = customSelectObj.fields && customSelectObj.fields.floorName && customSelectObj.fields.floorName.value;
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units[" + unitsCount + "].floorNo", "" + floorNo));
        }
      }
      var _usageCategoryMajor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor");
      if (_usageCategoryMajor !== "MIXED") {
        var usageTypeValue = (0, _get2.default)(form, "fields.usageType.value");
        (0, _set2.default)(action, "form.fields.usageType.value", (0, _commons.getTranslatedLabel)(usageTypeValue, localizationLabels));
        dispatch((0, _actions2.setFieldProperty)(formKey, "usageType", "value", (0, _commons.getTranslatedLabel)(usageTypeValue, localizationLabels)));
      }
    }

    var occupancy = (0, _get2.default)(state, "common.generalMDMSDataById.OccupancyType");
    var usageCategoryMinor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
    var usageCategoryMajor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor");
    (0, _set2.default)(action, "form.fields.subUsageType.hideField", false);

    var unitFormUpdate = function unitFormUpdate(usageCategoryMinor) {
      var skipMajorUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var filteredSubUsageMinor = (0, _filter2.default)(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true), function (subUsageMinor) {
        return subUsageMinor.usageCategoryMinor === (0, _get2.default)(state, usageCategoryMinor);
      });
      if (filteredSubUsageMinor.length > 0) {
        var filteredUsageCategoryDetails = getPresentMasterObj(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryDetail"), true), filteredSubUsageMinor, "usageCategorySubMinor");
        var mergedMaster = mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor");
        var subUsageData = (0, _PTCommon.sortDropdown)(mergedMaster, "label", true);
        subUsageData.forEach(function (data) {
          data.label = (0, _commons2.getLocaleLabels)("PT_" + data.value, "PROPERTYTAX_BILLING_SLAB_" + data.value);
        });
        (0, _set2.default)(action, "form.fields.subUsageType.dropDownData", subUsageData);
        if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath") && skipMajorUpdate) {
          dispatch((0, _actions.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor")));
        }
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", false);
      } else {
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
      }
    };

    if (usageCategoryMinor && usageCategoryMajor !== "MIXED") {
      unitFormUpdate("common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
    } else {
      if (usageCategoryMajor === "MIXED") {
        var masterOne = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMajor");
        var masterTwo = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMinor");
        var usageTypes = mergeMaster(masterOne, masterTwo, "usageCategoryMajor");
        var filterArrayWithoutMixed = (0, _filter2.default)(usageTypes, function (item) {
          return item.value !== "MIXED";
        });
        (0, _set2.default)(action, "form.fields.usageType.disabled", false);
        var usageTypeData = (0, _PTCommon.sortDropdown)(filterArrayWithoutMixed, "label", true);
        usageTypeData.forEach(function (data) {
          data.label = (0, _commons2.getLocaleLabels)("PT_" + data.value, "PROPERTYTAX_BILLING_SLAB_" + data.value);
        });
        (0, _set2.default)(action, "form.fields.usageType.dropDownData", usageTypeData);
        unitFormUpdate("common.prepareFormData." + action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", false);
      } else {
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
      }
    }
    var occupancyPrepareData = prepareDropDownData(occupancy);
    occupancyPrepareData && occupancyPrepareData.length > 0 && occupancyPrepareData.forEach(function (data) {
      data.label = (0, _commons2.getLocaleLabels)("PROPERTYTAX_OCCUPANCYTYPE_" + data.value, "PROPERTYTAX_OCCUPANCYTYPE_" + data.value);
    });
    (0, _set2.default)(action, "form.fields.occupancy.dropDownData", occupancyPrepareData);
    if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath") && usageCategoryMajor !== "MIXED") {
      dispatch((0, _actions.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMajor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor")));
    }
    if ((0, _get2.default)(state, "common.prepareFormData." + (0, _get2.default)(action, "form.fields.occupancy.jsonPath")) === "RENTED") {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", false);
    } else {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", true);
    }
    return action;
  }
};

var beforeInitFormForPlot = exports.beforeInitFormForPlot = {
  beforeInitForm: function beforeInitForm(action, store) {
    var state = store.getState();
    var dispatch = store.dispatch;

    var propertyType = (0, _get2.default)(state, "form.basicInformation.fields.typeOfBuilding.value");

    var _ref7 = state.common && state.common.generalMDMSDataById,
        Floor = _ref7.Floor;

    if ((0, _get2.default)(action, "form.fields.floorName")) {
      if (propertyType === "SHAREDPROPERTY") {
        var floorData = prepareDropDownData(Floor);
        floorData && floorData.length > 0 && floorData.forEach(function (data) {
          data.label = (0, _commons2.getLocaleLabels)("PROPERTYTAX_FLOOR_" + data.value, "PROPERTYTAX_FLOOR_" + data.value);
        });
        (0, _set2.default)(action, "form.fields.floorName.hideField", false);
        (0, _set2.default)(action, "form.fields.floorName.dropDownData", floorData);
      } else {
        (0, _set2.default)(action, "form.fields.floorName.hideField", true);
      }
    }
    if (propertyType != "VACANT") {
      var occupancy = (0, _get2.default)(state, "common.generalMDMSDataById.OccupancyType");
      var usageCategoryMinor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
      var usageCategoryMajor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor");
      (0, _set2.default)(action, "form.fields.subUsageType.hideField", false);

      if (usageCategoryMinor && usageCategoryMajor !== "MIXED") {
        var filteredSubUsageMinor = (0, _filter2.default)(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true), function (subUsageMinor) {
          return subUsageMinor.usageCategoryMinor === (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
        });
        if (filteredSubUsageMinor.length > 0) {
          var filteredUsageCategoryDetails = getPresentMasterObj(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryDetail"), true), filteredSubUsageMinor, "usageCategorySubMinor");
          var mergedMaster = mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor");
          var subUsageData = (0, _PTCommon.sortDropdown)(mergedMaster, "label", true);
          subUsageData.forEach(function (data) {
            data.label = (0, _commons2.getLocaleLabels)("PT_" + data.value, "PROPERTYTAX_BILLING_SLAB_" + data.value);
          });
          (0, _set2.default)(action, "form.fields.subUsageType.dropDownData", subUsageData);
          // set(
          //   action,
          //   "form.fields.subUsageType.value",
          //   null)
          // );
          if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath")) {
            dispatch((0, _actions.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor")));
          }
        } else {
          (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
        }
      } else {
        if (usageCategoryMajor === "MIXED") {
          var masterOne = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMajor");
          var masterTwo = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMinor");
          var usageTypes = mergeMaster(masterOne, masterTwo, "usageCategoryMajor");
          var filterArrayWithoutMixed = (0, _filter2.default)(usageTypes, function (item) {
            return item.value !== "MIXED";
          });
          (0, _set2.default)(action, "form.fields.usageType.disabled", false);
          var usageTypeData = (0, _PTCommon.sortDropdown)(filterArrayWithoutMixed, "label", true);
          usageTypeData.forEach(function (data) {
            data.label = (0, _commons2.getLocaleLabels)("PT_" + data.value, "PROPERTYTAX_BILLING_SLAB_" + data.value);
          });
          (0, _set2.default)(action, "form.fields.usageType.dropDownData", usageTypeData);
        }
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
      }
      var occupancyPrepareData = prepareDropDownData(occupancy);
      occupancyPrepareData && occupancyPrepareData.length > 0 && occupancyPrepareData.forEach(function (data) {
        data.label = (0, _commons2.getLocaleLabels)("PROPERTYTAX_OCCUPANCYTYPE_" + data.value, "PROPERTYTAX_OCCUPANCYTYPE_" + data.value);
      });
      (0, _set2.default)(action, "form.fields.occupancy.dropDownData", occupancyPrepareData);
      if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath") && usageCategoryMajor !== "MIXED") {
        dispatch((0, _actions.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMajor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor")));
      }
    }
    if (propertyType == "VACANT") {
      dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].noOfFloors", 1));
    }
    if (propertyType == "SHAREDPROPERTY") {
      dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].noOfFloors", 1));
      // dispatch(prepareFormData(`Properties[0].propertyDetails[0].units[0].floorNo`, -1));
    }
    if ((0, _get2.default)(state, "common.prepareFormData." + (0, _get2.default)(action, "form.fields.occupancy.jsonPath")) === "RENTED") {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", false);
    } else {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", true);
    }
    return action;
  }
};

var city = exports.city = {
  city: {
    id: "city",
    jsonPath: "Properties[0].address.city",
    required: true,
    localePrefix: { moduleName: "tenant", masterName: "tenants" },
    type: "AutocompleteDropdown",
    floatingLabelText: "CORE_COMMON_CITY",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    fullWidth: true,
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    numcols: 6,
    gridDefination: {
      xs: 12,
      sm: 6
    },
    dataFetchConfig: {
      dependants: [{
        fieldKey: "mohalla"
      }]
    },
    updateDependentFields: function updateDependentFields(_ref8) {
      var formKey = _ref8.formKey,
          field = _ref8.field,
          dispatch = _ref8.dispatch,
          state = _ref8.state;

      dispatch((0, _actions.prepareFormData)("Properties[0].tenantId", field.value));
      dispatch((0, _actions.prepareFormData)("Properties[0].address.city", (0, _filter2.default)((0, _get2.default)(state, "common.cities"), function (city) {
        return city.code === field.value;
      })[0].name));
      dispatch((0, _actions2.setFieldProperty)("propertyAddress", "mohalla", "value", ""));
      var moduleValue = field.value;
      dispatch(fetchLocalizationLabel(getLocale(), moduleValue, moduleValue));
      var requestBody = (0, _commons.generalMDMSDataRequestObj)(field.value);

      dispatch((0, _actions.fetchGeneralMDMSData)(requestBody, "PropertyTax", (0, _commons.getGeneralMDMSDataDropdownName)()));
    }
  }
};

var dummy = exports.dummy = {
  dummy: {
    numcols: 6,
    type: "dummy"
  }
};

var houseNumber = exports.houseNumber = {
  houseNumber: {
    id: "house-number",
    jsonPath: "Properties[0].address.doorNo",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_DOOR_NUMBER",
    hintText: "PT_PROPERTY_DETAILS_DOOR_NUMBER_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_DOOR_NUMBER_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64
  }
};

var colony = exports.colony = {
  colony: {
    id: "property-colony",
    jsonPath: "Properties[0].address.buildingName",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME",
    hintText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64
  }
};

var street = exports.street = {
  street: {
    id: "property-street",
    jsonPath: "Properties[0].address.street",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_STREET_NAME",
    hintText: "PT_PROPERTY_DETAILS_STREET_NAME_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64
  }
};

var mohalla = exports.mohalla = {
  mohalla: {
    id: "mohalla",
    jsonPath: "Properties[0].address.locality.code",
    type: "AutocompleteDropdown",
    floatingLabelText: "PT_PROPERTY_DETAILS_MOHALLA",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    fullWidth: true,
    toolTip: true,
    localePrefix: true,
    toolTipMessage: "PT_MOHALLA_TOOLTIP_MESSAGE",
    labelsFromLocalisation: true,
    //toolTipMessage: "Name of the area in which your property is located",
    boundary: true,
    numcols: 6,
    gridDefination: {
      xs: 12,
      sm: 6
    },
    errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
    dataFetchConfig: {
      url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
      action: "",
      queryParams: [],
      requestBody: {},
      isDependent: true,
      hierarchyType: "REVENUE"
    },
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    required: true,
    formName: "propertyAddress",
    updateDependentFields: function updateDependentFields(_ref9) {
      var formKey = _ref9.formKey,
          field = _ref9.field,
          dispatch = _ref9.dispatch;

      if (field.value && field.value.length > 0) {
        var _mohalla = field.dropDownData.find(function (option) {
          return option.value === field.value;
        });
        dispatch((0, _actions.prepareFormData)("Properties[0].address.locality.area", _mohalla.area));
      }
    }
  }
};

var pincode = exports.pincode = {
  pincode: {
    id: "pincode",
    type: "number",
    jsonPath: "Properties[0].address.pincode",
    floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
    hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
    numcols: 6,
    //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
    errorMessage: "PT_PINCODE_ERROR_MESSAGE",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    pattern: "^([0-9]){6}$"
  }
};

var prepareDropDownData = exports.prepareDropDownData = function prepareDropDownData(master) {
  var withOriginal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var dropDownData = [];
  for (var variable in master) {
    if (master.hasOwnProperty(variable)) {
      if (withOriginal) {
        dropDownData.push(master[variable]);
      } else {
        dropDownData.push({ label: master[variable].name, value: master[variable].code });
      }
    }
  }
  return dropDownData;
};

var getPresentMasterObj = exports.getPresentMasterObj = function getPresentMasterObj(master1Arr, master2Arr, propToCompare) {
  var propArray = master2Arr.reduce(function (result, item) {
    if (item["code"] && result.indexOf(item["code"]) === -1) {
      result.push(item["code"]);
    }
    return result;
  }, []);
  return master1Arr.filter(function (item) {
    return propArray.indexOf(item[propToCompare]) !== -1;
  });
};

var getAbsentMasterObj = exports.getAbsentMasterObj = function getAbsentMasterObj(master1Arr, master2Arr, propToCompare) {
  var propArray = master2Arr.reduce(function (result, item) {
    if (item[propToCompare] && result.indexOf(item[propToCompare]) === -1) {
      result.push(item[propToCompare]);
    }
    return result;
  }, []);
  return master1Arr.filter(function (item) {
    return propArray.indexOf(item.code) === -1;
  });
};

var mergeMaster = exports.mergeMaster = function mergeMaster(masterOne, masterTwo) {
  var parentName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  var dropDownData = [];
  var parentList = [];
  for (var variable in masterTwo) {
    if (masterTwo.hasOwnProperty(variable)) {
      dropDownData.push({ label: masterTwo[variable].name, value: masterTwo[variable].code });
    }
  }
  var masterOneData = getAbsentMasterObj(prepareDropDownData(masterOne, true), prepareDropDownData(masterTwo, true), parentName);
  for (var i = 0; i < masterOneData.length; i++) {
    dropDownData.push({ label: masterOneData[i].name, value: masterOneData[i].code });
  }
  return dropDownData;
};