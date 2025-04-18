"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderServiceForSW = exports.renderServiceForWater = exports.renderService = exports.connDetailsSewerage = exports.connDetailsWater = exports.connectionDetailsSewerage = exports.connectionDetailsWater = exports.getConnectionDetails = exports.connectionDetailsHeader = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("../../../../../ui-utils/commons");

var service = (0, _commons.getQueryArg)(window.location.href, "service");
var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");

// let pageUrl = window.location.href;
// let arrayOfUrl = pageUrl && pageUrl.split("applicationNumber=");
// let applicationNumberUrl = arrayOfUrl && arrayOfUrl[1].split("&");
// let applicationNumber = applicationNumberUrl && applicationNumberUrl.length > 0 && applicationNumberUrl[0];

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

var connectionDetailsHeader = exports.connectionDetailsHeader = getHeader({
    labelKey: "WS_COMMON_CONNECTION_DETAILS"
});

var getConnectionDetails = exports.getConnectionDetails = function getConnectionDetails() {
    return {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "common-div-css search-preview",
            scheama: (0, _utils.getCommonGrayCard)({
                div4: connectionDetailsHeader,
                // serviceCardContainer: renderService()
                serviceCardContainerForWater: renderServiceForWater(),
                serviceCardContainerForSW: renderServiceForSW()

            }),
            items: [],
            hasAddItem: false,
            isReviewPage: true,
            sourceJsonPath: "WaterConnection[0]",
            prefixSourceJsonPath: "children.cardContent.children.getConnectionContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    };
};

var connectionDetailsWater = exports.connectionDetailsWater = {
    taskApplicationType: (0, _utils.getLabelWithValueForModifiedLabel)({
        labelName: "Apply For",
        labelKey: "WS_APPLY_FOR"
    }, {
        jsonPath: "WaterConnection[0].service",
        localePrefix: {
            moduleName: "WS",
            masterName: "APPLY"
        }
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
    }, { jsonPath: "WaterConnectionOld[0].service",
        localePrefix: {
            moduleName: "WS",
            masterName: "APPLY"
        } }),

    taskNumberOfTapsPropsed: (0, _utils.getLabelWithValueForModifiedLabel)({
        labelName: "No of Taps Proposed",
        labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_TAPS_PROPOSED"
    }, {
        jsonPath: "WaterConnection[0].proposedTaps"
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
    }, { jsonPath: "WaterConnectionOld[0].proposedTaps" }),
    taskPipeSizeProposed: (0, _utils.getLabelWithValueForModifiedLabel)({
        labelName: "No of pipe size proposed",
        labelKey: "WS_TASK_DETAILS_CONN_DETAIL_PIPE_SIZE_PROPOSED"
    }, { jsonPath: "WaterConnection[0].proposedPipeSize" }, {
        labelKey: "WS_OLD_LABEL_NAME"
    }, { jsonPath: "WaterConnectionOld[0].proposedPipeSize" })

};
var connectionDetailsSewerage = exports.connectionDetailsSewerage = {
    taskApplicationType: (0, _utils.getLabelWithValueForModifiedLabel)({
        labelName: "Apply For",
        labelKey: "WS_APPLY_FOR"
    }, {
        jsonPath: "WaterConnection[0].service",
        localePrefix: {
            moduleName: "WS",
            masterName: "APPLY"
        }
    }, {
        labelKey: "WS_OLD_LABEL_NAME"
    }, { jsonPath: "WaterConnectionOld[0].service",
        localePrefix: {
            moduleName: "WS",
            masterName: "APPLY"
        } }),
    taskNoOfClosets: (0, _utils.getLabelWithValueForModifiedLabel)({
        labelName: "No of closets proposed",
        labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_CLOSETS_PROPOSED"
    }, { jsonPath: "WaterConnection[0].proposedWaterClosets" }, {
        labelKey: "WS_OLD_LABEL_NAME"
    }, { jsonPath: "WaterConnectionOld[0].proposedWaterClosets" }),
    taskNoOfToilets: (0, _utils.getLabelWithValueForModifiedLabel)({
        labelName: "No of toilets proposed",
        labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_TOILETS_PROPOSED"
    }, { jsonPath: "WaterConnection[0].proposedToilets" }, {
        labelKey: "WS_OLD_LABEL_NAME"
    }, { jsonPath: "WaterConnectionOld[0].proposedToilets" })

};

var connectionDetails = applicationNumber !== null && applicationNumber !== undefined ? applicationNumber.includes("WS") ? connectionDetailsWater : connectionDetailsSewerage : "";

var connDetailsWater = exports.connDetailsWater = connectionDetailsWater;

var connDetailsSewerage = exports.connDetailsSewerage = connectionDetailsSewerage;
var renderService = exports.renderService = function renderService() {
    return (0, _utils.getCommonContainer)(connectionDetails);
};

var renderServiceForWater = exports.renderServiceForWater = function renderServiceForWater() {
    return (0, _utils.getCommonContainer)(connectionDetailsWater);
};

var renderServiceForSW = exports.renderServiceForSW = function renderServiceForSW() {
    return (0, _utils.getCommonContainer)(connectionDetailsSewerage);
};