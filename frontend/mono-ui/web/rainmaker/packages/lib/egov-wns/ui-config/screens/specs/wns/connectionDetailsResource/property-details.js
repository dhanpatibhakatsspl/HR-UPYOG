"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("../viewBillResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
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

var properyDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PROP_DETAIL_HEADER"
});
var propertyLocationDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PROP_LOC_DETAIL_HEADER"
});

var propertyDetails = (0, _utils.getCommonContainer)({
  propertyType: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROPERTY_TYPE_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.propertyType",
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPTYPE"
    }
  }),
  propertyUsageType: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROPERTY_USAGE_TYPE_LABEL"
  }, { jsonPath: "WaterConnection[0].property.usageCategory",
    localePrefix: {
      moduleName: "WS",
      masterName: "PROPUSGTYPE"
    }
  }),
  plotSize: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_PLOT_SIZE_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.landArea"
  })
});

// const locationOnMap = WaterConnection[0].property.address.locality.code + WaterConnection[0].property.address.locality.code

var propertyLocationDetails = (0, _utils.getCommonContainer)({
  propertyId: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROPERTY_ID_LABEL"
  }, { jsonPath: "WaterConnection[0].property.propertyId" }),
  city: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_CITY"
  }, {
    jsonPath: "WaterConnection[0].property.address.city"
  }),
  plotOrHouseOrSurveyNo: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_PH_SURVEYNO_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.address.doorNo"
  }),
  buildingOrColonyName: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_BUILD_NAME_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.address.buildingName"
  }),
  streetName: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_STREET_NAME"
  }, {
    jsonPath: "WaterConnection[0].property.address.street"
  }),
  locality: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_LOCALITY_LABEL"
  }, {
    jsonPath: "WaterConnection[0].property.address.locality.name"
  }),
  pincode: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_PINCODE"
  }, { jsonPath: "WaterConnection[0].property.address.pincode" }),
  locationOnMap: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_MAP_LOC"
  }, {
    jsonPath: "WaterConnection[0].property.address.locality.locationOnMap"
  })
});

var getPropertyDetails = exports.getPropertyDetails = function getPropertyDetails() {
  var isEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)({
          labelKey: "WS_COMMON_PROP_DETAIL_HEADER"
        })),
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
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
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _footer.changeStep)(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    // viewOne: propertyDetails,
    // viewTwo: propertyLocationDetails

    viewOne: properyDetailsHeader,
    viewTwo: propertyDetails,
    viewThree: propertyLocationDetailsHeader,
    viewFour: propertyLocationDetails
  });
};