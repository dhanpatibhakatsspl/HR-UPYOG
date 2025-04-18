"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateBillAmendAcknowledgement = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _searchPreview = require("egov-billamend/ui-config/screens/specs/bill-amend/search-preview");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _generatePDF2 = require("./generatePDF");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDate = function getDate(date) {

    var dateObj = new Date(date);
    return dateObj.getDate() + "-" + (dateObj.getMonth() + 1) + "-" + (dateObj.getYear() + 1900);
}; // import { tradeInstitutionDetails, tradeOwnerDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-owner";
// import { tradeAccessoriesDetails, tradeLocationDetails, tradeReviewDetails, tradetypeDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-trade";

var updateEstimate = function updateEstimate() {
    var fees = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var searchBillDetails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var amountType = "reducedAmount";

    var newFee = {};
    fees && Array.isArray(fees) && fees.map(function (fee) {
        amountType = fee.amountType;
        newFee[fee.taxHeadMasterCode] = (0, _extends3.default)({}, fee);
    });
    var newFees = [];
    Object.keys(searchBillDetails).map(function (key) {
        if (key != 'TOTAL') {
            newFees.push({ taxHeadMasterCode: key, taxAmount: (0, _formUtils.getFromObject)(newFee, key + ".taxAmount", 0) == 0 ? '0' : (0, _formUtils.getFromObject)(newFee, key + ".taxAmount", 0), amountType: amountType });
        }
    });

    return newFees;
};
var generateBillAmendAcknowledgement = exports.generateBillAmendAcknowledgement = function generateBillAmendAcknowledgement(preparedFinalObject) {
    var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "acknowledgement.pdf";


    _searchPreview.billAmendDemandRevisionContainer.demandRevisionBasis.localiseValue = true;

    var UlbLogoForPdf = (0, _formUtils.getFromObject)(preparedFinalObject, 'UlbLogoForPdf', '');
    var Amendment = (0, _formUtils.getFromObject)(preparedFinalObject, 'Amendment', {});

    var modifiedDemand = (0, _extends3.default)({}, _searchPreview.billAmendDemandRevisionContainer);
    var demandRevisionBasis = (0, _formUtils.getFromObject)(Amendment, "amendmentReason", "");
    switch (demandRevisionBasis) {
        case "COURT_CASE_SETTLEMENT":
            delete modifiedDemand.govtNotificationNumber;
            delete modifiedDemand.fromDate;
            delete modifiedDemand.toDate;
            break;
        case "ARREAR_WRITE_OFF":
        case "ONE_TIME_SETTLEMENT":
            delete modifiedDemand.courtOrderNo;
            delete modifiedDemand.dateEffectiveFrom;
            delete modifiedDemand.documentNo;
            break;
        case "DCB_CORRECTION":
        case "REMISSION_FOR_PROPERTY_TAX":
        case "OTHERS":
            delete modifiedDemand.courtOrderNo;
            delete modifiedDemand.dateEffectiveFrom;
            delete modifiedDemand.govtNotificationNumber;
            break;
        default:
            delete modifiedDemand.courtOrderNo;
            delete modifiedDemand.dateEffectiveFrom;
            delete modifiedDemand.govtNotificationNumber;
    }
    var searchBillDetails = (0, _formUtils.getFromObject)(preparedFinalObject, 'Amendment.additionalDetails.searchBillDetails', {});
    var demandDetails = (0, _formUtils.getFromObject)(preparedFinalObject, 'Amendment.demandDetails', []);
    var estimateCardData = [{
        name: {
            labelName: 'BILL_TAX_HEADS',
            labelKey: 'BILL_TAX_HEADS'
        },
        value1: (0, _commons.getLocaleLabels)('BILL_OLD_AMOUNT', 'BILL_OLD_AMOUNT'),
        value2: (0, _commons.getLocaleLabels)('BILL_UPDATED_AMOUNT', 'BILL_UPDATED_AMOUNT'),
        value: (0, _commons.getLocaleLabels)('BILL_REDUCED_AMOUNT_RS', 'BILL_REDUCED_AMOUNT_RS')
    }];
    demandDetails = updateEstimate(demandDetails, searchBillDetails);

    demandDetails.map(function (demand) {
        if (typeof demand.taxAmount == "number") {
            if (demand.taxAmount > 0) {
                estimateCardData[0].value = (0, _commons.getLocaleLabels)('DEBIT_NOTE', 'DEBIT_NOTE');
            } else {
                estimateCardData[0].value = (0, _commons.getLocaleLabels)('CREDIT_NOTE', 'CREDIT_NOTE');
            }
        }

        estimateCardData.push({
            name: {
                labelName: demand.taxHeadMasterCode,
                labelKey: demand.taxHeadMasterCode
            },
            value1: (0, _formUtils.getFromObject)(searchBillDetails, demand.taxHeadMasterCode, 0),
            value2: demand.taxAmount < 0 ? Number((0, _formUtils.getFromObject)(searchBillDetails, demand.taxHeadMasterCode, 0)) - Math.abs(Number(demand.taxAmount)) : Number((0, _formUtils.getFromObject)(searchBillDetails, demand.taxHeadMasterCode, 0)) + Number(demand.taxAmount),
            value: demand.taxAmount == 0 ? '0' : Math.abs(demand.taxAmount)
        });
    });

    var documentsUploadRedux = (0, _formUtils.getFromObject)(preparedFinalObject, 'bill-amend-review-document-data', []);
    var documentCard = (0, _generatePDF.getDocumentsCard)(documentsUploadRedux);
    var estimateDetails = (0, _generatePDF2.getEstimateCardDetailsBillAmend)(estimateCardData, undefined, false, true, true);
    var billAmendDemandRevisionSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, modifiedDemand);

    var pdfData = {
        header: "BILLAMEND_APPLICATION", tenantId: 'pb.amritsar',
        applicationNoHeader: 'BILLAMEND_APPLICATIONNO', applicationNoValue: Amendment.amendmentId,
        additionalHeader: "BILLAMEND_APPLICATIONDATE", additionalHeaderValue: getDate(Amendment.auditDetails.createdTime),
        cards: [{ header: "BILL_ADJUSTMENT_AMOUNT_DETAILS", type: 'header' }, { items: estimateDetails, type: 'estimate' }, { header: "BILL_DEMAND_REVISION_BASIS_DETAILS", items: billAmendDemandRevisionSummary }, { header: 'BILL_DOCUMENTS', items: documentCard }]
    };

    (0, _generatePDF.generatePDF)(UlbLogoForPdf, pdfData, fileName, true);
};