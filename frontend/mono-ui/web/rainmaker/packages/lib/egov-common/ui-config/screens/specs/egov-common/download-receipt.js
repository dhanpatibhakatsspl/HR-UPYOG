"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _lodash = require("lodash");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _pay = require("./pay");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getReceiptData = function getReceiptData(receiptNo) {

    return (0, _utils.getCommonContainer)({
        h1: (0, _utils.getCommonContainer)({
            header: (0, _utils.getCommonTitle)({
                labelName: "Payment ", //later use getFinancialYearDates
                labelKey: "DOWNLOAD_RECEIPT_HEADER"
            })
        }),
        h2: (0, _utils.getCommonContainer)({
            consumerCode: {
                uiFramework: "custom-atoms-local",
                moduleName: "egov-common",
                componentPath: "OthersContainer",
                props: {
                    number: receiptNo,
                    label: {
                        labelKey: "RECEIPT_NO_HEADER"
                    }
                }
            } })
    });
};

var loadMdms = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch, consumerCode, tenantId, businessService, receiptNumber) {
        var commonPayDetails, index, details, uiCommonPayConfig, receiptKey, receiptQueryString;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils2.getBusinessServiceMdmsData)(dispatch, tenantId);

                    case 2:
                        //commonPay configuration 
                        commonPayDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.businessServiceMdmsData.common-masters.uiCommonPay");
                        index = commonPayDetails && commonPayDetails.findIndex(function (item) {
                            return item.code == businessService;
                        });

                        if (index > -1) {
                            dispatch((0, _actions.prepareFinalObject)("commonPayInfo", commonPayDetails[index]));
                        } else {
                            details = commonPayDetails && commonPayDetails.filter(function (item) {
                                return item.code === "DEFAULT";
                            });

                            dispatch((0, _actions.prepareFinalObject)("commonPayInfo", details));
                        }

                        uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
                        receiptKey = (0, _get2.default)(uiCommonPayConfig, "receiptKey", "consolidatedreceipt");
                        _context.next = 9;
                        return (0, _utils2.getBusinessServiceMdmsData)(dispatch, tenantId);

                    case 9:
                        receiptQueryString = [{ key: "receiptNumbers", value: receiptNumber }, { key: "tenantId", value: tenantId }, { key: "businessService", value: businessService }];

                        (0, _commons2.download)(receiptQueryString, localStorage.getItem('receipt-channel') == 'whatsapp' ? "download" : "open", receiptKey, "PAYMENT", state, true);

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function loadMdms(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
        return _ref.apply(this, arguments);
    };
}();
var screenConfig = {
    uiFramework: "material-ui",
    name: "download-receipt",
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
                className: "common-div-css"
            },
            children: {}
        }

    },
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        var status = (0, _commons.getQueryArg)(window.location.href, "status");
        var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
        var receiptNumber = (0, _commons.getQueryArg)(window.location.href, "receiptNumber");
        var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
        var businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
        loadMdms(action, state, dispatch, consumerCode, tenantId, businessService, receiptNumber);
        var data = (0, _pay.getHeader)(state);
        (0, _lodash.set)(action, "screenConfig.components.div.children", { data: data, paymentDetails: (0, _utils.getCommonCard)({
                head: getReceiptData(receiptNumber)
            }) });
        var channel = (0, _commons.getQueryArg)(window.location.href, "channel");
        var redirectNumber = (0, _commons.getQueryArg)(window.location.href, "redirectNumber");
        if (channel) {
            localStorage.setItem('receipt-channel', channel);
            redirectNumber = !redirectNumber.includes('+91') && redirectNumber.length == 10 ? "+91" + redirectNumber : redirectNumber;
            localStorage.setItem('receipt-redirectNumber', redirectNumber);
        } else {
            localStorage.setItem('receipt-channel', "");
            localStorage.setItem('receipt-redirectNumber', '');
        }
        return action;
    }
};

exports.default = screenConfig;

// egov-common/download-receipt?status=success&consumerCode=PB-TL-2020-05-18-006218&tenantId=pb.amritsar&receiptNumber=TEST/107/2020-21/064499&businessService=TL