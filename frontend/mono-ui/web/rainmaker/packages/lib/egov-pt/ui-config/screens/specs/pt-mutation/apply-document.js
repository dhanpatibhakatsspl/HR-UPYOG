"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-kit/redux/app/actions");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _footer = require("./requiredDocuments/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
    labelName: "Property Tax",
    labelKey: "PT_MUTATION_TRANSFER_HEADER"
});
var screenConfig = {
    uiFramework: "material-ui",
    name: "apply-document",

    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        var consumerCode = (0, _commons.getQueryArg)(window.location.href, "consumerCode");
        var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
        var redirectUrl = (0, _formUtils.getPropertyInfoScreenUrl)(consumerCode, tenantId);
        var mutationDocumentUIChildren = {};
        mutationDocumentUIChildren = (0, _get2.default)(state, 'screenConfiguration.preparedFinalObject.mutationDocumentUIChildren', null);
        if (!mutationDocumentUIChildren) {
            mutationDocumentUIChildren = {};
            dispatch((0, _actions.setRoute)(redirectUrl));
        }
        (0, _set2.default)(mutationDocumentUIChildren, 'children.footer.children.footer.children.applyButton.onClickDefination', {
            action: "condition",
            callBack: _footer.startMutationApplyFlow
        });
        (0, _set2.default)(mutationDocumentUIChildren, 'children.header.children.header.children.key.props.labelKey', 'PTM_REQ_DOCS_HEADER');
        (0, _set2.default)(mutationDocumentUIChildren, 'children.footer.children.footer.children.applyButton.children.applyButtonLabel.props.labelKey', 'PTM_COMMON_BUTTON_APPLY');
        (0, _set2.default)(action, "screenConfig.components.adhocDialog.children.popup", mutationDocumentUIChildren);

        (0, _set2.default)(action, "screenConfig.components.adhocDialog.props.redirectUrl", redirectUrl);
        return action;
    },

    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "search"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",

                    children: {
                        header: (0, _extends3.default)({
                            gridDefination: {
                                xs: 12,
                                sm: 6
                            }
                        }, header)
                    }
                }
            }
        },
        adhocDialog: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-pt",
            componentPath: "DialogContainer",
            props: {
                open: true,
                maxWidth: false,
                screenKey: "apply-document"
            },
            children: {
                popup: {}
            }
        }
    }
};

exports.default = screenConfig;