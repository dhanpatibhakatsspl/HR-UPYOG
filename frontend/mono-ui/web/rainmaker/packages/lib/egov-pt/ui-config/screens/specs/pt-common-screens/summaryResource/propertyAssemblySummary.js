"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyAssemblySummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var propertyAssemblySummary = exports.propertyAssemblySummary = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Property Assembly Details",
        labelKey: "PT_COMMON_PROPERTY_ASSEMBLY_DETAILS"
      }))
    }
  },
  propertyAssemblyHeader: getHeader({
    labelName: "Property Assembly Details",
    labelKey: "PT_COMMON_PROPERTY_ASSEMBLY_DETAILS"
  }),
  break1: (0, _utils.getBreak)(),
  propertyAssemblyContainer: (0, _utils.getCommonContainer)({
    propertyType: (0, _utils.getLabelWithValue)({
      labelName: "Property Type",
      labelKey: "PT_COMMON_PROPERTY_TYPE"
    }, {
      localePrefix: {
        moduleName: "COMMON",
        masterName: "PROPTYPE"
      },
      jsonPath: "Property.propertyType",
      callBack: _utils2.checkValueForNA
    }),
    totalLandArea: (0, _utils.getLabelWithValue)({
      labelName: "Total Land Area",
      labelKey: "PT_COMMON_TOTAL_LAND_AREA"
    }, {
      jsonPath: "Property.landArea",
      callBack: _utils2.checkValueForNA
    }),
    totalConstructedArea: (0, _utils.getLabelWithValue)({
      labelName: "Total Constructed Area",
      labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA"
    }, {
      jsonPath: "Property.superBuiltUpArea",
      callBack: _utils2.checkValueForNA
    }),
    usageType: (0, _utils.getLabelWithValue)({
      labelName: "Usage Type",
      labelKey: "PT_COMMON_USAGE_TYPE"
    }, {
      localePrefix: {
        moduleName: "COMMON",
        masterName: "PROPUSGTYPE"
      },
      jsonPath: "Property.usageCategory",
      callBack: _utils2.checkValueForNA
    }),
    subUsageType: (0, _utils.getLabelWithValue)({
      labelName: "Sub Usage Type",
      labelKey: "PT_COMMON_SUB_USAGE_TYPE"
    }, {
      localePrefix: {
        moduleName: "COMMON",
        masterName: "PROPSUBUSGTYPE"
      },
      jsonPath: "Property.additionalDetails.subUsageCategory",
      // callBack: checkValueForNA
      callBack: function callBack(value) {
        var state = _store2.default.getState();
        var finalValue = void 0;
        var propertyType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.propertyType");
        var usageType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.usageCategory");
        if (propertyType === "BUILTUP.SHAREDPROPERTY" || propertyType === "BUILTUP.INDEPENDENTPROPERTY") {
          if (usageType === "NONRESIDENTIAL.COMMERCIAL" || usageType === "NONRESIDENTIAL.INDUSTRIAL" || usageType === "NONRESIDENTIAL.INSTITUTIONAL") {
            finalValue = value;
          }
        }
        return finalValue ? finalValue : "NA";
      }
    })
  })
});