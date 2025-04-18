"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paymentFooter = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

require("./acknowledgementUtils.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHomeButtonPath = function getHomeButtonPath(item) {
    var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
    var url = "/withoutAuth/pt-mutation/public-search";
    if (consumerCode.includes("WS") || consumerCode.includes("SW")) {
        url = "/withoutAuth/wns/public-search";
    }
    return (0, _commons.isPublicSearch)() ? url : (0, _utils2.ifUserRoleExists)("CITIZEN") ? (0, _get2.default)(item, "citizenUrl", "/") : (0, _get2.default)(item, "employeeUrl", "/inbox");
};

var getCommonApplyFooter = function getCommonApplyFooter(children) {
    return {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
            className: "apply-wizard-footer common-footer-mobile"
        },
        children: children
    };
};

var defaultValues = {
    "code": "DEFAULT",
    "headerBandLabel": "PAYMENT_COMMON_CONSUMER_CODE",
    "receiptKey": "consolidatedreceipt",
    "billKey": "consolidatedbill",
    "buttons": [{
        "label": "COMMON_BUTTON_HOME",
        "citizenUrl": "/",
        "employeeUrl": "/inbox"
    }]
};

var paymentFooter = exports.paymentFooter = function paymentFooter(state, consumerCode, tenant, status, businessService) {

    var uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo", defaultValues);
    var buttons = (0, _get2.default)(uiCommonPayConfig, "buttons");
    var redirectionURL = (0, _commons.isPublicSearch)() ? "/withoutAuth/egov-common/pay" : "/egov-common/pay";
    var path = redirectionURL + "?consumerCode=" + consumerCode + "&tenantId=" + tenant + "&businessService=" + businessService;

    // gotoHome: {
    //     componentPath: "Button",
    //     props: {
    //         variant: "contained",
    //         color: "primary",
    //         className:"common-footer-mobile",
    //         style: {
    //             minWidth: "200px",
    //             height: "48px",
    //             marginRight: "16px",
    //             marginLeft: "40px"
    //         }
    //     },
    //     children: {
    //         downloadReceiptButtonLabel: getLabel({
    //             labelKey : label
    //         //    ...footer.label,
    //             //  labelName: get(footer,"label.labelName","GO TO HOME"),
    //             //  labelKey: get(footer,"label.labelKey","GO_TO_HOME")
    //         })
    //     },
    //     onClickDefination: {
    //         action: "page_change",
    //         path: get(footer,"link", `/inbox`)
    //     },
    // },


    var footer = buttons && buttons.map(function (item, index) {
        return {
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
                className: "common-footer-mobile",
                style: {
                    minWidth: "200px",
                    height: "48px",
                    marginRight: "16px",
                    marginLeft: "40px"
                }
            },
            children: {
                downloadReceiptButtonLabel: (0, _utils.getLabel)({
                    labelKey: (0, _get2.default)(item, "label", "GO_TO_HOME")
                })
            },
            onClickDefination: {
                action: "page_change",
                path: getHomeButtonPath(item)
            }
        };
    });
    return getCommonApplyFooter((0, _extends3.default)({}, footer, {
        retryButton: {
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
                className: "common-footer-mobile",
                style: {
                    minWidth: "200px",
                    height: "48px",
                    marginRight: "16px",
                    marginLeft: "40px"
                }
            },
            children: {
                downloadReceiptButtonLabel: (0, _utils.getLabel)({
                    labelName: "RETRY",
                    labelKey: "COMMON_RETRY"
                })
            },
            onClickDefination: {
                action: "page_change",
                path: path
            },
            visible: status === "failure" ? true : false
        }
    }));
};