"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getOwner = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOwner = exports.getOwner = function getOwner() {
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
                    labelName: "Owner Details",
                    labelKey: "WS_COMMON_OWN_DETAIL" //TL_COMMON_OWN_DETAILS
                }))

            }
        },
        multiOwner: {
            uiFramework: "custom-containers",
            componentPath: "MultiItem",
            props: {
                scheama: (0, _utils.getCommonGrayCard)({
                    viewFive: (0, _utils.getCommonContainer)({
                        reviewOwnerName: (0, _utils.getLabelWithValue)({
                            labelName: "Name",
                            labelKey: "WS_OWN_DETAIL_NAME"
                        }, { jsonPath: "WaterConnection[0].property.owners[0].name" }),
                        reviewOwnerAddr: (0, _utils.getLabelWithValue)({
                            labelName: "Corrospondence Address",
                            labelKey: "WS_OWN_DETAIL_CROSADD"
                        }, {
                            jsonPath: "WaterConnection[0].property.owners[0].correspondenceAddress"
                        })
                    })
                }),

                items: [],
                hasAddItem: false,
                sourceJsonPath: "WaterConnection[0].property.owners",
                prefixSourceJsonPath: "children.cardContent.children.viewFive.children",
                afterPrefixJsonPath: "children.value.children.key"
            },
            type: "array"
        }
    });
};