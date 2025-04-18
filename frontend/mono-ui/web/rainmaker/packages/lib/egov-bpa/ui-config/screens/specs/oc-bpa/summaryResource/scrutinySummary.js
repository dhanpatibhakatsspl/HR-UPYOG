"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scrutinySummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var _commons = require("egov-ui-framework/ui-utils/commons");

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
                        (0, _footer.changeStep)(state, dispatch, "", 0);
                    }
                }
            }
        }
    },
    ocBpaBasicDetailsContainer: getHeader({
        labelName: "Basic Details",
        labelKey: "BPA_BASIC_DETAILS_TITLE"
    }),
    break1: (0, _utils.getBreak)(),
    basicDetailsContainer: (0, _utils.getCommonContainer)({
        scrutinynumber: (0, _utils.getLabelWithValue)({
            labelName: "Occupancy Certificate Scrutiny Number",
            labelKey: "BPA_OC_SCRUTINY_NO_LABEL"
        }, {
            jsonPath: "BPA.edcrNumber",
            callBack: _index.checkValueForNA
        }),
        applicationtype: (0, _utils.getLabelWithValue)({
            labelName: "Application Type",
            labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
        }, {
            localePrefix: {
                moduleName: "WF",
                masterName: "BPA"
            },
            jsonPath: "BPA.applicationType",
            callBack: _index.checkValueForNA
        }),
        risktype: (0, _utils.getLabelWithValue)({
            labelName: "Risk Type",
            labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL"
        }, {
            localePrefix: {
                moduleName: "WF",
                masterName: "BPA"
            },
            jsonPath: "BPA.riskType",
            callBack: _index.checkValueForNA
        }),
        servicetype: (0, _utils.getLabelWithValue)({
            labelName: "Service Type",
            labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL"
        }, {
            jsonPath: "BPA.serviceType",
            callBack: _index.checkValueForNA
        }),
        applicationDate: (0, _utils.getLabelWithValue)({
            labelName: "Application Date",
            labelKey: "BPA_BASIC_DETAILS_APP_DATE_LABEL"
        }, {
            jsonPath: "BPA.auditDetails.createdTime",
            callBack: function callBack(value) {
                return (0, _utils.convertEpochToDate)(value) || _index.checkValueForNA;
            }
        }),
        applicantName: (0, _utils.getLabelWithValue)({
            labelName: "Applicant Name",
            labelKey: "EDCR_SCRUTINY_NAME_LABEL"
        }, {
            jsonPath: "BPA.applicantName",
            callBack: _index.checkValueForNA
        }),
        // stakeHolderName: getLabelWithValue(
        //     {
        //         labelName: "Stake Holder Name",
        //         labelKey: "EDCR_SH_NAME_LABEL"
        //     },
        //     {
        //         jsonPath: "BPA.appliedBy",
        //         callBack: checkValueForNA
        //     }
        // ),
        remarks: (0, _utils.getLabelWithValue)({
            labelName: "Remarks",
            labelKey: "BPA_BASIC_DETAILS_REMARKS_LABEL"
        }, {
            jsonPath: "BPA.additionalDetails.remarks",
            callBack: _index.checkValueForNA
        }),
        buildingPermitNum: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-bpa",
            componentPath: "downloadFile",
            gridDefination: {
                xs: 3,
                sm: 3,
                md: 3
            },
            props: {
                label: {
                    labelName: "Building Permit Number",
                    labelKey: "EDCR_BUILDING_PERMIT_NUM_LABEL"
                },
                linkDetail: {
                    labelName: "",
                    labelKey: ""
                },
                jsonPath: "BPA.permitNumberLink"
            },
            type: "array"
        }
    }),
    break2: (0, _utils.getBreak)(),
    buildingPlanScrutinyHeaderDetails: getHeader({
        labelName: "Occupancy certificate scrutiny details",
        labelKey: "BPA_OC_CER_SCRUNITY_DETAILS_TITLE"
    }),
    breake3: (0, _utils.getBreak)(),
    buildingPlanScrutinyDetailsContainer: (0, _utils.getCommonContainer)({
        buildingplanscrutinyapplicationnumber: (0, _utils.getLabelWithValue)({
            labelName: "eDCR Number",
            labelKey: "BPA_EDCR_NO_LABEL"
        }, {
            jsonPath: "ocScrutinyDetails.edcrNumber"
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
                jsonPath: "ocScrutinyDetails.updatedDxfFile"
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
                jsonPath: "ocScrutinyDetails.planReport"
            },
            type: "array"
        }
    }),
    breake4: (0, _utils.getBreak)(),
    proposedBuildingDetails: getHeader({
        labelName: "Actual Building details",
        labelKey: "BPA_ACTUAL_BUILDING_DETAILS_LABEL"
    }),
    break5: (0, _utils.getBreak)(),
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
                    labelName: "Actual Building details",
                    labelKey: "BPA_ACTUAL_BUILDING_DETAILS_LABEL"
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
                    jsonPath: "ocScrutinyDetails.planDetail.occupancies[0].typeHelper.type.code",
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
                breakP2: (0, _utils.getBreak)(),
                breakq: (0, _utils.getBreak)()
            }
        }
    }),
    break6: (0, _utils.getBreak)(),
    proposedBuildingAbstractDetails: getHeader({
        labelName: "Actual building abstract",
        labelKey: "BPA_ACTUAL_BUILDING_ABSTRACT_HEADER"
    }),
    break7: (0, _utils.getBreak)(),
    proposedBuildingAbstractContainer: (0, _utils.getCommonContainer)({
        buildingplanscrutinyapplicationnumber: (0, _utils.getLabelWithValue)({
            labelName: "Total Buildup Area (sq.mtrs)",
            labelKey: "BPA_APPLICATION_TOTAL_BUILDUP_AREA"
        }, {
            jsonPath: "ocScrutinyDetails.planDetail.virtualBuilding.totalBuitUpArea",
            callBack: _index.checkValueForNA
        }),
        uploadedfile: (0, _utils.getLabelWithValue)({
            labelName: "Number Of Floors",
            labelKey: "BPA_APPLICATION_NO_OF_FLOORS"
        }, {
            jsonPath: "ocScrutinyDetails.planDetail.blocks[0].building.totalFloors",
            callBack: _index.checkValueForNA
        }),
        scrutinyreport: (0, _utils.getLabelWithValue)({
            labelName: "High From Ground Level From Mumty (In Mtrs)",
            labelKey: "BPA_APPLICATION_HIGH_FROM_GROUND"
        }, {
            jsonPath: "ocScrutinyDetails.planDetail.blocks[0].building.buildingHeight",
            callBack: _index.checkValueForNA
        })
    })
});