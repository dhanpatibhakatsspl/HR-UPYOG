"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getData = exports.billAmendDemandRevisionContainer = exports.setSearchResponse = exports.onDemandRevisionBasisHidendShowFields = exports.documentDetailsPreview = exports.adjustmentAmountDetails = exports.getFeesEstimateCard = exports.downloadPrintContainer = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _function = require("egov-billamend/ui-config/screens/specs/bill-amend/searchResources/function.js");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _generateBillAmendAcknowledgement = require("egov-ui-kit/utils/pdfUtils/generateBillAmendAcknowledgement");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _common = require("../../../../config/common");

var _common2 = _interopRequireDefault(_common);

var _commons2 = require("../../../../ui-utils/commons");

var _documentReview = require("./document-review");

var _utils2 = require("./utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadPrintContainer = exports.downloadPrintContainer = function downloadPrintContainer(action, state, dispatch) {
    /** MenuButton data based on status */
    var downloadMenu = [];
    var printMenu = [];
    var ptMutationCertificateDownloadObject = {
        label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
        link: function link() {},
        leftIcon: "book"
    };
    var ptMutationCertificatePrintObject = {
        label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
        link: function link() {},
        leftIcon: "book"
    };

    downloadMenu = [ptMutationCertificateDownloadObject];
    printMenu = [ptMutationCertificatePrintObject];

    /** END */

    return {
        rightdiv: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
                style: { textAlign: "right", display: "flex" }
            },
            children: {
                downloadMenu: {
                    uiFramework: "custom-atoms-local",
                    moduleName: "egov-billamend",
                    componentPath: "MenuButton",
                    props: {
                        data: {
                            label: { labelName: "DOWNLOAD", labelKey: "BILL_AMEND_DOWNLOAD" },
                            leftIcon: "cloud_download",
                            rightIcon: "arrow_drop_down",
                            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className: "pt-download-button" },
                            menu: downloadMenu
                        }
                    }
                },
                printMenu: {
                    uiFramework: "custom-atoms-local",
                    moduleName: "egov-billamend",
                    componentPath: "MenuButton",
                    props: {
                        data: {
                            label: { labelName: "PRINT", labelKey: "BILL_AMEND_PRINT" },
                            leftIcon: "print",
                            rightIcon: "arrow_drop_down",
                            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "pt-print-button" },
                            menu: printMenu
                        }
                    }
                }

            }
            // gridDefination: {
            //   xs: 12,
            //   sm: 6
            // }
        }
    };
};

var setDownloadMenu = function setDownloadMenu(state, dispatch, applicationNumber) {
    /** MenuButton data based on status */
    var status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Amendment.status");
    var downloadMenu = [];
    var printMenu = [];
    var certificateDownloadObject = {
        label: { labelName: "PT Certificate", labelKey: "BILL_AMEND_COUPON" },
        link: function link() {
            (0, _utils2.generateBillAmendPdf)([(0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Amendment", {})], _common2.default.tenantId, 'download');
        },
        leftIcon: "book"
    };
    var certificatePrintObject = {
        label: { labelName: "PT Certificate", labelKey: "BILL_AMEND_COUPON" },
        link: function link() {
            (0, _utils2.generateBillAmendPdf)([(0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Amendment", {})], _common2.default.tenantId, 'print');
        },
        leftIcon: "book"
    };
    var applicationDownloadObject = {
        label: { labelName: "Application", labelKey: "BILL_AMEND_ACK" },
        link: function link() {
            (0, _generateBillAmendAcknowledgement.generateBillAmendAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), "billamend-acknowledgement-" + applicationNumber + ".pdf");
        },
        leftIcon: "assignment"
    };
    var applicationPrintObject = {
        label: { labelName: "Application", labelKey: "BILL_AMEND_ACK" },
        link: function link() {
            (0, _generateBillAmendAcknowledgement.generateBillAmendAcknowledgement)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {}), 'print');
        },
        leftIcon: "assignment"
    };

    switch (status) {
        case "ACTIVE":
        case "CONSUMED":
            downloadMenu = [applicationDownloadObject, certificateDownloadObject];
            printMenu = [applicationPrintObject, certificatePrintObject];
            break;
        case "INWORKFLOW":
            downloadMenu = [applicationDownloadObject];
            printMenu = [applicationPrintObject];
            break;
        default:
            downloadMenu = [applicationDownloadObject];
            printMenu = [applicationPrintObject];
    }
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.helpSection.children.rightdiv.children.downloadMenu", "props.data.menu", downloadMenu));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.helpSection.children.rightdiv.children.printMenu", "props.data.menu", printMenu));
    /** END */
};

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
            number: "NA",
            label: { labelValue: "Consumer No.", labelKey: "BILL_CONSUMER_NO" }
        }
    }
});

var adjustmentAmountDetails = exports.adjustmentAmountDetails = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, amendment) {
        var amountType, billDetails;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        amountType = amendment && amendment.demandDetails && amendment.demandDetails.length > 0 && amendment.demandDetails.filter(function (details) {
                            return details.taxAmount < 0;
                        });

                        if (amountType && amountType.length > 0) {
                            amountType = "reducedAmount";
                        } else {
                            amountType = "additionalAmount";
                        }
                        billDetails = [];

                        amendment.demandDetails.map(function (bill) {
                            if (bill && bill.taxAmount) {
                                billDetails.push({
                                    taxHeadMasterCode: bill.taxHeadMasterCode,
                                    taxAmount: Math.abs(parseFloat(bill.taxAmount)),
                                    amountType: amountType
                                });
                            }
                        });
                        dispatch((0, _actions.prepareFinalObject)("AmendmentTemp[0].estimateCardData", billDetails, []));

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function adjustmentAmountDetails(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var documentMaping = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(documentsPreview) {
        var fileStoreIds, fileUrls, documentsPreviews;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        fileStoreIds = _jsonpath2.default.query(documentsPreview, "$.*.fileStoreId");

                        if (!(fileStoreIds.length > 0)) {
                            _context2.next = 7;
                            break;
                        }

                        _context2.next = 4;
                        return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

                    case 4:
                        _context2.t0 = _context2.sent;
                        _context2.next = 8;
                        break;

                    case 7:
                        _context2.t0 = {};

                    case 8:
                        fileUrls = _context2.t0;
                        documentsPreviews = documentsPreview.map(function (doc, index) {
                            doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && (0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]) || "";
                            doc["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
                            return doc;
                        });
                        return _context2.abrupt("return", documentsPreviews);

                    case 11:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function documentMaping(_x4) {
        return _ref2.apply(this, arguments);
    };
}();

var documentDetailsPreview = exports.documentDetailsPreview = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, amendment) {
        var documentsPreview, appDocuments;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        documentsPreview = [];

                        amendment.documents.forEach(function (doc) {
                            documentsPreview.push({
                                title: (0, _commons.getTransformedLocale)(doc.documentType),
                                fileStoreId: doc.fileStoreId,
                                linkText: "View"
                            });
                        });
                        _context3.next = 4;
                        return documentMaping(documentsPreview);

                    case 4:
                        appDocuments = _context3.sent;

                        dispatch((0, _actions.prepareFinalObject)("bill-amend-review-document-data", appDocuments));

                    case 6:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function documentDetailsPreview(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

var onDemandRevisionBasisHidendShowFields = exports.onDemandRevisionBasisHidendShowFields = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, dispatch, action, amendment) {
        var demandRevisionBasis;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        demandRevisionBasis = (0, _get2.default)(amendment, "amendmentReason", "");
                        _context4.t0 = demandRevisionBasis;
                        _context4.next = _context4.t0 === "COURT_CASE_SETTLEMENT" ? 4 : _context4.t0 === "ARREAR_WRITE_OFF" ? 11 : _context4.t0 === "ONE_TIME_SETTLEMENT" ? 11 : _context4.t0 === "DCB_CORRECTION" ? 18 : _context4.t0 === "REMISSION_FOR_PROPERTY_TAX" ? 18 : _context4.t0 === "OTHERS" ? 18 : 25;
                        break;

                    case 4:
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo.visible", true);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom.visible", true);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber.visible", false);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo.visible", false);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate.visible", false);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate.visible", false);
                        return _context4.abrupt("break", 26);

                    case 11:
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo.visible", false);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom.visible", false);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber.visible", true);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo.visible", false);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate.visible", true);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate.visible", true);
                        return _context4.abrupt("break", 26);

                    case 18:
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo.visible", false);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom.visible", false);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber.visible", false);

                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo.visible", true);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate.visible", true);
                        (0, _set2.default)(action, "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate.visible", true);

                        return _context4.abrupt("break", 26);

                    case 25:
                        return _context4.abrupt("break", 26);

                    case 26:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function onDemandRevisionBasisHidendShowFields(_x8, _x9, _x10, _x11) {
        return _ref4.apply(this, arguments);
    };
}();

var setSearchResponse = exports.setSearchResponse = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(state, dispatch, action) {
        var tenantId, applicationNumber, businessService, billAMDSearch, amendments, newQuery, resp, connectionDetail, consumerName, consumerAddress;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        tenantId = (0, _localStorageUtils.getTenantId)() || (0, _commons.getQueryArg)(window.location.href, "tenantId");
                        applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
                        businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
                        _context5.next = 5;
                        return (0, _commons2.getBillAmdSearchResult)([{
                            key: "tenantId",
                            value: tenantId
                        }, {
                            key: "amendmentId",
                            value: applicationNumber
                        }, {
                            key: "businessService",
                            value: businessService
                        }], dispatch);

                    case 5:
                        billAMDSearch = _context5.sent;
                        amendments = (0, _get2.default)(billAMDSearch, "Amendments", []);

                        if (!(amendments && amendments.length > 0)) {
                            _context5.next = 25;
                            break;
                        }

                        newQuery = [{
                            key: "tenantId",
                            value: tenantId
                        }, {
                            key: "consumerCode",
                            value: (0, _get2.default)(amendments[0], "consumerCode")
                        }, {
                            key: "businessService",
                            value: businessService
                        }];
                        _context5.next = 11;
                        return (0, _commons2.searchBill)(newQuery, dispatch);

                    case 11:
                        resp = _context5.sent;
                        connectionDetail = (0, _get2.default)(resp, 'Bill[0]', {});
                        consumerName = (0, _get2.default)(connectionDetail, "additionalDetails.ownerName", "NA");
                        consumerAddress = (0, _function.getAddress)((0, _get2.default)(connectionDetail, "tenantId"), (0, _get2.default)(connectionDetail, "additionalDetails.locality"));

                        (0, _set2.default)(amendments[0], 'additionalDetails.ownerName', consumerName);
                        (0, _set2.default)(amendments[0], 'additionalDetails.ownerAddress', consumerAddress);
                        dispatch((0, _actions.prepareFinalObject)("Amendment", amendments[0]));
                        dispatch((0, _actions.prepareFinalObject)("searchBillDetails-bill", (0, _get2.default)(amendments[0], "additionalDetails.searchBillDetails", {})));
                        dispatch((0, _actions.prepareFinalObject)("AmendmentUpdate", amendments[0]));
                        adjustmentAmountDetails(state, dispatch, amendments[0]);
                        documentDetailsPreview(state, dispatch, amendments[0]);
                        onDemandRevisionBasisHidendShowFields(state, dispatch, action, amendments[0]);
                        setDownloadMenu(state, dispatch, applicationNumber);
                        (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.header1.children.applicationNumber.props.number", (0, _get2.default)(amendments[0], "consumerCode"));

                    case 25:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function setSearchResponse(_x12, _x13, _x14) {
        return _ref5.apply(this, arguments);
    };
}();

var billAmendDemandRevisionContainer = exports.billAmendDemandRevisionContainer = {
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
        jsonPath: "Amendment.effectiveFrom",
        callBack: function callBack(value) {
            return (0, _utils.convertEpochToDate)(value);
        }
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
        jsonPath: "Amendment.effectiveFrom",
        callBack: function callBack(value) {
            return (0, _utils.convertEpochToDate)(value);
        }
    }),
    toDate: (0, _utils.getLabelWithValue)({
        labelName: "To Date",
        labelKey: "BILL_COMMON_TO_DATE_LABEL"
    }, {
        jsonPath: "Amendment.effectiveTill",
        callBack: function callBack(value) {
            return (0, _utils.convertEpochToDate)(value);
        }
    })
};

var getData = exports.getData = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(action, state, dispatch) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.next = 2;
                        return setSearchResponse(state, dispatch, action);

                    case 2:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function getData(_x15, _x16, _x17) {
        return _ref6.apply(this, arguments);
    };
}();

var screenConfig = {
    uiFramework: "material-ui",
    name: "search-preview",
    beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
        var printCont = downloadPrintContainer(action, state, dispatch);

        (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.helpSection.children", printCont);
        var businessService = "BS.AMENDMENT";
        var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
        var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: businessService }];
        (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
        getData(action, state, dispatch).then(function (responseAction) {});
        return action;
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
                className: "common-div-css search-preview"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    children: {
                        header1: (0, _extends3.default)({
                            gridDefination: {
                                xs: 12,
                                sm: 8
                            }
                        }, headerrow),
                        helpSection: {
                            uiFramework: "custom-atoms",
                            componentPath: "Container",
                            props: {
                                color: "primary",
                                style: { justifyContent: "flex-end" }
                            },
                            gridDefination: {
                                xs: 12,
                                sm: 4,
                                align: "right"
                            }
                        }

                    }
                },
                taskStatus: {
                    uiFramework: "custom-containers-local",
                    componentPath: "WorkFlowContainer",
                    moduleName: "egov-workflow",
                    visible: true,
                    props: {
                        dataPath: "AmendmentUpdate",
                        moduleName: "Amendment",
                        updateUrl: "billing-service/amendment/_update"
                    }
                },
                bodyDiv: (0, _utils.getCommonCard)({
                    title: (0, _utils.getCommonTitle)({ labelName: "Summary", labelKey: "BILL_SUMMARY" }),
                    grayDiv: (0, _utils.getCommonGrayCard)({
                        title: (0, _utils.getCommonTitle)({
                            labelName: "Amount Details",
                            labelKey: "BILL_AMOUNT_DETAILS"
                        }),
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
                        demandRevisionContainer: (0, _utils.getCommonContainer)(billAmendDemandRevisionContainer)

                    }),
                    documents: (0, _documentReview.getReviewDocuments)(false, false)
                })

            }
        },
        breakUpDialog: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-tradelicence",
            componentPath: "ViewBreakupContainer",
            props: {
                open: false,
                maxWidth: "md",
                screenKey: "search-preview"
            }
        }
    }
};

exports.default = screenConfig;