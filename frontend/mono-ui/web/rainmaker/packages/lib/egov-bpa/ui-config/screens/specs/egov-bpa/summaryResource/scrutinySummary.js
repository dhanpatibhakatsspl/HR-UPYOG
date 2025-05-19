"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scrutinySummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _index = require("../../utils/index");

var _footer = require("../applyResource/footer");

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

var scrutinySummary = exports.scrutinySummary = (0, _utils.getCommonGrayCard)({
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
                labelName: "Scrutiny Details",
                labelKey: "BPA_SCRUNITY_SUMMARY"
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
                        (0, _footer.changeStep)(state, dispatch, "", 1);
                    }
                }
            }
        }
    },
    buildingPlanScrutinyHeaderDetails: getHeader({
        labelName: "Building Plan Scrutiny Application Details",
        labelKey: "BPA_APPLICATION_SCRUNITY_DETAILS_TITLE"
    }),
    breakeDCR: (0, _utils.getBreak)(),
    buildingPlanScrutinyDetailsContainer: (0, _utils.getCommonContainer)({
        buildingplanscrutinyapplicationnumber: (0, _utils.getLabelWithValue)({
            labelName: "eDCR Number",
            labelKey: "BPA_EDCR_NO_LABEL"
        }, {
            jsonPath: "scrutinyDetails.edcrNumber"
        }),
        uploadedfile: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-bpa",
            componentPath: "downloadFile",
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 3
            },
            props: {
                label: {
                    labelName: "Uploaded Diagram",
                    labelKey: "BPA_BASIC_DETAILS_UPLOADED_DIAGRAM"
                },
                linkDetail: {
                    labelName: "uploadedDiagram.dxf",
                    labelKey: "BPA_BASIC_DETAILS_UPLOADED_DIAGRAM_DXF"
                },
                jsonPath: "scrutinyDetails.updatedDxfFile"
            },
            type: "array"
        },
        scrutinyreport: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-bpa",
            componentPath: "downloadFile",
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 3
            },
            props: {
                label: {
                    labelName: "Scrutiny Report",
                    labelKey: "BPA_BASIC_DETAILS_SCRUTINY_REPORT"
                },
                linkDetail: {
                    labelName: "ScrutinyReport.pdf",
                    labelKey: "BPA_BASIC_DETAILS_SCRUTINY_REPORT_PDF"
                },
                jsonPath: "scrutinyDetails.planReport"
            },
            type: "array"
        }
    }),
    proposedBuildingDetailsHeadr: getHeader({
        labelName: "Proposed Building Details",
        labelKey: "BPA_APPLICATION_PROPOSED_BUILDING_LABEL"
    }),
    break3: (0, _utils.getBreak)(),
    proposedBuildingDetailsSummary: (0, _utils.getCommonCard)({
        header: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: {
                    width: "50%",
                    display: "inline-block",
                    fontSize: "18px",
                    paddingLeft: "10px"
                }
            },
            children: {
                proposedLabel: (0, _utils.getLabel)({
                    labelName: "Proposed Building Details",
                    labelKey: "BPA_APPLICATION_PROPOSED_BUILDING_LABEL"
                })
            }
        },
        occupancy: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                className: "occupancytypeblock"
            },
            children: {
                occupancyType: (0, _utils.getLabelWithValue)({
                    labelName: "Occupancy Type",
                    labelKey: "BPA_OCCUPANCY_TYPE"
                }, {
                    localePrefix: {
                        moduleName: "BPA",
                        masterName: "OCCUPANCYTYPE"
                    },
                    jsonPath: "scrutinyDetails.planDetail.occupancies[0].typeHelper.type.code",
                    callBack: _index.checkValueForNA
                })
            }
        },
        proposedContainer: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            visible: true,
            props: {
                className: "mymuicontainer"
            },
            children: {
                component: {
                    uiFramework: "custom-containers",
                    componentPath: "MultiItem",
                    props: {
                        hasAddItem: false,
                        scheama: (0, _utils.getCommonContainer)({
                            blocksContainer: (0, _utils.getCommonContainer)({
                                header: (0, _utils.getLabel)("Block", "", {
                                    jsonPath: "edcr.blockDetail[0].titleData",
                                    style: {
                                        width: "50%",
                                        marginTop: "5px",
                                        marginLeft: "7px"
                                    }
                                }),
                                subOccupancyType: (0, _utils.getLabelWithValue)({
                                    labelName: "Sub Occupancy Type",
                                    labelKey: "BPA_SUB_OCCUP_TYPE_LABEL"
                                }, {
                                    jsonPath: "edcr.blockDetail[0]",
                                    callBack: function callBack(value) {
                                        var returnVAlue = void 0;
                                        if (value && value.occupancyType && value.occupancyType.length) {
                                            returnVAlue = "";
                                            var occupancy = value.occupancyType;
                                            for (var tp = 0; tp < occupancy.length; tp++) {
                                                if (tp === occupancy.length - 1) {
                                                    returnVAlue += (0, _commons.getLocaleLabels)((0, _commons.getTransformedLocale)("BPA_SUBOCCUPANCYTYPE_" + occupancy[tp].value), (0, _commons.getTransformedLocale)("BPA_SUBOCCUPANCYTYPE_" + occupancy[tp].value)); //occupancy[tp].label;
                                                } else {
                                                    returnVAlue += (0, _commons.getLocaleLabels)((0, _commons.getTransformedLocale)("BPA_SUBOCCUPANCYTYPE_" + occupancy[tp].value), (0, _commons.getTransformedLocale)("BPA_SUBOCCUPANCYTYPE_" + occupancy[tp].value)) + ","; //occupancy[tp].label + ",";
                                                }
                                            }
                                        }
                                        return returnVAlue || "NA";
                                    }
                                }),
                                proposedBuildingDetailsContainer: {
                                    uiFramework: "custom-molecules-local",
                                    moduleName: "egov-bpa",
                                    componentPath: "Table",
                                    props: {
                                        className: "mymuitable",
                                        jsonPath: "edcr.blockDetail[0].blocks",
                                        style: { marginBottom: 20 },
                                        // columns: {
                                        //     "Floor Description": {},
                                        //     "Level": {},
                                        //     "Occupancy/Sub Occupancy": {},
                                        //     "Buildup Area": {},
                                        //     "Floor Area": {},
                                        //     "Carpet Area": {},
                                        // },
                                        columns: [{ key: "Floor Description", name: "BPA_COMMON_TABLE_COL_FLOOR_DES" }, { key: "Level", name: "BPA_COMMON_TABLE_COL_FLOOR_LEVEL" }, { key: "Occupancy/Sub Occupancy", name: "BPA_COMMON_TABLE_COL_OCCUP" }, { key: "Buildup Area", name: "BPA_COMMON_TABLE_COL_BUILD_AREA" }, { key: "Floor Area", name: "BPA_COMMON_TABLE_COL_FLOOR_AREA" }, { key: "Carpet Area", name: "BPA_COMMON_TABLE_COL_CARPET_AREA" }],
                                        title: "",
                                        options: {
                                            filterType: "dropdown",
                                            responsive: "stacked",
                                            selectableRows: false,
                                            pagination: false,
                                            selectableRowsHeader: false,
                                            sortFilterList: false,
                                            sort: false,
                                            filter: false,
                                            search: false,
                                            print: false,
                                            download: false,
                                            viewColumns: false,
                                            rowHover: false
                                        }
                                    }
                                },
                                breakP: (0, _utils.getBreak)(),
                                breakP1: (0, _utils.getBreak)()
                            })
                        }),
                        items: [],
                        isReviewPage: true,
                        prefixSourceJsonPath: "children.blocksContainer.children",
                        sourceJsonPath: "edcr.blockDetail",
                        afterPrefixJsonPath: "children.value.children.key"
                    },
                    type: "array"
                },
                breakP2: (0, _utils.getBreak)()
            }
        }
    }),
    break4: (0, _utils.getBreak)(),
    DemolitionDetails: getHeader({
        labelName: "Demolition Details",
        labelKey: "BPA_APP_DETAILS_DEMOLITION_DETAILS_LABEL"
    }),
    break1: (0, _utils.getBreak)(),
    demolitionDetailsContainer: (0, _utils.getCommonContainer)({
        demolitionArea: (0, _utils.getLabelWithValue)({
            labelName: "Demolition Area",
            labelKey: "BPA_APPLICATION_DEMOLITION_AREA_LABEL"
        }, {
            jsonPath: "scrutinyDetails.planDetail.planInformation.demolitionArea",
            callBack: function callBack(value) {
                if (value) {
                    return value;
                } else if (value == "0") {
                    return "0";
                } else {
                    return _index.checkValueForNA;
                }
            }
        })
    }),
    proposedBuildingDetails1: getHeader({
        labelName: "Proposed Building Abstract",
        labelKey: "BPA_PROPOSED_BUILDING_ABSTRACT_HEADER"
    }),
    brk: (0, _utils.getBreak)(),

    totalBuildUpAreaDetailsContainer: (0, _utils.getCommonContainer)({
        buitUpArea: (0, _utils.getLabelWithValue)({
            labelName: "Total Buildup Area (sq.mtrs)",
            labelKey: "BPA_APPLICATION_TOTAL_BUILDUP_AREA"
        }, {
            jsonPath: "scrutinyDetails.planDetail.virtualBuilding.totalBuitUpArea",
            callBack: _index.checkValueForNA
        }),
        totalFloors: (0, _utils.getLabelWithValue)({
            labelName: "Number Of Floors",
            labelKey: "BPA_APPLICATION_NO_OF_FLOORS"
        }, {
            jsonPath: "scrutinyDetails.planDetail.blocks[0].building.totalFloors",
            callBack: _index.checkValueForNA
        }),
        buildingHeight: (0, _utils.getLabelWithValue)({
            labelName: "High From Ground Level From Mumty (In Mtrs)",
            labelKey: "BPA_APPLICATION_HIGH_FROM_GROUND"
        }, {
            jsonPath: "scrutinyDetails.planDetail.blocks[0].building.buildingHeight",
            callBack: _index.checkValueForNA
        })

    })
});