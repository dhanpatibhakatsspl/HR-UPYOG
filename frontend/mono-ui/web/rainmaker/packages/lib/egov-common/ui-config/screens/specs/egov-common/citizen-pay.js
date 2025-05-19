"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../ui-utils/commons");

var _amountToBePaid = require("./payResource/amount-to-be-paid");

var _amountToBePaid2 = _interopRequireDefault(_amountToBePaid);

var _utils2 = require("../utils");

var _estimateDetails = require("./payResource/estimate-details");

var _estimateDetails2 = _interopRequireDefault(_estimateDetails);

var _footer = require("./payResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
        labelName: "Payment (" + (0, _utils2.getCurrentFinancialYear)() + ")", //later use getFinancialYearDates
        labelKey: "COMMON_PAY_SCREEN_HEADER"
    }),
    consumerCode: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-common",
        componentPath: "ApplicationNoContainer",
        props: {
            number: (0, _commons.getQueryArg)(window.location.href, "consumerCode"),
            label: "Consumer Code.:"
        }
    }
});

var fetchBill = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, consumerCode, tenantId, businessService) {
        var payload, componentJsonpath;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils2.generateBill)(dispatch, consumerCode, tenantId, businessService);

                    case 2:
                        payload = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails[0]");

                        //Collection Type Added in CS v1.1

                        payload && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].collectionType", "COUNTER"));

                        if ((0, _get2.default)(payload, "amount") != undefined) {
                            //set amount paid as total amount from bill - destination changed in CS v1.1
                            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid", payload.amount));
                            //set total amount in instrument
                            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.amount", payload.amount));
                            componentJsonpath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.AmountToBePaid.children.cardContent.children.amountDetailsCardContainer.children.displayAmount";

                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("citizen-pay", componentJsonpath, "props.value", payload.amount));
                        }

                        //Initially select instrument type as Cash
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.instrumentType.name", "Cash"));

                        //set tenantId
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].tenantId", tenantId));

                        //set tenantId in instrument
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.tenantId", tenantId));

                    case 8:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function fetchBill(_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
    };
}();

var screenConfig = {
    uiFramework: "material-ui",
    name: "citizen-pay",
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
        var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
        var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
        fetchBill(state, dispatch, consumerCode, tenantId, businessService);
        return action;
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "citizen-pay"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    children: {
                        header: (0, _extends3.default)({
                            gridDefination: {
                                xs: 12,
                                sm: 10
                            }
                        }, header)
                    }
                },
                formwizardFirstStep: {
                    uiFramework: "custom-atoms",
                    componentPath: "Div",
                    children: {
                        paymentDetails: (0, _utils.getCommonCard)({
                            header: (0, _utils.getCommonTitle)({
                                labelName: "Payment Collection Details",
                                labelKey: "NOC_PAYMENT_HEAD"
                            }),
                            estimateDetails: _estimateDetails2.default,
                            AmountToBePaid: _amountToBePaid2.default
                        })
                    }
                },
                footer: _footer.footer
            }
        }
    }
};

exports.default = screenConfig;