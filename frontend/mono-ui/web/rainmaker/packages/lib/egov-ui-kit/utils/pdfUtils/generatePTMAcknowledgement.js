"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generatePTMAcknowledgement = undefined;

var _mutationSummary = require("egov-pt/ui-config/screens/specs/pt-mutation/applyResourceMutation/mutationSummary");

var _transfereeSummary = require("egov-pt/ui-config/screens/specs/pt-mutation/searchPreviewResource/transfereeSummary");

var _transferorSummary = require("egov-pt/ui-config/screens/specs/pt-mutation/searchPreviewResource/transferorSummary");

var _registrationSummary = require("egov-pt/ui-config/screens/specs/pt-mutation/summaryResource/registrationSummary");

var _formUtils = require("../PTCommon/FormWizardUtils/formUtils");

var _PropertyAddressInfo = require("../../common/propertyTax/Property/components/PropertyAddressInfo");

var _generatePDF = require("./generatePDF");

var generatePTMAcknowledgement = exports.generatePTMAcknowledgement = function generatePTMAcknowledgement(preparedFinalObject) {
    var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "acknowledgement.pdf";

    _registrationSummary.registrationSummaryDetails.transferReason.localiseValue = true;
    _transferorSummary.transferorSummaryDetails.ownerType.localiseValue = true;
    _transfereeSummary.transfereeSummaryDetails.ownerType.localiseValue = true;
    _transfereeSummary.transfereeInstitutionSummaryDetails.institutionType.localiseValue = true;
    _transferorSummary.transferorInstitutionSummaryDetails.institutionType.localiseValue = true;
    var mutationDetails = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _mutationSummary.mutationSummaryDetails);
    var registrationDetails = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _registrationSummary.registrationSummaryDetails);
    var UlbLogoForPdf = (0, _formUtils.getFromObject)(preparedFinalObject, 'UlbLogoForPdf', '');
    var property = (0, _formUtils.getFromObject)(preparedFinalObject, 'Property', {});
    var transfereeOwners = (0, _formUtils.getFromObject)(property, "ownersTemp", []);
    var transferorOwners = (0, _formUtils.getFromObject)(property, "ownersInit", []);
    var transfereeOwnersDid = true;
    var transferorOwnersDid = true;
    transfereeOwners.map(function (owner) {
        if (owner.ownerType != 'NONE') {
            transfereeOwnersDid = false;
        }
    });
    transferorOwners.map(function (owner) {
        if (owner.ownerType != 'NONE') {
            transferorOwnersDid = false;
        }
    });

    if (transfereeOwnersDid) {
        delete _transfereeSummary.transfereeSummaryDetails.ownerSpecialDocumentType;
        delete _transfereeSummary.transfereeSummaryDetails.ownerDocumentId;
    }
    if (transferorOwnersDid) {
        delete _transferorSummary.transferorSummaryDetails.ownerSpecialDocumentType;
        delete _transferorSummary.transferorSummaryDetails.ownerSpecialDocumentID;
    }
    var transferorDetails = [];
    var transferorDetailsInfo = [];
    if ((0, _formUtils.getFromObject)(property, "ownershipCategoryInit", "").startsWith("INSTITUTION")) {
        transferorDetails = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _transferorSummary.transferorInstitutionSummaryDetails);
    } else if ((0, _formUtils.getFromObject)(property, "ownershipCategoryInit", "").includes("SINGLEOWNER")) {
        transferorDetails = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _transferorSummary.transferorSummaryDetails);
    } else {
        transferorDetailsInfo = (0, _generatePDF.getMultiItems)(preparedFinalObject, _transferorSummary.transferorSummaryDetails, 'Property.ownersTemp[0]');
        transferorDetails = (0, _generatePDF.getMultipleItemCard)(transferorDetailsInfo, 'PT_OWNER');
    }
    var transfereeDetails = [];
    var transfereeDetailsInfo = [];
    if ((0, _formUtils.getFromObject)(property, "ownershipCategoryTemp", "").startsWith("INSTITUTION")) {
        transfereeDetails = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _transfereeSummary.transfereeInstitutionSummaryDetails);
    } else if ((0, _formUtils.getFromObject)(property, "ownershipCategoryTemp", "").includes("SINGLEOWNER")) {
        transfereeDetails = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _transfereeSummary.transfereeSummaryDetails);
    } else {
        transfereeDetailsInfo = (0, _generatePDF.getMultiItems)(preparedFinalObject, _transfereeSummary.transfereeSummaryDetails, 'Property.ownersInit[0]');
        transfereeDetails = (0, _generatePDF.getMultipleItemCard)(transferorDetailsInfo, 'PT_OWNER');
    }

    var addressCard = (0, _PropertyAddressInfo.getAddressItems)((0, _formUtils.getFromObject)(preparedFinalObject, 'Property', {}));
    var documentsUploadRedux = (0, _formUtils.getFromObject)(preparedFinalObject, 'documentsUploadRedux', []);
    var documentCard = (0, _generatePDF.getDocumentsCard)(documentsUploadRedux);
    var pdfData = {
        header: "PTM_ACKNOWLEDGEMENT", tenantId: property.tenantId,
        applicationNoHeader: 'PT_PROPERRTYID', applicationNoValue: property.propertyId,
        additionalHeader: "PT_APPLICATION_NO", additionalHeaderValue: property.acknowldgementNumber,
        cards: [{ header: "PT_PROPERTY_ADDRESS_SUB_HEADER", items: addressCard }, { header: 'PT_MUTATION_TRANSFEROR_DETAILS', items: transferorDetails, type: transferorDetailsInfo.length > 1 ? 'multiItem' : 'singleItem' }, { header: 'PT_MUTATION_TRANSFEREE_DETAILS', items: transfereeDetails, type: transfereeDetailsInfo.length > 1 ? 'multiItem' : 'singleItem' }, { header: "PT_MUTATION_DETAILS", items: mutationDetails, hide: !(0, _formUtils.getFromObject)(preparedFinalObject, 'PropertyConfiguration[0].Mutation.MutationDetails', false) }, { header: "PT_MUTATION_REGISTRATION_DETAILS", items: registrationDetails }, { header: 'PT_SUMMARY_DOCUMENTS_HEADER', items: documentCard }]
    };
    (0, _generatePDF.generatePDF)(UlbLogoForPdf, pdfData, fileName);
};