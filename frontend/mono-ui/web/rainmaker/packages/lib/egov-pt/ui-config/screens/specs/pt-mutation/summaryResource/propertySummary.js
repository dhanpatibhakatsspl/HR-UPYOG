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

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

var propertyDetails = (0, _utils.getCommonGrayCard)({
  propertyLocationContainer: (0, _utils.getCommonContainer)({
    city: (0, _utils.getLabelWithValue)({
      labelName: "City",
      labelKey: "PT_PROPERTY_ADDRESS_CITY"
    }, {
      jsonPath: "Property.address.city",
      localePrefix: {
        moduleName: "TENANT",
        masterName: "TENANTS"
      },
      callBack: _utils2.checkValueForNA
    }),
    doorHouseNo: (0, _utils.getLabelWithValue)({
      labelName: "Door/House No.",
      labelKey: "PT_PROPERTY_ADDRESS_HOUSE_NO"
    }, { jsonPath: "Property.address.doorNo", callBack: _utils2.checkValueForNA }),
    buildingCompanyName: (0, _utils.getLabelWithValue)({
      labelName: "Building/Company Name",
      labelKey: "PT_PROPERTY_ADDRESS_COLONY_NAME"
    }, {
      jsonPath: "Property.address.buildingName", callBack: _utils2.checkValueForNA
    }),
    streetName: (0, _utils.getLabelWithValue)({
      labelName: "Street Name",
      labelKey: "PT_PROPERTY_ADDRESS_STREET_NAME"
    }, { jsonPath: "Property.address.street", callBack: _utils2.checkValueForNA }),
    mohalla: (0, _utils.getLabelWithValue)({
      labelName: "Mohalla",
      labelKey: "PT_PROPERTY_ADDRESS_MOHALLA"
    }, {
      jsonPath: "Property.address.locality.code",
      callBack: function callBack(value) {
        return value ? (0, _commons.getTransformedLocale)(tenantId) + "_REVENUE_" + value : "NA";
      }
    }),
    pincode: (0, _utils.getLabelWithValue)({
      labelName: "Pincode",
      labelKey: "PT_PROPERTY_ADDRESS_PINCODE"
    }, { jsonPath: "Property.address.pincode", callBack: _utils2.checkValueForNA }),
    existingPropertyId: (0, _utils.getLabelWithValue)({
      labelName: "Existing Property ID",
      labelKey: "PT_PROPERTY_ADDRESS_EXISTING_PID"
    }, { jsonPath: "Property.oldPropertyId", callBack: _utils2.checkValueForNA })
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
        labelName: "Property Address",
        labelKey: "PT_PROPERTY_ADDRESS_SUB_HEADER"
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
            labelKey: "PT_EDIT"
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
  cardOne: propertyDetails
});