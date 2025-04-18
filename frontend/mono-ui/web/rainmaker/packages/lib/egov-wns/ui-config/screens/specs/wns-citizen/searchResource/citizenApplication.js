"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.citizenApplication = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _functions = require("./functions");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var resetFields = function resetFields(state, dispatch) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children.city", "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children.propertyid", "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children.ownerMobNo", "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children.consumerid", "props.value", ""));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.citizenApplication.children.cardContent.children.cityPropertyAndMobNumContainer.children.oldConsumerid", "props.value", ""));
};
var citizenApplication = exports.citizenApplication = (0, _utils.getCommonCard)({
    subHeader: (0, _utils.getCommonTitle)({
        labelKey: "WS_SEARCH_CONNECTION_SUB_HEADER"
    }),
    subParagraph: (0, _utils.getCommonParagraph)({
        labelKey: "WS_HOME_SEARCH_CONN_RESULTS_DESC"
    }),
    cityPropertyAndMobNumContainer: (0, _utils.getCommonContainer)({
        city: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-wns",
            componentPath: "AutosuggestContainer",
            jsonPath: "searchScreen.tenantId",
            props: {
                className: "hr-generic-selectfield autocomplete-dropdown",
                label: {
                    labelKey: "WS_PROP_DETAIL_CITY",
                    labelName: "City"
                },
                placeholder: {
                    labelKey: "WS_PROP_DETAIL_CITY_PLACEHOLDER",
                    labelName: "Select City"
                },
                localePrefix: {
                    moduleName: "TENANT",
                    masterName: "TENANTS"
                },
                required: true,
                isClearable: true,
                labelsFromLocalisation: true,
                jsonPath: "searchScreen.tenantId",
                sourceJsonPath: "applyScreenMdmsData.tenant.tenants"
            },
            required: true,
            gridDefination: { xs: 12, sm: 4 }
        },
        propertyid: (0, _utils.getTextField)({
            label: {
                labelKey: "WS_PROPERTY_ID_LABEL"
            },
            placeholder: {
                labelKey: "WS_PROPERTY_ID_PLACEHOLDER"
            },
            gridDefination: {
                xs: 12,
                sm: 4
            },
            required: false,
            pattern: /^[a-zA-Z0-9-]*$/i,
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
            jsonPath: "searchScreen.propertyId"
        }),
        ownerMobNo: (0, _utils.getTextField)({
            label: {
                labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
            },
            placeholder: {
                labelKey: "WS_OWN_DETAIL_MOBILE_NO_PLACEHOLDER"
            },
            gridDefination: {
                xs: 12,
                sm: 4
            },
            iconObj: {
                label: "+91 |",
                position: "start"
            },
            required: false,
            pattern: (0, _utils.getPattern)("MobileNo"),
            jsonPath: "searchScreen.mobileNumber",
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
        }),
        consumerid: (0, _utils.getTextField)({
            label: {
                labelKey: "WS_MYCONNECTIONS_CONSUMER_NO"
            },
            placeholder: {
                labelKey: "WS_SEARCH_CONNNECTION_CONSUMER_PLACEHOLDER"
            },
            gridDefination: {
                xs: 12,
                sm: 4
            },
            required: false,
            pattern: (0, _utils.getPattern)("consumerNo"),
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
            jsonPath: "searchScreen.connectionNumber"
        }),
        oldConsumerid: (0, _utils.getTextField)({
            label: {
                labelKey: "WS_SEARCH_CONNNECTION_OLD_CONSUMER_LABEL"
            },
            placeholder: {
                labelKey: "WS_SEARCH_CONNNECTION_OLD_CONSUMER_PLACEHOLDER"
            },
            gridDefination: {
                xs: 12,
                sm: 4
            },
            required: false,
            pattern: /^[a-zA-Z0-9-]*$/i,
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
            jsonPath: "searchScreen.oldConnectionNumber"
        })
    }),
    button: (0, _utils.getCommonContainer)({
        buttonContainer: (0, _utils.getCommonContainer)({
            resetButton: {
                componentPath: "Button",
                gridDefination: {
                    xs: 12,
                    sm: 6
                },
                props: {
                    variant: "outlined",
                    style: {
                        color: "rgba(0, 0, 0, 0.6000000238418579)",
                        borderColor: "rgba(0, 0, 0, 0.6000000238418579)",
                        width: "220px",
                        height: "48px",
                        margin: "8px",
                        float: "right"
                    }
                },
                children: {
                    buttonLabel: (0, _utils.getLabel)({
                        labelKey: "WS_SEARCH_CONNECTION_RESET_BUTTON"
                    })
                },
                onClickDefination: {
                    action: "condition",
                    callBack: resetFields
                }
            },
            searchButton: {
                componentPath: "Button",
                gridDefination: {
                    xs: 12,
                    sm: 6
                },
                props: {
                    variant: "contained",
                    style: {
                        color: "white",
                        margin: "8px",
                        backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
                        borderRadius: "2px",
                        width: "220px",
                        height: "48px"
                    }
                },
                children: {
                    buttonLabel: (0, _utils.getLabel)({
                        labelKey: "WS_SEARCH_CONNECTION_SEARCH_BUTTON"
                    })
                },
                onClickDefination: {
                    action: "condition",
                    callBack: _functions.searchApiCall
                }
            }
        })
    })
});