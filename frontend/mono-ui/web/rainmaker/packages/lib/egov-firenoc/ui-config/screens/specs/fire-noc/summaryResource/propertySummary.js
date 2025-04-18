"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertySummary = exports.propertyLocationSummaryDetail = exports.propertySummaryDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = function test(value) {
  value = value ? value.split(".")[0] : "NA";
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
var propertySummaryDetails = exports.propertySummaryDetails = {
  propertyType: (0, _utils.getLabelWithValue)({
    labelName: "Property Type",
    labelKey: "NOC_PROPERTY_TYPE_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.noOfBuildings",
    callBack: _index.checkValueForNA
  }),
  buildingName: (0, _utils.getLabelWithValue)({
    labelName: "Name Of Building",
    labelKey: "NOC_NAME_OF_BUILDING_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].name",
    callBack: _index.checkValueForNA
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
    callBack: _index.checkValueForNA,
    localePrefix: {
      moduleName: "firenoc",
      masterName: "BuildingType"
    }
  })
};
var propertyDetails = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "noc-summary",
    scheama: (0, _utils.getCommonGrayCard)({
      propertyContainer: (0, _utils.getCommonContainer)(propertySummaryDetails)
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
var propertyLocationSummaryDetail = exports.propertyLocationSummaryDetail = {
  propertyId: (0, _utils.getLabelWithValue)({
    labelName: "Property ID",
    labelKey: "NOC_PROPERTY_ID_LABEL"
  }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.propertyId", callBack: _index.checkValueForNA }),
  city: (0, _utils.getLabelWithValue)({
    labelName: "City",
    labelKey: "NOC_PROPERTY_CITY_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
    callBack: _index.checkValueForNA,
    localePrefix: {
      moduleName: "TENANT",
      masterName: "TENANTS"
    }
  }),
  doorHouseNo: (0, _utils.getLabelWithValue)({
    labelName: "Door/House No.",
    labelKey: "NOC_SUMMARY_PROPERTY__LOCATION_DOOR_HOUSE_NO_LABEL"
  }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo", callBack: _index.checkValueForNA }),
  buildingCompanyName: (0, _utils.getLabelWithValue)({
    labelName: "Building/Company Name",
    labelKey: "NOC_PROPERTY_DETAILS_BLDG_NAME_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.buildingName", callBack: _index.checkValueForNA
  }),
  streetName: (0, _utils.getLabelWithValue)({
    labelName: "Street Name",
    labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_LABEL"
  }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.street", callBack: _index.checkValueForNA }),
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
  }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.pincode", callBack: _index.checkValueForNA }),
  locationOnMap: (0, _utils.getLabelWithValue)({
    labelName: "Location On Map",
    labelKey: "NOC_PROPERTY_DETAILS_GIS_CORD_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.latitude",
    callBack: _index.checkValueForNA
  }),
  applicableFireStation: (0, _utils.getLabelWithValue)({
    labelName: "Applicable Fire Station",
    labelKey: "NOC_PROPERTY_DETAILS_FIRESTATION_LABEL"
  }, {
    jsonPath: "FireNOCs[0].fireNOCDetails.firestationId",
    callBack: _index.checkValueForNA,
    localePrefix: {
      moduleName: "firenoc",
      masterName: "FireStations"
    }
  })
};
var propertyLocationDetails = (0, _utils.getCommonGrayCard)({
  propertyLocationContainer: (0, _utils.getCommonContainer)(propertyLocationSummaryDetail)
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
      })),
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: (0, _utils.getLabel)({
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _index.gotoApplyWithStep)(state, dispatch, 1);
          }
        }
      }
    }
  },
  propertyDetailsHeader: getHeader((0, _commons.getLocaleLabels)("PROPERTY_DETAILS_HEADER", 'PROPERTY_DETAILS_HEADER')),
  break: (0, _utils.getBreak)(),
  cardOne: propertyDetails,
  propertyLocationDetailsHeader: getHeader((0, _commons.getLocaleLabels)("NOC_PROPERTY_LOCATION_DETAILS_HEADER", "NOC_PROPERTY_LOCATION_DETAILS_HEADER")),
  cardTwo: propertyLocationDetails
});