"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paymentFailureFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var getCommonApplyFooter = function getCommonApplyFooter(children) {
    return {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
            className: "apply-wizard-footer"
        },
        children: children
    };
};

var paymentFailureFooter = exports.paymentFailureFooter = function paymentFailureFooter(consumerCode, tenant, businessService) {
    var redirectionURL = (0, _commons.isPublicSearch)() ? "/withoutAuth/egov-common/pay" : "/egov-common/pay";
    var path = redirectionURL + "?consumerCode=" + consumerCode + "&tenantId=" + tenant + "&businessService=" + businessService;
    var redirectNumber = localStorage.getItem('pay-redirectNumber');
    var channel = localStorage.getItem('pay-channel');
    if (channel && redirectNumber) {
        path = path + "&channel=" + channel + "&redirectNumber=" + redirectNumber;
    }
    return getCommonApplyFooter({
        gotoHome: {
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
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
            }
        }
    });
};