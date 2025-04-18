"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateTLAcknowledgement = undefined;

var _reviewOwner = require("egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-owner");

var _reviewTrade = require("egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-trade");

var _formUtils = require("../PTCommon/FormWizardUtils/formUtils");

var _generatePDF = require("./generatePDF");

var generateTLAcknowledgement = exports.generateTLAcknowledgement = function generateTLAcknowledgement(preparedFinalObject) {
    var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "acknowledgement.pdf";


    _reviewTrade.tradeLocationDetails.reviewMohalla.localiseValue = true;
    _reviewTrade.tradeLocationDetails.reviewCity.localiseValue = true;

    _reviewTrade.tradetypeDetails.reviewTradeCategory.localiseValue = true;
    _reviewTrade.tradetypeDetails.reviewTradeType.localiseValue = true;
    _reviewTrade.tradetypeDetails.reviewTradeSubtype.localiseValue = true;

    _reviewTrade.tradeAccessoriesDetails.reviewAccessoryType.localiseValue = true;

    _reviewTrade.tradeReviewDetails.reviewApplicationType.localiseValue = true;
    _reviewTrade.tradeReviewDetails.reviewLicenceType.localiseValue = true;
    _reviewTrade.tradeReviewDetails.reviewStructureType.localiseValue = true;
    _reviewTrade.tradeReviewDetails.reviewSubStructureType.localiseValue = true;

    _reviewOwner.tradeOwnerDetails.reviewOwnerGender.localiseValue = true;
    _reviewOwner.tradeOwnerDetails.reviewownershipType.localiseValue = true;
    _reviewOwner.tradeOwnerDetails.reviewsubOwnership.localiseValue = true;
    _reviewOwner.tradeOwnerDetails.reviewOwnerSpecialCat.localiseValue = true;
    _reviewOwner.tradeOwnerDetails.reviewRelationship.localiseValue = true;

    _reviewOwner.tradeInstitutionDetails.reviewRelationship.localiseValue = true;
    _reviewOwner.tradeInstitutionDetails.reviewownershipType.localiseValue = true;
    _reviewOwner.tradeInstitutionDetails.reviewsubOwnership.localiseValue = true;

    var UlbLogoForPdf = (0, _formUtils.getFromObject)(preparedFinalObject, 'UlbLogoForPdf', '');
    var License = (0, _formUtils.getFromObject)(preparedFinalObject, 'Licenses[0]', {});

    var tradeTypeSummary = [];
    var tradeTypeSummaryInfo = [];
    if ((0, _formUtils.getFromObject)(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.tradeUnits', []).length === 1) {
        tradeTypeSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.tradetypeDetails); //
    } else if ((0, _formUtils.getFromObject)(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.tradeUnits', []).length > 1) {
        tradeTypeSummaryInfo = (0, _generatePDF.getMultiItems)(preparedFinalObject, _reviewTrade.tradetypeDetails, 'Licenses[0].tradeLicenseDetail.tradeUnits');
        tradeTypeSummary = (0, _generatePDF.getMultipleItemCard)(tradeTypeSummaryInfo, "TL_TRADE_UNIT");
    }

    var tradeAccessoriesSummary = [];
    var tradeAccessoriesSummaryInfo = [];
    if ((0, _formUtils.getFromObject)(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []).length === 1) {
        tradeAccessoriesSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.tradeAccessoriesDetails); //
    } else if ((0, _formUtils.getFromObject)(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []).length > 1) {
        tradeAccessoriesSummaryInfo = (0, _generatePDF.getMultiItems)(preparedFinalObject, _reviewTrade.tradeAccessoriesDetails, 'Licenses[0].tradeLicenseDetail.accessories');
        tradeAccessoriesSummary = (0, _generatePDF.getMultipleItemCard)(tradeAccessoriesSummaryInfo, "TL_TRADE_ACCESSORY");
    }

    var tradeOwnerSummary = [];
    var tradeOwnerSummaryInfo = [];

    var ownershipType = (0, _formUtils.getFromObject)(License, "tradeLicenseDetail.subOwnerShipCategory", "");
    if (ownershipType.startsWith("INSTITUTION")) {
        tradeOwnerSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewOwner.tradeInstitutionDetails);
    } else if (ownershipType.includes("SINGLEOWNER")) {
        tradeOwnerSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewOwner.tradeOwnerDetails);
    } else {
        tradeOwnerSummaryInfo = (0, _generatePDF.getMultiItems)(preparedFinalObject, _reviewOwner.tradeOwnerDetails, 'Licenses[0].tradeLicenseDetail.owners');
        tradeOwnerSummary = (0, _generatePDF.getMultipleItemCard)(tradeOwnerSummaryInfo, 'TL_OWNER');
    }

    var documentsUploadRedux = (0, _formUtils.getFromObject)(preparedFinalObject, 'LicensesTemp[0].reviewDocData', []);
    var documentCard = (0, _generatePDF.getDocumentsCard)(documentsUploadRedux);
    var estimateDetails = (0, _generatePDF.getEstimateCardDetails)((0, _formUtils.getFromObject)(preparedFinalObject, 'LicensesTemp[0].estimateCardData', []));
    var tradeReviewSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.tradeReviewDetails);
    var tradeLocationSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.tradeLocationDetails);

    var pdfData = {
        header: "TL_TRADE_APPLICATION", tenantId: License.tradeLicenseDetail.address.tenantId,
        applicationNoHeader: 'TL_PDF_LICENSE_NO', applicationNoValue: License.licenseNumber,
        additionalHeader: "TL_PDF_APPLICATION_NO", additionalHeaderValue: License.applicationNumber,
        cards: [{ items: estimateDetails, type: 'estimate' }, { header: "TL_COMMON_TR_DETAILS", items: tradeReviewSummary }, { header: '-1', items: tradeTypeSummary, type: tradeTypeSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' }, { header: '-1', items: tradeAccessoriesSummary, type: tradeAccessoriesSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' }, { header: '-1', items: tradeLocationSummary }, { header: "TL_COMMON_OWN_DETAILS", items: tradeOwnerSummary, type: tradeOwnerSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' }, { header: 'TL_COMMON_DOCS', items: documentCard }]
    };

    (0, _generatePDF.generatePDF)(UlbLogoForPdf, pdfData, fileName);
};