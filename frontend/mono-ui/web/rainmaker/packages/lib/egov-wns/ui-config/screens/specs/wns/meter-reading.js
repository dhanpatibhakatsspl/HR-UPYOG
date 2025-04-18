"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("../../../../ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _meterReadingEditable = require("./meterReading/meterReadingEditable");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _utils2 = require("../utils");

var _connectionDetails = require("./connection-details");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addMeterReading = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
        var tenantId, connectionNos, queryObject, payloadData, applicationNos, queryObj, isApplicationApproved;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        dispatch((0, _actions.toggleSpinner)());
                        tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
                        connectionNos = (0, _commons2.getQueryArg)(window.location.href, "connectionNos");
                        queryObject = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: connectionNos }];
                        _context.next = 6;
                        return (0, _commons.getSearchResults)(queryObject);

                    case 6:
                        payloadData = _context.sent;

                        if (!(payloadData !== null && payloadData !== undefined && payloadData.WaterConnection.length > 0)) {
                            _context.next = 27;
                            break;
                        }

                        payloadData.WaterConnection = (0, _connectionDetails.sortpayloadDataObj)(payloadData.WaterConnection);
                        applicationNos = getApplicationNo(payloadData.WaterConnection);
                        queryObj = [{ key: "businessIds", value: applicationNos }, { key: "tenantId", value: tenantId }];
                        _context.next = 13;
                        return (0, _commons.isWorkflowExists)(queryObj);

                    case 13:
                        isApplicationApproved = _context.sent;

                        if (isApplicationApproved) {
                            _context.next = 20;
                            break;
                        }

                        dispatch((0, _actions.toggleSpinner)());
                        dispatch((0, _actions.toggleSnackbar)(true, {
                            labelName: "WorkFlow already Initiated",
                            labelKey: "WS_WORKFLOW_ALREADY_INITIATED"
                        }, "error"));
                        return _context.abrupt("return");

                    case 20:
                        _context.next = 22;
                        return (0, _commons.getMdmsDataForAutopopulated)(dispatch);

                    case 22:
                        _context.next = 24;
                        return (0, _commons.getMdmsDataForMeterStatus)(dispatch);

                    case 24:
                        _context.next = 26;
                        return setAutopopulatedvalues(state, dispatch);

                    case 26:
                        showHideCard(true, dispatch);

                    case 27:
                        dispatch((0, _actions.toggleSpinner)());

                    case 28:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function addMeterReading(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var setAutopopulatedvalues = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
        var billingFrequency, consumptionDetails, date, status, checkBillingPeriod, lastReadingDate, lastDF, endDate, todayDate;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        billingFrequency = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.billingCycle");
                        consumptionDetails = {};
                        date = new Date();
                        status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.meterMdmsData.['ws-services-calculation'].MeterStatus[0].code");
                        _context2.next = 6;
                        return (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.consumptionDetails");

                    case 6:
                        checkBillingPeriod = _context2.sent;
                        _context2.prev = 7;
                        lastReadingDate = (0, _utils2.convertEpochToDate)(checkBillingPeriod[0].currentReadingDate);
                        lastDF = new Date();
                        endDate = ("0" + lastDF.getDate()).slice(-2) + '/' + ("0" + (lastDF.getMonth() + 1)).slice(-2) + '/' + lastDF.getFullYear();

                        consumptionDetails['billingPeriod'] = lastReadingDate + " - " + endDate;
                        consumptionDetails['lastReading'] = checkBillingPeriod[0].currentReading;
                        consumptionDetails['consumption'] = '';
                        consumptionDetails['lastReadingDate'] = lastReadingDate;
                        _context2.next = 21;
                        break;

                    case 17:
                        _context2.prev = 17;
                        _context2.t0 = _context2["catch"](7);

                        dispatch((0, _actions.toggleSnackbar)(true, {
                            labelName: "Failed to parse meter reading data.",
                            labelKey: "ERR_FAILED_TO_PARSE_METER_READING_DATA"
                        }, "warning"));
                        return _context2.abrupt("return");

                    case 21:

                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.firstContainer.children.billingCont.children.billingPeriod.props", "labelName", consumptionDetails.billingPeriod));
                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.thirdContainer.children.secCont.children.billingPeriod.props", "labelName", consumptionDetails.lastReading));
                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.lastReadingContainer.children.secCont.children.billingPeriod.props", "labelName", consumptionDetails.lastReadingDate));
                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props", "labelName", consumptionDetails.consumption));
                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.secondContainer.children.status.props", "value", status));
                        todayDate = new Date();

                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props", "value", todayDate));
                        dispatch((0, _actions.prepareFinalObject)("autoPopulatedValues", consumptionDetails));

                    case 29:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[7, 17]]);
    }));

    return function setAutopopulatedvalues(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var showHideCard = function showHideCard(booleanHideOrShow, dispatch) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable", "visible", booleanHideOrShow));
};
var header = (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
        labelKey: "WS_CONSUMPTION_DETAILS_HEADER"
    }),
    applicationNumber: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-wns",
        componentPath: "ConsumerNoContainer",
        props: {
            number: (0, _commons2.getQueryArg)(window.location.href, "connectionNos")
        }
    },
    classes: {
        root: "common-header-cont"
    }

});

var screenConfig = {
    uiFramework: "material-ui",
    name: "meter-reading",
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        (0, _commons.getMeterReadingData)(dispatch);
        (0, _set2.default)(action, "screenConfig.components.div.children.header.children.applicationNumber.props.number", (0, _commons2.getQueryArg)(window.location.href, "connectionNos"));
        return action;
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "meter-reading"
            },
            children: {
                header: header,
                newApplicationButton: {
                    componentPath: "Button",
                    gridDefination: {
                        xs: 12,
                        sm: 12,
                        align: "right"
                    },
                    visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
                    props: {
                        variant: "contained",
                        color: "primary",
                        style: {
                            color: "white",
                            borderRadius: "2px",
                            width: "250px",
                            height: "48px",
                            margin: '9px'
                        }
                    },
                    children: {
                        // plusIconInsideButton: {
                        //     uiFramework: "custom-atoms",
                        //     componentPath: "Icon",
                        //     props: {
                        //         iconName: "add",
                        //         style: {
                        //             fontSize: "24px"
                        //         }
                        //     }
                        // },
                        buttonLabel: (0, _utils.getLabel)({
                            labelName: "ADD METER READING",
                            labelKey: "WS_CONSUMPTION_DETAILS_BUTTON_METER_READING"
                        })
                    },
                    onClickDefination: {
                        action: "condition",
                        callBack: addMeterReading
                    }
                },
                meterReadingEditable: _meterReadingEditable.meterReadingEditable,
                viewTwo: {
                    uiFramework: "custom-molecules-local",
                    moduleName: "egov-wns",
                    componentPath: "MeterReading"
                }
                // applicationsCard: {
                //     uiFramework: "custom-molecules-local",
                //     moduleName: "egov-wns",
                //     componentPath: "MeterReading"
                // },
            }
        }
    }
};

var demo = (0, _utils.getCommonCard)({
    subHeader: (0, _utils.getCommonTitle)({
        labelName: "Search Employee",
        labelKey: "HR_HOME_SEARCH_RESULTS_HEADING"
    })
});

var getApplicationNo = function getApplicationNo(connectionsObj) {
    var appNos = "";
    if (connectionsObj.length > 1) {
        for (var i = 0; i < connectionsObj.length; i++) {
            appNos += connectionsObj[i].applicationNo + ",";
        }
        appNos = appNos.slice(0, -1);
    } else {
        appNos = connectionsObj[0].applicationNo;
    }
    return appNos;
};

exports.default = screenConfig;