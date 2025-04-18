"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommunicactionDetails = exports.getPermanentDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("./footer");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPermanentDetails = exports.getPermanentDetails = function getPermanentDetails() {
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
          labelName: "Permanent Details",
          labelKey: "BPA_PERMENENT_ADDRESS_HEADER_DETAILS"
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
              labelKey: "BPA_SUMMARY_EDIT"
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
    viewOne: (0, _utils.getCommonContainer)({
      reviewDoorHouseNo: (0, _utils.getLabelWithValue)({
        labelName: "Door/House No.",
        labelKey: "BPA_DETAILS_DOOR_NO_LABEL"
      }, {
        jsonPath: "LicensesTemp[0].userData.address.doorNo",
        callBack: _utils2.checkValueForNA
      }),
      reviewBuilidingName: (0, _utils.getLabelWithValue)({
        labelName: "Building/Colony Name",
        labelKey: "BPA_DETAILS_BLDG_NAME_LABEL"
      }, {
        jsonPath: "LicensesTemp[0].userData.address.buildingName",
        callBack: _utils2.checkValueForNA
      }),
      reviewStreetName: (0, _utils.getLabelWithValue)({
        labelName: "Enter Street Name",
        labelKey: "BPA_DETAILS_SRT_NAME_PLACEHOLDER"
      }, {
        jsonPath: "LicensesTemp[0].userData.address.street",
        callBack: _utils2.checkValueForNA
      }),
      reviewMohalla: (0, _utils.getLabelWithValue)({
        labelName: "Locality",
        labelKey: "BPA_NEW_TRADE_DETAILS_MOHALLA_LABEL"
      }, {
        jsonPath: "LicensesTemp[0].userData.address.landmark",
        callBack: _utils2.checkValueForNA
      }),
      reviewCity: (0, _utils.getLabelWithValue)({
        labelName: "City",
        labelKey: "BPA_CITY_LABEL"
      }, {
        jsonPath: "LicensesTemp[0].userData.address.city",
        callBack: _utils2.checkValueForNA
      }),
      reviewPincode: (0, _utils.getLabelWithValue)({
        labelName: "Pincode",
        labelKey: "BPA_DETAILS_PIN_LABEL"
      }, {
        jsonPath: "LicensesTemp[0].userData.address.pincode",
        callBack: _utils2.checkValueForNA
      })
    })
  });
};

var getCommunicactionDetails = exports.getCommunicactionDetails = function getCommunicactionDetails() {
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
          labelName: "Communication Details",
          labelKey: "BPA_COMMUNICATION_ADDRESS_HEADER_DETAILS"
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
              labelKey: "BPA_SUMMARY_EDIT"
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
    viewOne: (0, _utils.getCommonContainer)({
      reviewDoorHouseNo: (0, _utils.getLabelWithValue)({
        labelName: "Door/House No.",
        labelKey: "BPA_DETAILS_DOOR_NO_LABEL"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.address.doorNo",
        callBack: _utils2.checkValueForNA
      }),
      reviewBuilidingName: (0, _utils.getLabelWithValue)({
        labelName: "Building/Colony Name",
        labelKey: "BPA_DETAILS_BLDG_NAME_LABEL"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.address.buildingName",
        callBack: _utils2.checkValueForNA
      }),
      reviewStreetName: (0, _utils.getLabelWithValue)({
        labelName: "Enter Street Name",
        labelKey: "BPA_DETAILS_SRT_NAME_PLACEHOLDER"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.address.street",
        callBack: _utils2.checkValueForNA
      }),
      reviewMohalla: (0, _utils.getLabelWithValue)({
        labelName: "Locality",
        labelKey: "BPA_NEW_TRADE_DETAILS_MOHALLA_LABEL"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.address.landmark",
        callBack: _utils2.checkValueForNA
      }),
      reviewCity: (0, _utils.getLabelWithValue)({
        labelName: "City",
        labelKey: "BPA_CITY_LABEL"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.address.city",
        callBack: _utils2.checkValueForNA
      }),
      reviewPincode: (0, _utils.getLabelWithValue)({
        labelName: "Pincode",
        labelKey: "BPA_DETAILS_PIN_LABEL"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.address.pincode",
        callBack: _utils2.checkValueForNA
      })
    })
  });
};