"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getProperty = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getProperty = exports.getProperty = function getProperty() {
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
                    labelKey: "WS_COMMON_PROP_DETAIL" //TL_COMMON_OWN_DETAILS
                }))

            }
        },
        propertyCardContainer: (0, _utils.getCommonContainer)({
            propertyCity: (0, _utils.getLabelWithValue)({
                labelKey: "WS_PROP_DETAIL_CITY"
            }, {
                jsonPath: "WaterConnection[0].property.address.city"
            }),
            propertyDoorNo: (0, _utils.getLabelWithValue)({
                labelKey: "WS_PROP_DETAIL_PHNO_LABEL"
            }, {
                jsonPath: "WaterConnection[0].property.address.doorNo"
            }),
            propertyBuilding: (0, _utils.getLabelWithValue)({
                labelKey: "WS_PROP_DETAIL_BUILD_NAME_LABEL"
            }, {
                jsonPath: "WaterConnection[0].property.address.buildingName"
            }),
            propertyStreet: (0, _utils.getLabelWithValue)({
                labelKey: "WS_PROP_DETAIL_STREET_NAME"
            }, {
                jsonPath: "WaterConnection[0].property.address.street"
            }),
            propertyMohalla: (0, _utils.getLabelWithValue)({
                labelKey: "WS_PROP_DETAIL_LOCALITY_MOHALLA_LABEL"
            }, {
                jsonPath: "WaterConnection[0].property.address.locality.name"
            }),
            propertyPincode: (0, _utils.getLabelWithValue)({
                labelKey: "WS_PROP_DETAIL_PINCODE"
            }, {
                jsonPath: "WaterConnection[0].property.address.pincode"
            })
        })
    });
};