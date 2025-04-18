"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFeesEstimateCard = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _documentReview = require("../document-review");

var _footer = require("../applyResource/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFeesEstimateCard = function getFeesEstimateCard(props) {
    var sourceJsonPath = props.sourceJsonPath,
        rest = (0, _objectWithoutProperties3.default)(props, ["sourceJsonPath"]);

    return {
        uiFramework: "custom-containers-local",
        moduleName: "egov-billamend",
        componentPath: "EstimateCardContainer",
        props: {
            sourceJsonPath: "AmendmentTemp[0].estimateCardData"
        }
    };
};
exports.getFeesEstimateCard = getFeesEstimateCard;
var getHeader = function getHeader(label) {
    return {
        uiFramework: "custom-molecules-local",
        moduleName: "egov-billamend",
        componentPath: "DividerWithLabel",
        props: {
            className: "hr-generic-divider-label",
            labelProps: {},
            dividerProps: {},
            label: label
        },
        type: "array"
    };
};

var headerrow = (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
        labelName: "Generate Note",
        labelKey: "BILL_GENERATE_NOTE"
    }),
    applicationNumber: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-billamend",
        componentPath: "ConsumerNo",
        props: {
            number: "WS-2018-PB-246464",
            label: { labelValue: "Consumer No.", labelKey: "BILL_CONSUMER_NO" }
        }
    }
});

var summary = (0, _utils.getCommonCard)({
    title: (0, _utils.getCommonTitle)({ labelName: "Summary", labelKey: "BILL_SUMMARY" }),
    grayDiv: (0, _utils.getCommonGrayCard)({
        headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            children: {
                header: (0, _extends3.default)({
                    gridDefination: {
                        xs: 12,
                        sm: 10
                    }
                }, (0, _utils.getCommonSubHeader)({
                    labelName: "Amount Details",
                    labelKey: "BILL_AMOUNT_DETAILS"
                })),
                editSection: {
                    componentPath: "Button",
                    props: {
                        color: "primary"
                    },
                    gridDefination: {
                        xs: 12,
                        sm: 2,
                        align: "right"
                    },
                    visible: true,
                    children: {
                        editIcon: {
                            uiFramework: "custom-atoms",
                            componentPath: "Icon",
                            props: {
                                iconName: "edit"
                            }
                        },
                        buttonLabel: (0, _utils.getLabel)({
                            labelName: "Edit",
                            labelKey: "BILL_SUMMARY_EDIT"
                        })
                    },
                    onClickDefination: {
                        action: "condition",
                        callBack: function callBack(state, dispatch) {
                            (0, _footer.changeStep)(state, dispatch, "", 0);
                        }
                    }
                }

            }
        },
        subtitle: getHeader({
            labelName: "Adjustment Amount Details",
            labelKey: "BILL_ADJUSTMENT_AMOUNT_DETAILS"
        }),
        estimate: getFeesEstimateCard({
            sourceJsonPath: "LicensesTemp[0].estimateCardData"
        }),
        demandRevisionHeader: getHeader({
            labelName: "Demand Revision Basis Details",
            labelKey: "BILL_DEMAND_REVISION_BASIS_DETAILS"
        }),
        break1: (0, _utils.getBreak)(),
        demandRevisionContainer: (0, _utils.getCommonContainer)({
            demandRevisionBasis: (0, _utils.getLabelWithValue)({
                labelName: "Demand Revison Basis",
                labelKey: "BILL_DEMAND_REVISON_BASIS_LABEL"
            }, {
                jsonPath: "Amendment.amendmentReason"
            }),
            courtOrderNo: (0, _utils.getLabelWithValue)({
                labelName: "Court Order No",
                labelKey: "BILL_COURT_ORDER_NO_LABEL"
            }, {
                jsonPath: "Amendment.reasonDocumentNumber"
            }),
            dateEffectiveFrom: (0, _utils.getLabelWithValue)({
                labelName: "Date Effective From",
                labelKey: "BILL_DATE_EFFECTIVE_FROM_LABEL"
            }, {
                jsonPath: "AmendmentTemp.effectiveFrom"
            }),
            govtNotificationNumber: (0, _utils.getLabelWithValue)({
                labelName: "Govt Notification No",
                labelKey: "BILL_GOVT_NOTIFICATION_NO_LABEL"
            }, {
                jsonPath: "Amendment.reasonDocumentNumber"
            }),
            documentNo: (0, _utils.getLabelWithValue)({
                labelName: "Document No",
                labelKey: "BILL_DOCUMNET_NO_LABEL"
            }, {
                jsonPath: "Amendment.reasonDocumentNumber"
            }),
            fromDate: (0, _utils.getLabelWithValue)({
                labelName: "From Date",
                labelKey: "BILL_COMMON_FROM_DATE_LABEL"
            }, {
                jsonPath: "AmendmentTemp.effectiveFrom"
            }),
            toDate: (0, _utils.getLabelWithValue)({
                labelName: "To Date",
                labelKey: "BILL_COMMON_TO_DATE_LABEL"
            }, {
                jsonPath: "AmendmentTemp.effectiveTill"
            })
        })

    }),
    documents: (0, _documentReview.getReviewDocuments)(true, false)
});
exports.default = summary;