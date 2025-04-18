"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applicationSuccessFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _commons = require("../../../../../ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = function getCommonApplyFooter(children) {
    return {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
            className: "apply-wizard-footer footer-com-style"
        },
        children: children
    };
};

var applicationSuccessFooter = exports.applicationSuccessFooter = function applicationSuccessFooter(state, dispatch, applicationNumber, tenant, consumerCode) {
    var roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");
    var redirectionURL = roleExists ? "/" : "/inbox";
    var uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
    var receiptKey = (0, _get2.default)(uiCommonPayConfig, "receiptKey");
    return getCommonApplyFooter({

        downloadFormButton: {
            componentPath: "Button",
            props: {
                variant: "outlined",
                color: "primary",
                className: "common-footer",
                style: {
                    minWidth: "180px",
                    height: "48px",
                    marginRight: "16px"
                }
            },
            children: {
                downloadFormButtonLabel: (0, _utils.getLabel)({
                    labelName: "DOWNLOAD RECEIPT",
                    labelKey: "COMMON_DOWNLOAD_RECEIPT"
                })
            },
            onClickDefination: {
                action: "condition",
                callBack: function callBack() {
                    var receiptQueryString = [{ key: "receiptNumbers", value: applicationNumber }, { key: "tenantId", value: tenant }];
                    (0, _commons.download)(receiptQueryString, "download", receiptKey);
                }
            }
        },
        printFormButton: {
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
                // className: "apply-wizard-footer-right-button",
                className: "common-footer",
                style: {
                    minWidth: "180px",
                    height: "48px",
                    marginRight: "16px"
                }
                // disabled: true
            },
            children: {
                printFormButtonLabel: (0, _utils.getLabel)({
                    labelName: "PRINT RECEIPT",
                    labelKey: "COMMON_PRINT_RECEIPT"
                })
            },
            onClickDefination: {
                action: "condition",
                callBack: function callBack() {
                    var receiptQueryString = [{ key: "receiptNumbers", value: applicationNumber }, { key: "tenantId", value: tenant }];
                    (0, _commons.download)(receiptQueryString, "print", receiptKey);
                }
            }
        }
    });
};