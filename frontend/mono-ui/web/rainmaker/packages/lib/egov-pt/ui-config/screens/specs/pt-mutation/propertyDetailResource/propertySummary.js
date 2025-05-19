"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertySummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = function test(value) {
  value = value ? value.split(".")[0] : "";
  return value;
};

var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-firenoc",
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

var propertyDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "noc-summary",
    scheama: (0, _utils.getCommonGrayCard)({
      propertyContainer: (0, _utils.getCommonContainer)({
        propertyType: (0, _utils.getLabelWithValue)({
          labelName: "Property Type",
          labelKey: "NOC_PROPERTY_TYPE_LABEL"
        }, {
          jsonPath: "FireNOCs[0].fireNOCDetails.noOfBuildings"
        }),
        buildingName: (0, _utils.getLabelWithValue)({
          labelName: "Name Of Building",
          labelKey: "NOC_NAME_OF_BUILDING_LABEL"
        }, {
          jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].name"
        }),
        buildingUsageType: (0, _utils.getLabelWithValue)({
          labelName: "Building Usage Type",
          labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL"
        }, {
          jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageType",
          callBack: test,
          localePrefix: {
            moduleName: "firenoc",
            masterName: "BuildingType"
          }
        }),
        buildingUsageSubType: (0, _utils.getLabelWithValue)({
          labelName: "Building Usage Subtype",
          labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL"
        }, {
          jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageType",
          localePrefix: {
            moduleName: "firenoc",
            masterName: "BuildingType"
          }
        })
      })
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "FireNOCs[0].fireNOCDetails.buildings",
    prefixSourceJsonPath: "children.cardContent.children.propertyContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

var propertyLocationDetails = (0, _utils.getCommonGrayCard)({
  propertyLocationContainer: (0, _utils.getCommonContainer)({
    city: (0, _utils.getLabelWithValue)({
      labelName: "City",
      labelKey: "NOC_PROPERTY_CITY_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
      localePrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      }
    }),
    doorHouseNo: (0, _utils.getLabelWithValue)({
      labelName: "Door/House No.",
      labelKey: "NOC_SUMMARY_PROPERTY__LOCATION_DOOR_HOUSE_NO_LABEL"
    }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo" }),
    buildingCompanyName: (0, _utils.getLabelWithValue)({
      labelName: "Building/Company Name",
      labelKey: "NOC_PROPERTY_DETAILS_BLDG_NAME_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.buildingName"
    }),
    streetName: (0, _utils.getLabelWithValue)({
      labelName: "Street Name",
      labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_LABEL"
    }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.street" }),
    mohalla: (0, _utils.getLabelWithValue)({
      labelName: "Mohalla",
      labelKey: "NOC_PROPERTY_DETAILS_MOHALLA_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code",
      callBack: function callBack(value) {
        return (0, _commons.getTransformedLocale)(tenantId) + "_REVENUE_" + value;
      }
    }),
    pincode: (0, _utils.getLabelWithValue)({
      labelName: "Pincode",
      labelKey: "NOC_PROPERTY_DETAILS_PIN_LABEL"
    }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.pincode" }),
    oldPropertyId: (0, _utils.getLabelWithValue)({
      labelName: "Existing Property ID",
      labelKey: "PT_PROPERTY_ADDRESS_EXISTING_PID"
    }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.pincode" })

  })
});

var propertySummary = exports.propertySummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Property Details",
        labelKey: "NOC_COMMON_PROPERTY_DETAILS"
      }))
    }
  },
  cardOne: propertyLocationDetails
});