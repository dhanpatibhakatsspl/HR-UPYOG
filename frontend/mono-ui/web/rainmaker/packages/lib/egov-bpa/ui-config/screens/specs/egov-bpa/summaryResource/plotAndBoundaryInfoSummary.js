"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.plotAndBoundaryInfoSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
    return {
        uiFramework: "custom-molecules-local",
        moduleName: "egov-bpa",
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

var plotAndBoundaryInfoSummary = exports.plotAndBoundaryInfoSummary = (0, _utils.getCommonGrayCard)({
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
                labelName: "Plot & Boundary Details",
                labelKey: "BPA_BOUNDARY_SUMMARY"
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
                        labelName: "Edit",
                        labelKey: "BPA_SUMMARY_EDIT"
                    })
                },
                onClickDefination: {
                    action: "condition",
                    callBack: function callBack(state, dispatch) {
                        (0, _index.gotoApplyWithStep)(state, dispatch, 3);
                    }
                }
            }
        }
    },
    DetailsOfPlot: getHeader({
        labelName: "Details Of Plot",
        labelKey: "BPA_BOUNDARY_PLOT_DETAILS_TITLE"
    }),
    break1: (0, _utils.getBreak)(),
    cardTwo: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "applicant-summary",
            scheama: (0, _utils.getCommonGrayCard)({
                detailsOfPlotContainer: (0, _utils.getCommonContainer)({

                    plotArea: (0, _utils.getLabelWithValue)({
                        labelName: "Plot Area",
                        labelKey: "BPA_BOUNDARY_PLOT_AREA_LABEL"
                    }, {
                        jsonPath: "scrutinyDetails.planDetail.plot.area",
                        callBack: _index.checkValueForNA
                    }),
                    kathaNumber: (0, _utils.getLabelWithValue)({
                        labelName: "Khata No.",
                        labelKey: "BPA_BOUNDARY_KHATA_NO_LABEL"
                    }, {
                        jsonPath: "scrutinyDetails.planDetail.planInformation.khataNo",
                        callBack: _index.checkValueForNA
                    }),
                    holdingNumber: (0, _utils.getLabelWithValue)({
                        labelName: "Holding No.",
                        labelKey: "BPA_BOUNDARY_HOLDING_NO_LABEL"
                    }, {
                        jsonPath: "BPA.holdingNo",
                        callBack: _index.checkValueForNA
                    }),
                    plotNo: (0, _utils.getLabelWithValue)({
                        labelName: "Plot No(MSP)",
                        labelKey: "BPA_BOUNDARY_PLOT_NO_LABEL"
                    }, {
                        jsonPath: "scrutinyDetails.planDetail.planInformation.plotNo",
                        callBack: _index.checkValueForNA
                    }),
                    cityTown: (0, _utils.getLabelWithValue)({
                        labelName: "City/Town",
                        labelKey: "BPA_BOUNDARY_CITY_TOWN_LABEL"
                    }, {
                        jsonPath: "BPAs[0].BPADetails.plotdetails.citytown.label",
                        callBack: function callBack(value) {
                            return (0, _commons.getQueryArg)(window.location.href, "tenantId") || _index.checkValueForNA;
                        }
                    }),
                    landRegDetails: (0, _utils.getLabelWithValue)({
                        labelName: "Land Registration Details",
                        labelKey: "BPA_BOUNDARY_LAND_REG_DETAIL_LABEL"
                    }, {
                        jsonPath: "BPA.registrationDetails",
                        callBack: _index.checkValueForNA
                    }),
                    whetherGovOrQuasi: (0, _utils.getLabelWithValue)({
                        labelName: "Whether Government or Quasi Government",
                        labelKey: "BPA_BOUNDARY_GOVT_QUASI_LABEL"
                    }, {
                        jsonPath: "BPA.govtOrQuasi",
                        callBack: _index.checkValueForNA
                    })
                })
            }),
            items: [],
            hasAddItem: false,
            isReviewPage: true,
            sourceJsonPath: "scrutinyDetails.planDetail",
            prefixSourceJsonPath: "children.cardContent.children.applicantContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    }
});