"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.meterReadingEditable = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

var _commons = require("../../../../../ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveData = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
        var data, selectedDate, fromDate, toDate, endDate, _fromDate, _toDate, _endDate, lastReadingDate, isCurrentMeterValid, isDateValid, consumption, previousreading;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.metereading");

                        if (!(data === undefined || data === null || data === [])) {
                            _context.next = 4;
                            break;
                        }

                        dispatch((0, _actions.toggleSnackbar)(true, {
                            labelName: "Please fill valid fields to start search",
                            labelKey: "ERR_FILL_VALID_FIELDS"
                        }, "warning"));
                        return _context.abrupt("return");

                    case 4:

                        data.billingPeriod = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.billingPeriod");

                        // Validation for Billing Period

                        if (!(data.billingPeriod !== undefined)) {
                            _context.next = 15;
                            break;
                        }

                        if (!data.currentReadingDate) {
                            data.currentReadingDate = new Date().getTime();
                        }
                        selectedDate = new Date(new Date(data.currentReadingDate).toDateString());
                        fromDate = new Date(data.billingPeriod.split(' - ')[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
                        toDate = new Date(new Date().toDateString());

                        if (selectedDate > fromDate && selectedDate <= toDate) {
                            _context.next = 13;
                            break;
                        }

                        dispatch((0, _actions.toggleSnackbar)(true, {
                            labelName: "Reading date should not be less than from date and not be greater than to date",
                            labelKey: "ERR_CURRENT_READING_DATE_SHOULD_NOT_BE_LESS_THAN_FROM_DATE_AND_NOT_GREATER_THAN_TO_DATE"
                        }, "warning"));
                        return _context.abrupt("return");

                    case 13:
                        endDate = ("0" + selectedDate.getDate()).slice(-2) + '/' + ("0" + (selectedDate.getMonth() + 1)).slice(-2) + '/' + selectedDate.getFullYear();

                        data.billingPeriod = data.billingPeriod.split(' - ')[0] + " - " + endDate;

                    case 15:

                        if (!data.meterStatus) {
                            data.meterStatus = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.meterMdmsData.['ws-services-calculation'].MeterStatus[0].code");
                        }
                        data.connectionNo = (0, _commons2.getQueryArg)(window.location.href, "connectionNos");
                        data.lastReading = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.lastReading");
                        data.billingPeriod = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.billingPeriod");

                        // Validation for Billing Period

                        if (!(data.billingPeriod !== undefined)) {
                            _context.next = 29;
                            break;
                        }

                        if (!data.currentReadingDate) {
                            data.currentReadingDate = new Date().getTime();
                        }
                        selectedDate = new Date(new Date(data.currentReadingDate).toDateString());
                        _fromDate = new Date(data.billingPeriod.split(' - ')[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
                        _toDate = new Date(new Date().toDateString());

                        if (selectedDate > _fromDate && selectedDate <= _toDate) {
                            _context.next = 27;
                            break;
                        }

                        dispatch((0, _actions.toggleSnackbar)(true, {
                            labelName: "Reading date should not be less than from date and not be greater than to date",
                            labelKey: "ERR_CURRENT_READING_DATE_SHOULD_NOT_BE_LESS_THAN_FROM_DATE_AND_NOT_GREATER_THAN_TO_DATE"
                        }, "warning"));
                        return _context.abrupt("return");

                    case 27:
                        _endDate = ("0" + selectedDate.getDate()).slice(-2) + '/' + ("0" + (selectedDate.getMonth() + 1)).slice(-2) + '/' + selectedDate.getFullYear();

                        data.billingPeriod = data.billingPeriod.split(' - ')[0] + " - " + _endDate;

                    case 29:
                        lastReadingDate = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.consumptionDetails[0].lastReadingDate");

                        if (lastReadingDate !== undefined && lastReadingDate !== null && lastReadingDate !== '') {
                            data.lastReadingDate = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.consumptionDetails[0].currentReadingDate");
                        } else {
                            data.lastReadingDate = new Date().setMonth(new Date().getMonth() - 1);
                        }

                        if (!(data.meterStatus === 'Working')) {
                            _context.next = 41;
                            break;
                        }

                        isCurrentMeterValid = (0, _utils2.validateFields)("components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children", state, dispatch, "meter-reading");
                        isDateValid = (0, _utils2.validateFields)("components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children", state, dispatch, "meter-reading");

                        if (!(data.currentReading === undefined || data.currentReading === null || data.currentReading === '')) {
                            _context.next = 36;
                            break;
                        }

                        return _context.abrupt("return");

                    case 36:
                        if (!(data.currentReading < data.lastReading)) {
                            _context.next = 39;
                            break;
                        }

                        dispatch((0, _actions.toggleSnackbar)(true, {
                            labelName: "",
                            labelKey: "WS_CONSUMPTION_DETAILS_ERRO_MSG"
                        }, "warning"));
                        return _context.abrupt("return");

                    case 39:
                        _context.next = 47;
                        break;

                    case 41:
                        consumption = (0, _utils2.validateFields)("components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children", state, dispatch, "meter-reading");

                        if (!(data.consumption === undefined || data.currentReading === null || data.consumption === '')) {
                            _context.next = 44;
                            break;
                        }

                        return _context.abrupt("return");

                    case 44:
                        previousreading = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.lastReading");

                        data.currentReading = parseFloat(data.consumption) + previousreading;
                        data.currentReadingDate = new Date().getTime();

                    case 47:
                        (0, _set2.default)(data, "currentReadingDate", (0, _utils.convertDateToEpoch)(data.currentReadingDate, "dayend"));
                        data.currentReading = parseFloat(data.currentReading);
                        if (data.consumption) {
                            delete data.consumption;
                        }
                        data.tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
                        (0, _commons.createMeterReading)(dispatch, data);

                    case 52:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function saveData(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var meterReadingEditable = exports.meterReadingEditable = {
    uiFramework: "custom-atoms",
    moduleName: "egov-wns",
    componentPath: "Div",
    visible: false,
    props: {
        style: {
            margin: '7px'
        }
    },
    children: {
        card: (0, _utils.getCommonCard)({
            firstContainer: (0, _utils.getCommonContainer)({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'

                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelKey: "WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL"
                        })
                    }
                },
                billingCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelName: ""
                        })
                    }
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            secondContainer: (0, _utils.getCommonContainer)({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelKey: "WS_CONSUMPTION_DETAILS_METER_STATUS_LABEL"
                        })
                    }
                },
                status: (0, _extends3.default)({}, (0, _utils.getSelectField)({
                    placeholder: {
                        labelKey: "WS_SELECT_METER_STATUS_PLACEHOLDER"
                    },
                    localePrefix: {
                        moduleName: "ws-services-calculation",
                        masterName: "MeterStatus"
                    },
                    props: {
                        value: ""
                    },
                    sourceJsonPath: "meterMdmsData['ws-services-calculation'].MeterStatus",
                    jsonPath: "metereading.meterStatus",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    required: false,
                    errorMessage: "ERR_INVALID_BILLING_PERIOD"
                }), {
                    afterFieldChange: function () {
                        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
                            var status, todayDate;
                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.metereading.meterStatus");

                                            if (status !== 'Working') {
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props", "disabled", true));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props", "disabled", true));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont", "visible", false));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont", "visible", true));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont", "visible", true));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props", "value", ""));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props", "value", ""));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props", "labelName", ""));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont.props", "value", ""));
                                            } else {
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props", "disabled", false));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props", "disabled", false));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont", "visible", true));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont", "visible", false));
                                                todayDate = new Date();

                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props", "value", todayDate));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props", "value", ""));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont.props", "value", ""));
                                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props", "labelName", ""));
                                            }

                                        case 2:
                                        case "end":
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, undefined);
                        }));

                        return function afterFieldChange(_x3, _x4, _x5) {
                            return _ref2.apply(this, arguments);
                        };
                    }()
                }),

                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            thirdContainer: (0, _utils.getCommonContainer)({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_LABEL"
                        })
                    }
                },
                secCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelName: ""
                        })
                    }
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            lastReadingContainer: (0, _utils.getCommonContainer)({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_DATE_LABEL"
                        })
                    }
                },
                secCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelName: ""
                        })
                    }
                },
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            fourthContainer: (0, _utils.getCommonContainer)({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_LABEL"
                        })
                    }
                },
                currentReading: (0, _extends3.default)({}, (0, _utils.getTextField)({
                    placeholder: {
                        labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_PLACEHOLDER"
                    },
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    required: true,
                    pattern: /^[1-9]\d*(\.\d+)?$/i,
                    // errorMessage: "ERR_INVALID_CONSUMER_NO",
                    jsonPath: "metereading.currentReading"
                }), {
                    afterFieldChange: function () {
                        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
                            var lastReading, currentReading, consumption;
                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            lastReading = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.autoPopulatedValues.lastReading");
                                            currentReading = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.metereading.currentReading");
                                            consumption = void 0;

                                            if (lastReading === 0) {
                                                consumption = currentReading;
                                            } else {
                                                consumption = (currentReading - lastReading).toFixed(2);
                                            }
                                            if (currentReading == '' || consumption < 0) {
                                                consumption = '';
                                            }
                                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("meter-reading", "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props", "labelName", consumption));

                                        case 6:
                                        case "end":
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, undefined);
                        }));

                        return function afterFieldChange(_x6, _x7, _x8) {
                            return _ref3.apply(this, arguments);
                        };
                    }()
                }),
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            fifthContainer: (0, _utils.getCommonContainer)({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                        })
                    }
                },
                currentReadingDate: (0, _utils.getDateField)({
                    placeholder: {
                        labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                    },
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    required: true,
                    pattern: (0, _utils.getPattern)("Date"),
                    // errorMessage: "ERR_INVALID_CONSUMER_NO",
                    jsonPath: "metereading.currentReadingDate"
                }),
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),
            sixthContainer: (0, _utils.getCommonContainer)({
                firstCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.60)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelKey: "WS_CONSUMPTION_DETAILS_CONSUMPTION_LABEL"
                        })
                    }
                },
                secCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    visible: true,
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    props: {
                        style: {
                            fontSize: 14,
                            color: "rgba(0, 0, 0)",
                            marginTop: '20px'
                        }
                    },
                    children: {
                        billingPeriod: (0, _utils.getLabel)({
                            labelName: ""
                        })
                    }
                },
                thirdCont: (0, _utils.getTextField)({
                    placeholder: {
                        labelKey: "WS_CONSUMPTION_DETAILS_CONSUMPTION_READING_PLACEHOLDER"
                    },
                    gridDefination: {
                        xs: 6,
                        sm: 3
                    },
                    visible: false,
                    required: true,
                    pattern: /^[1-9]\d*(\.\d+)?$/i,
                    // errorMessage: "ERR_INVALID_CONSUMER_NO",
                    jsonPath: "metereading.consumption"
                }),
                lastCont: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    gridDefination: {
                        xs: 6,
                        sm: 7
                    }
                }

            }),

            button: (0, _utils.getCommonContainer)({

                buttonContainer: (0, _utils.getCommonContainer)({
                    firstCont: {
                        uiFramework: "custom-atoms",
                        componentPath: "Div",
                        gridDefination: {
                            xs: 3,
                            sm: 3
                        }
                    },
                    searchButton: {
                        componentPath: "Button",
                        gridDefination: {
                            xs: 6,
                            sm: 4,
                            align: "center"
                        },
                        props: {
                            variant: "outlined",
                            style: {
                                color: "#FE7A51",
                                borderColor: "#FE7A51",
                                width: "150px",
                                height: "40px",
                                margin: "15px 0px",
                                float: "left"
                            }
                        },
                        children: {
                            buttonLabel: (0, _utils.getLabel)({
                                labelKey: "WS_COMMON_BUTTON_SAVE"
                            })
                        },
                        onClickDefination: {
                            action: "condition",
                            callBack: saveData
                        }
                    },
                    lastCont: {
                        uiFramework: "custom-atoms",
                        componentPath: "Div",
                        gridDefination: {
                            xs: 6,
                            sm: 4
                        }
                    }
                })
            })
        })
    }

};