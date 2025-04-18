"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateWSAcknowledgement = undefined;

var _reviewTrade = require("egov-wns/ui-config/screens/specs/wns/applyResource/review-trade");

var _taskConnectiondetails = require("egov-wns/ui-config/screens/specs/wns/applyResource/task-connectiondetails");

var _reviewOwner = require("egov-wns/ui-config/screens/specs/wns/applyResource/review-owner");

var _formUtils = require("../PTCommon/FormWizardUtils/formUtils");

var _reviewModificationsEffective = require("egov-wns/ui-config/screens/specs/wns/applyResource/reviewModificationsEffective");

var _generatePDF = require("./generatePDF");

var _commons = require("egov-ui-framework/ui-utils/commons");

var generateWSAcknowledgement = exports.generateWSAcknowledgement = function generateWSAcknowledgement(preparedFinalObject) {
    var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "print";
    var service = arguments[2];
    var connType = arguments[3];

    _reviewTrade.propertyDetails.reviewPropertyType.localiseValue = true;
    _reviewTrade.propertyDetails.reviewPropertyType.localiseValue = true;
    _reviewTrade.propertyDetails.reviewPropertyUsageType.localiseValue = true;
    _reviewTrade.propertyDetails.reviewPropertySubUsageType.localiseValue = true;
    _reviewOwner.roadDetails.reviewRoadType.localiseValue = true;

    _taskConnectiondetails.connDetailsWater.taskApplicationType.localiseValue = true;
    _taskConnectiondetails.connDetailsSewerage.taskApplicationType.localiseValue = true;

    _reviewOwner.plumberDetails.reviewPlumberProvidedBy.localiseValue = true;

    _reviewOwner.additionDetailsWater.reviewConnectionType.localiseValue = true;
    _reviewOwner.additionDetailsWater.reviewWaterSubSource.localiseValue = true;
    _reviewOwner.additionDetailsWater.reviewWaterSource.localiseValue = true;
    _reviewOwner.additionDetailsSewerage.reviewConnectionType.localiseValue = true;

    Object.keys(_reviewTrade.propertyOwnerDetail).forEach(function (owner) {
        if (owner == "gender" || owner == "relationship" || owner == "specialApplicantCategory") _reviewTrade.propertyOwnerDetail[owner].localiseValue = true;
    });

    Object.keys(_reviewTrade.connectionHolderDetails).forEach(function (owner) {
        if (owner == "gender" || owner == "relationship" || owner == "specialApplicantCategory") _reviewTrade.propertyOwnerDetail[owner].localiseValue = true;
    });

    var propDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.propertyDetails);
    var propertyDetail = propDetail.map(function (cur) {
        if (cur.key === "Rainwater harvesting Facility") {
            if (cur.value === true) {
                return { key: cur.key, value: "Yes" };
            } else if (cur.value === false) {
                return { key: cur.key, value: "No" };
            } else {
                return { key: cur.key, value: "NA" };
            }
        } else {
            return { key: cur.key, value: cur.value };
        }
    });
    var locationDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.locationDetails);
    var connectionDetail = {};
    if (service === "WATER") {
        connectionDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _taskConnectiondetails.connDetailsWater);
    } else {
        connectionDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _taskConnectiondetails.connDetailsSewerage);
    }
    var additionDetail = {};
    if (service === "WATER") {
        additionDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewOwner.additionDetailsWater);
    } else {
        additionDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewOwner.additionDetailsSewerage);
    }
    var activateDetail = {};
    if (connType === "Metered") {
        activateDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewOwner.activateDetailsMeter);
    } else {
        activateDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewOwner.activateDetailsNonMeter);
    }

    var UlbLogoForPdf = (0, _formUtils.getFromObject)(preparedFinalObject, 'UlbLogoForPdf', '');
    var WaterConnection = (0, _formUtils.getFromObject)(preparedFinalObject, 'WaterConnection[0]', {});
    var isMode = WaterConnection.applicationType !== null ? WaterConnection.applicationType.split("_")[0] : "";
    var reviewModificationsEffective = [];
    var plumberDetail = [];
    var roadDetail = [];
    var roadDetailInfo = [];
    if (isMode === "MODIFY") {
        reviewModificationsEffective = (0, _generatePDF.generateKeyValueForModify)(preparedFinalObject, _reviewModificationsEffective.reviewModificationsEffectiveDate);
    } else {
        plumberDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewOwner.plumberDetails);
        if (WaterConnection.roadCuttingInfo && WaterConnection.roadCuttingInfo.length > 1) {
            roadDetailInfo = (0, _generatePDF.getMultiItems)(preparedFinalObject, _reviewOwner.roadDetails, 'WaterConnection[0].roadCuttingInfo');
            roadDetail = (0, _generatePDF.getMultipleItemCard)(roadDetailInfo, 'WS_ROAD_CUTTING_CHARGE_DETAILS');
        } else {
            roadDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewOwner.roadDetails);
        }
    }

    var connHolderDetail = {};
    if (WaterConnection.connectionHolders === null) {
        var sameAsOwnerArray = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.connectionHolderSameAsOwnerDetails);
        connHolderDetail = sameAsOwnerArray.map(function (cur) {
            return {
                key: cur.key,
                value: "yes"
            };
        });
    } else {
        connHolderDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.connectionHolderDetails);
    }

    var ownerDetail = [];
    var ownerDetailInfo = [];
    if (WaterConnection.property.owners.length > 1) {
        ownerDetailInfo = (0, _generatePDF.getMultiItems)(preparedFinalObject, _reviewTrade.propertyOwnerDetail, 'WaterConnection[0].property.owners');
        ownerDetail = (0, _generatePDF.getMultipleItemCard)(ownerDetailInfo, 'WS_OWNER');
    } else {
        ownerDetail = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _reviewTrade.propertyOwnerDetail);
    }
    var documentsUploadRedux = (0, _formUtils.getFromObject)(preparedFinalObject, 'DocumentsData', []);
    var documentCard = (0, _generatePDF.getDocumentsCard)(documentsUploadRedux);
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

    var pdfData = {
        header: WaterConnection.applicationNo.includes("WS") ? "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_LOGO_SUB_HEADER" : "PDF_STATIC_LABEL_SW_CONSOLIDATED_ACKNOWELDGMENT_LOGO_SUB_HEADER", tenantId: tenantId,
        applicationNoHeader: WaterConnection.applicationType !== null ? WaterConnection.applicationType.split("_").join(" ") : "",
        additionalHeader: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_APPLICATION_NO', additionalHeaderValue: WaterConnection.applicationNo,
        cards: [{ header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_PROPERTY_DETAILS_HEADER", items: propertyDetail }, { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_LOCATION_DETAILS_HEADER", items: locationDetail }, { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_OWNER_DETAILS_HEADER", items: ownerDetail, type: ownerDetailInfo.length > 1 ? 'multiItem' : 'singleItem' }, { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_CONNECTION_DETAILS_HEADER', items: connectionDetail }, { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_CONNECTION_HOLDER_DETAILS_HEADER', items: connHolderDetail }, { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_DOCUMENTS_DETAILS_HEADER', items: documentCard, hide: documentCard.length === 0 }, { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ADDITIONAL_CONNECTION_HEADER', items: additionDetail }, { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_PLUMBER_DETAILS_HEADER', items: plumberDetail, hide: plumberDetail.length === 0 }, { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ROAD_CHARGES_HEADER', items: roadDetail, type: roadDetailInfo.length > 1 ? 'multiItem' : 'singleItem' }, //hide: (roadDetailInfo.length === 0 && roadDetail.length === 0)
        { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ACTIVATION_DETAILS_HEADER', items: activateDetail }, { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_MODIFY_EFFECTIVE_DATE_HEADER', items: reviewModificationsEffective, hide: reviewModificationsEffective.length === 0 }]
    };

    (0, _generatePDF.generatePDF)(UlbLogoForPdf, pdfData, fileName);
    return true;
};