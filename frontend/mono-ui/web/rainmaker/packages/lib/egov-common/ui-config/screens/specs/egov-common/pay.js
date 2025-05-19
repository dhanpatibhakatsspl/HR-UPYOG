"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHeader = undefined;

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

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _utils2 = require("../utils");

require("./pay.css");

var _amountToBePaid = require("./payResource/amount-to-be-paid");

var _amountToBePaid2 = _interopRequireDefault(_amountToBePaid);

var _arrearsDetails = require("./payResource/arrears-details");

var _arrearsDetails2 = _interopRequireDefault(_arrearsDetails);

var _capturePayerDetails = require("./payResource/capture-payer-details");

var _capturePayerDetails2 = _interopRequireDefault(_capturePayerDetails);

var _capturePaymentDetails = require("./payResource/capture-payment-details");

var _capturePaymentDetails2 = _interopRequireDefault(_capturePaymentDetails);

var _constants = require("./payResource/constants");

var _estimateDetails = require("./payResource/estimate-details");

var _estimateDetails2 = _interopRequireDefault(_estimateDetails);

var _footer = require("./payResource/footer");

var _g8Details = require("./payResource/g8-details");

var _g8Details2 = _interopRequireDefault(_g8Details);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = exports.getHeader = function getHeader(state) {
    var uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
    var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
    var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
    var label = (0, _get2.default)(uiCommonPayConfig, "headerBandLabel");
    return (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
            labelName: "Payment (" + (0, _utils2.getCurrentFinancialYear)() + ")", //later use getFinancialYearDates
            labelKey: "COMMON_PAY_SCREEN_HEADER"
        }),
        consumerCode: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-common",
            componentPath: "ApplicationNoContainer",
            props: {
                number: consumerCode,
                label: {
                    labelKey: label ? label : "PAYMENT_COMMON_CONSUMER_CODE"
                }
            }
        }
    });
};

var fetchBill = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, consumerCode, tenantId, billBusinessService) {
        var payload, totalAmount, businessService, businessServiceArray, commonPayDetails, index, details, header, isPartialPaymentAllowed, componentJsonpath, isAdvancePaymentAllowed, buttonJsonpath, consumeCodeComponentPath, consumerCodeFromResponse, raidButtonComponentPath, payerName, paidBy, payerNumber, _componentJsonpath;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils2.getBusinessServiceMdmsData)(dispatch, tenantId);

                    case 2:
                        _context.next = 4;
                        return (0, _utils2.generateBill)(dispatch, consumerCode, tenantId, billBusinessService);

                    case 4:
                        payload = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails[0]");
                        totalAmount = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0]");

                        //Collection Type Added in CS v1.1

                        payload && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].collectionType", "COUNTER"));
                        businessService = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].businessService");
                        businessServiceArray = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.businessServiceMdmsData.BillingService.BusinessService");

                        businessServiceArray && businessServiceArray.map(function (item) {
                            if (item.code == businessService) {
                                dispatch((0, _actions.prepareFinalObject)("businessServiceInfo", item));
                            }
                        });

                        //commonPay configuration 
                        commonPayDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.businessServiceMdmsData.common-masters.uiCommonPay");
                        index = commonPayDetails && commonPayDetails.findIndex(function (item) {
                            return item.code == businessService;
                        });

                        if (index > -1) {
                            dispatch((0, _actions.prepareFinalObject)("commonPayInfo", commonPayDetails[index]));
                            dispatch((0, _actions.prepareFinalObject)("isArrears", (0, _get2.default)(commonPayDetails[index], "arrears", true)));
                        } else {
                            details = commonPayDetails && commonPayDetails.filter(function (item) {
                                return item.code === "DEFAULT";
                            });

                            dispatch((0, _actions.prepareFinalObject)("commonPayInfo", details));
                            dispatch((0, _actions.prepareFinalObject)("isArrears", (0, _get2.default)(details && details[0], "arrears", true)));
                        }

                        if ((0, _get2.default)(commonPayDetails[index], "arrears", true)) {
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.arrearsCard", "visible", true));
                        } else {
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.arrearsCard", "visible", false));
                        }
                        header = getHeader(state);

                        (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header", header);

                        isPartialPaymentAllowed = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.partPaymentAllowed");

                        if (isPartialPaymentAllowed) {
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.AmountToBePaid", "visible", true));
                        }
                        if ((0, _get2.default)(payload, "amount") != undefined) {
                            //set amount paid as total amount from bill - destination changed in CS v1.1
                            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid", payload.amount));
                            //set total amount in instrument
                            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.amount", payload.amount));
                        }

                        if ((0, _get2.default)(totalAmount, "totalAmount") != undefined) {
                            componentJsonpath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.AmountToBePaid.children.cardContent.children.amountDetailsCardContainer.children.displayAmount";

                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", componentJsonpath, "props.value", totalAmount.totalAmount));
                            isAdvancePaymentAllowed = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.isAdvanceAllowed");

                            if ((totalAmount.totalAmount === 0 || totalAmount.totalAmount <= 100) && !isAdvancePaymentAllowed) {
                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", _constants.radioButtonJsonPath, "props.buttons[1].disabled", true));
                            }
                        }

                        if ((0, _get2.default)(totalAmount, "totalAmount") === undefined) {
                            buttonJsonpath = _constants.paybuttonJsonpath + ("" + (process.env.REACT_APP_NAME === "Citizen" ? "makePayment" : "generateReceipt"));

                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", buttonJsonpath, "props.disabled", true));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", _constants.radioButtonJsonPath, "props.buttons[1].disabled", true));
                        }

                        consumeCodeComponentPath = 'components.div.children.headerDiv.children.header.children.consumerCode';
                        consumerCodeFromResponse = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].consumerCode");
                        ;
                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", consumeCodeComponentPath, "props.number", consumerCodeFromResponse));

                        raidButtonComponentPath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.AmountToBePaid.children.cardContent.children.amountDetailsCardContainer.children.AmountToPaidButton";

                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", raidButtonComponentPath, "props.value", "full_amount"));

                        /* To disable the payer name and mobile number incase the user is not owner 
                            and autofill the owner or paidby others deatils in case of payment through whatsapp */

                        payerName = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].payerName");
                        paidBy = "COMMON_OWNER";
                        payerNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].mobileNumber");

                        if (process.env.REACT_APP_NAME === "Citizen" && (0, _commons.getQueryArg)(window.location.href, "mobileNumber") && (0, _commons.getQueryArg)(window.location.href, "name")) {
                            if (payerNumber != (0, _commons.getQueryArg)(window.location.href, "mobileNumber")) {
                                payerName = (0, _commons.getQueryArg)(window.location.href, "name");
                                paidBy = "COMMON_OTHER";
                                payerNumber = (0, _commons.getQueryArg)(window.location.href, "mobileNumber");
                            }
                        }
                        if (paidBy != "COMMON_OTHER") {
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePayerDetails.children.cardContent.children.payerDetailsCardContainer.children.payerName", "props.disabled", true));
                            dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePayerDetails.children.cardContent.children.payerDetailsCardContainer.children.payerMobileNo", "props.disabled", true));
                        }
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].payer", paidBy));
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].paidBy", payerName));
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].payerMobileNumber", payerNumber));
                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[0].tabContent.cash.children.payeeDetails.children.payerName", "props.value", payerName));
                        dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[0].tabContent.cash.children.payeeDetails.children.payerMobileNo", "props.value", payerNumber));

                        //Initially select instrument type as Cash
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.instrumentType.name", "Cash"));

                        //set tenantId
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].tenantId", tenantId));

                        //set tenantId in instrument
                        dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.tenantId", tenantId));

                        // Handling Negative amount
                        if ((0, _get2.default)(totalAmount, "totalAmount") != undefined) {
                            _componentJsonpath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.AmountToBePaid.children.cardContent.children.amountDetailsCardContainer.children.displayAmount";

                            if (totalAmount.totalAmount < 0) {
                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", _constants.radioButtonJsonPath, "props.buttons[0].disabled", true));
                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", _componentJsonpath, "props.value", 0));
                                dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", raidButtonComponentPath, "props.value", "partial_amount"));
                            }
                        }

                    case 41:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function fetchBill(_x, _x2, _x3, _x4, _x5, _x6) {
        return _ref.apply(this, arguments);
    };
}();

var screenConfig = {
    uiFramework: "material-ui",
    name: "pay",
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        dispatch((0, _actions.unMountScreen)("acknowledgement"));
        var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
        var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
        var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
        fetchBill(action, state, dispatch, consumerCode, tenantId, businessService);
        localStorage.setItem('pay-businessService', businessService);
        var channel = (0, _commons.getQueryArg)(window.location.href, "channel");
        var redirectNumber = (0, _commons.getQueryArg)(window.location.href, "redirectNumber");
        if (channel) {
            localStorage.setItem('pay-channel', channel);
            redirectNumber = !redirectNumber.includes('+91') && redirectNumber.length == 10 ? "+91" + redirectNumber : redirectNumber;
            localStorage.setItem('pay-redirectNumber', redirectNumber);
        } else {
            localStorage.setItem('pay-channel', "");
            localStorage.setItem('pay-redirectNumber', '');
        }
        // fetchBill(action,state, dispatch, consumerCode, tenantId, businessService).then(
        //     response => {
        //         let header = getHeader(state);
        //         set(action, "screenConfig.components.div.children.headerDiv.children.header" ,header) 
        //     }
        // );
        // const data = getPaymentCard(state);    
        // set(action, "screenConfig.components.div.children.formwizardFirstStep", data);
        return action;
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "pay"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    children: {
                        // header : {}
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
                            arrearsCard: (0, _extends3.default)({}, _arrearsDetails2.default, {
                                visible: false
                            }),
                            AmountToBePaid: (0, _extends3.default)({}, _amountToBePaid2.default, {
                                visible: false
                            }),
                            capturePaymentDetails: process.env.REACT_APP_NAME === "Citizen" ? {} : _capturePaymentDetails2.default,
                            capturePayerDetails: process.env.REACT_APP_NAME === "Citizen" ? _capturePayerDetails2.default : {},
                            g8Details: process.env.REACT_APP_NAME === "Citizen" ? {} : _g8Details2.default
                        })
                    }
                },
                footer: _footer.footer
            }
        }
    }
};

exports.default = screenConfig;