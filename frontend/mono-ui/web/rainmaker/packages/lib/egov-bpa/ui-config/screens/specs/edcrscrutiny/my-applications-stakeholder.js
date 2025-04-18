"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _functions = require("./functions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
    labelName: "My Applications",
    labelKey: "BPA_MY_APPLICATIONS"
}, {
    classes: {
        root: "common-header-cont"
    }
});

var screenConfig = {
    uiFramework: "material-ui",
    name: "my-applications-stakeholder",
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        (0, _functions.fetchDataForStakeHolder)(action, state, dispatch, true);
        return action;
    },

    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            children: {
                header: header,
                filterCard: (0, _utils.getCommonContainer)({
                    applicationType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
                        label: {
                            labelName: "Application Type",
                            labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
                        },
                        placeholder: {
                            labelName: "Select Application Type",
                            labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_PLACEHOLDER"
                        },
                        jsonPath: "filterData[0].applicationType",
                        props: {
                            style: { marginLeft: "20px" }
                        },
                        visible: false,
                        data: [{
                            code: "BPA_APPLY_SERVICE",
                            label: "BPA"
                        }, {
                            code: "BPAREG_SERVICE",
                            label: "Stakeholder"
                        }],
                        gridDefination: {
                            xs: 12,
                            sm: 3
                        }
                    }), {
                        afterFieldChange: function afterFieldChange(action, state, dispatch) {
                            fieldChange(action, state, dispatch);
                        }
                    }),
                    serviceType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
                        label: {
                            labelName: "Service Type",
                            labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL"
                        },
                        placeholder: {
                            labelName: "Select Service Type",
                            labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_PLACEHOLDER"
                        },
                        optionLabel: "name",
                        sourceJsonPath: "applyScreenMdmsData.BPA.ServiceType",
                        jsonPath: "filterData[0].serviceType",
                        localePrefix: {
                            moduleName: "WF",
                            masterName: "BPA"
                        },
                        props: {
                            style: { marginLeft: "20px" }
                        },
                        visible: false,
                        gridDefination: {
                            xs: 12,
                            sm: 3
                        }
                    }), {
                        afterFieldChange: function afterFieldChange(action, state, dispatch) {
                            fieldChange(action, state, dispatch);
                        }
                    }),
                    applicationStatus: (0, _extends3.default)({}, (0, _utils.getSelectField)({
                        label: {
                            labelName: "Status",
                            labelKey: "BPA_STATUS_LABEL"
                        },
                        optionLabel: "name",
                        placeholder: {
                            labelName: "Select Status",
                            labelKey: "BPA_STATUS_PLACEHOLDER"
                        },
                        jsonPath: "filterData[0].status",
                        data: [{ code: (0, _utils2.getBpaTextToLocalMapping)("PENDINGPAYMENT") }, { code: (0, _utils2.getBpaTextToLocalMapping)("REJECTED") }, { code: (0, _utils2.getBpaTextToLocalMapping)("APPROVED") }, { code: (0, _utils2.getBpaTextToLocalMapping)("INITIATED") }, { code: (0, _utils2.getBpaTextToLocalMapping)("CITIZEN_APPROVAL_INPROCESS") }, { code: (0, _utils2.getBpaTextToLocalMapping)("INPROGRESS") }, { code: (0, _utils2.getBpaTextToLocalMapping)("PENDING_FEE") }, { code: (0, _utils2.getBpaTextToLocalMapping)("DOC_VERIFICATION_INPROGRESS") }, { code: (0, _utils2.getBpaTextToLocalMapping)("FIELDINSPECTION_INPROGRESS") }, { code: (0, _utils2.getBpaTextToLocalMapping)("NOC_VERIFICATION_INPROGRESS") }, { code: (0, _utils2.getBpaTextToLocalMapping)("APPROVAL_INPROGRESS") }, { code: (0, _utils2.getBpaTextToLocalMapping)("PENDING_APPL_FEE") }, { code: (0, _utils2.getBpaTextToLocalMapping)("PENDING_SANC_FEE_PAYMENT") }, { code: (0, _utils2.getBpaTextToLocalMapping)("CITIZEN_ACTION_PENDING_AT_DOC_VERIF") }, { code: (0, _utils2.getBpaTextToLocalMapping)("CITIZEN_ACTION_PENDING_AT_FI_VERIF") }, { code: (0, _utils2.getBpaTextToLocalMapping)("CITIZEN_ACTION_PENDING_AT_NOC_VERIF") }],
                        props: {
                            style: { marginLeft: "20px" }
                        },
                        visible: false,
                        gridDefination: {
                            xs: 12,
                            sm: 3
                        }
                    }), {
                        afterFieldChange: function afterFieldChange(action, state, dispatch) {
                            fieldChange(action, state, dispatch);
                        }
                    }),
                    clearBtn: {
                        componentPath: "Button",
                        gridDefination: {
                            xs: 12,
                            sm: 3
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
                        visible: false,
                        children: {
                            buttonLabel: (0, _utils.getLabel)({
                                labelName: "Clear Filter",
                                labelKey: "Clear Filter"
                            })
                        },
                        onClickDefination: {
                            action: "condition"
                        }
                    }
                }),
                applicationsCard: {
                    uiFramework: "custom-molecules",
                    name: "my-applications-stakeholder",
                    componentPath: "Table",
                    props: {
                        columns: [{
                            name: "Application No", labelKey: "EDCR_COMMON_TABLE_APPL_NO"
                        }, {
                            name: "Building Plan Scrutiny No", labelKey: "EDCR_COMMON_TABLE_SCRUTINY_NO"
                        }, {
                            name: "City", labelKey: "EDCR_COMMON_TABLE_CITY_LABEL"
                        }, {
                            name: "Applicant Name", labelKey: "EDCR_COMMON_TABLE_APPL_NAME"
                        }, {
                            name: "Status", labelKey: "EDCR_COMMON_TABLE_COL_STATUS"
                        }, {
                            name: "Download Scrutiny Number", labelKey: "EDCR_DOWNLOAD_REPORT"
                        }, {
                            name: "Building Plan Download", labelKey: "EDCR_DOWNLOAD_BUILDING_PLAN"
                        }, {
                            name: "tenantId",
                            labelKey: "tenantId",
                            options: {
                                display: false
                            }
                        }, {
                            name: "serviceType",
                            labelKey: "serviceType",
                            options: {
                                display: false
                            }
                        }, {
                            name: "type",
                            labelKey: "type",
                            options: {
                                display: false
                            }
                        }],
                        title: {
                            labelName: "Search Results for eDCR Applications",
                            labelKey: "BPA_EDCR_SEARCH_RESULTS_FOR_APP"
                        },
                        rows: "",
                        options: {
                            filter: false,
                            download: false,
                            responsive: "stacked",
                            selectableRows: false,
                            hover: true,
                            data: [],
                            rowsPerPageOptions: [10, 15, 20],
                            onCellClick: function onCellClick(row, index) {
                                _onCellClick(row, index);
                            }
                        },
                        customSortColumn: {
                            column: "Application Date",
                            sortingFn: function sortingFn(data, i, sortDateOrder) {
                                var epochDates = data.reduce(function (acc, curr) {
                                    acc.push([].concat((0, _toConsumableArray3.default)(curr), [(0, _utils2.getEpochForDate)(curr[4], "dayend")]));
                                    return acc;
                                }, []);
                                var order = sortDateOrder === "asc" ? true : false;
                                var finalData = (0, _utils2.sortByEpoch)(epochDates, !order).map(function (item) {
                                    item.pop();
                                    return item;
                                });
                                return { data: finalData, currentOrder: !order ? "asc" : "desc" };
                            }
                        }
                    }
                }
            }
        }
    }
};

var _onCellClick = function _onCellClick(row, index) {
    var state = _store2.default.getState();
    var cellData = (0, _get2.default)(state.screenConfiguration, "screenConfig.my-applications-stakeholder.components.div.children.applicationsCard.props.data", []);
    if (cellData[index.rowIndex].EDCR_DOWNLOAD_REPORT == row) {
        window.open(cellData[index.rowIndex].EDCR_DOWNLOAD_REPORT1);
    }
    if (cellData[index.rowIndex].EDCR_DOWNLOAD_BUILDING_PLAN == row) {
        window.open(cellData[index.rowIndex].EDCR_DOWNLOAD_BUILDING_PLAN1);
    }
};

exports.default = screenConfig;