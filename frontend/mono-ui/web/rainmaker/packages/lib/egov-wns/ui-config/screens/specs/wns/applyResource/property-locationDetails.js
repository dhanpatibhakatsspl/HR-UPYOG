"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyDetails = exports.propertyLocationDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertyLocationDetails = exports.propertyLocationDetails = (0, _utils.getCommonContainer)({
  city: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_CITY"
  }, {
    jsonPath: "applyScreen.property.address.city"
  }),
  plotOrHouseOrSurveyNo: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_DHNO",
    labelName: "Door/House No."
  }, {
    jsonPath: "applyScreen.property.address.doorNo"
  }),
  buildingOrColonyName: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_BUILD_NAME_LABEL"
  }, {
    jsonPath: "applyScreen.property.address.buildingName"
  }),
  streetName: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_STREET_NAME"
  }, {
    jsonPath: "applyScreen.property.address.street"
  }),
  locality: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_LOCALITY_MOHALLA_LABEL",
    labelName: "Locality/Mohalla"
  }, {
    jsonPath: "applyScreen.property.address.locality.name"
  }),
  pincode: (0, _utils.getLabelWithValue)({
    labelKey: "WS_PROP_DETAIL_PINCODE"
  }, { jsonPath: "applyScreen.property.address.pincode" })
});

var getPropertyDetails = exports.getPropertyDetails = function getPropertyDetails() {
  var isEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonContainer)({
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
          labelKey: "WS_COMMON_PROP_LOC_DETAIL_HEADER",
          labelName: "Property Location Details"
        }))
      }
    },
    viewFour: propertyLocationDetails
  });
};