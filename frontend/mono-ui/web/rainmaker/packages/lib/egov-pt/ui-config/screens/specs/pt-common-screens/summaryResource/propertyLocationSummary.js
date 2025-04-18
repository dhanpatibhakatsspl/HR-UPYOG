"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyLocationSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

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

var propertyLocationSummary = exports.propertyLocationSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Mutation Details",
        labelKey: "PT_COMMON_PROPERTY_LOCATION_DETAILS"
      }))
    }
  },
  propertyLocationHeader: getHeader({
    labelName: "Mutation Details",
    labelKey: "PT_COMMON_PROPERTY_LOCATION_DETAILS"
  }),
  break1: (0, _utils.getBreak)(),
  propertyLocationContainer: (0, _utils.getCommonContainer)({
    city: (0, _utils.getLabelWithValue)({
      labelName: "City",
      labelKey: "PT_COMMON_CITY"
    }, {
      jsonPath: "Property.address.city"
    }),
    localityOrMohalla: (0, _utils.getLabelWithValue)({
      labelName: "Locality/Mohalla",
      labelKey: "PT_COMMON_LOCALITY_OR_MOHALLA"
    }, {
      localePrefix: {
        moduleName: (0, _commons.getQueryArg)(window.location.href, "tenantId") ? (0, _commons.getQueryArg)(window.location.href, "tenantId").replace('.', '_').toUpperCase() : "",
        masterName: "REVENUE"
      },
      jsonPath: "Property.address.locality.code"
    }),
    doorNo: (0, _utils.getLabelWithValue)({
      labelName: "Door No",
      labelKey: "PT_COMMON_DOOR_NO_LABEL"
    }, {
      jsonPath: "Property.address.doorNo"
    }),
    buildingOrColonyName: (0, _utils.getLabelWithValue)({
      labelName: "COlony Name",
      labelKey: "PT_COMMON_BUILDING_COLONY_LABEL"
    }, {
      jsonPath: "Property.address.buildingName"
    })
  })
});