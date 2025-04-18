"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateNOCAcknowledgement = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _applicantSummary = require("egov-firenoc/ui-config/screens/specs/fire-noc/summaryResource/applicantSummary");

var _nocSummary = require("egov-firenoc/ui-config/screens/specs/fire-noc/summaryResource/nocSummary");

var _propertySummary = require("egov-firenoc/ui-config/screens/specs/fire-noc/summaryResource/propertySummary");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _formUtils = require("../PTCommon/FormWizardUtils/formUtils");

var _qrcode = require("qrcode");

var _qrcode2 = _interopRequireDefault(_qrcode);

var _generatePDF = require("./generatePDF");

var _commons2 = require("egov-ui-framework/ui-utils/commons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMessageFromLocalization = function getMessageFromLocalization(code) {
    var messageObject = JSON.parse((0, _localStorageUtils.getLocalization)("localization_" + (0, _localStorageUtils.getLocale)())).find(function (item) {
        return item.code == code;
    });
    return messageObject ? messageObject.message : code;
};

var ifNotNull = function ifNotNull(value) {
    return !["", "NA", "null", null].includes(value);
};
var nullToNa = function nullToNa(value) {
    return ["", "NA", "null", null].includes(value) ? "NA" : value;
};
var createAddress = function createAddress(doorNo, buildingName, street, locality, city) {
    var address = "";
    address += ifNotNull(doorNo) ? doorNo + ", " : "";
    address += ifNotNull(buildingName) ? buildingName + ", " : "";
    address += ifNotNull(street) ? street + ", " : "";
    address += locality + ", ";
    address += city;
    return address;
};

var epochToDate = function epochToDate(et) {
    if (!et) return null;
    var date = new Date(Math.round(Number(et)));
    var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return formattedDate;
};

var getQRCode = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(qrText) {
        var qrcode;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _qrcode2.default.toDataURL(qrText);

                    case 2:
                        qrcode = qrText = _context.sent;
                        return _context.abrupt("return", qrcode);

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getQRCode(_x) {
        return _ref.apply(this, arguments);
    };
}();

var generateNOCAcknowledgement = exports.generateNOCAcknowledgement = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(preparedFinalObject) {
        var fileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "acknowledgement.pdf";
        var UlbLogoForPdf, FireNOC, documentsUploadRedux, documentCard, nocSummary, propertyLocationSummary, propertySummary, propertySummaryDetails, applicantSummary, applicantSummaryInfo, ownershipType, applicationDate, data, qrText, qrcode, pdfData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:

                        _propertySummary.propertyLocationSummaryDetail.city.localiseValue = true;
                        _propertySummary.propertyLocationSummaryDetail.applicableFireStation.localiseValue = true;
                        _propertySummary.propertyLocationSummaryDetail.mohalla.localiseValue = true;

                        // propertySummaryDetails.buildingUsageType.localiseValue = true;
                        // propertySummaryDetails.buildingUsageSubType.localiseValue = true;

                        UlbLogoForPdf = (0, _formUtils.getFromObject)(preparedFinalObject, 'UlbLogoForPdf', '');
                        FireNOC = (0, _formUtils.getFromObject)(preparedFinalObject, 'FireNOCs[0]', {});
                        documentsUploadRedux = (0, _formUtils.getFromObject)(preparedFinalObject, 'FireNOCs[0].fireNOCDetails.additionalDetail.documents', []);
                        documentCard = (0, _generatePDF.getDocumentsCard)(documentsUploadRedux);
                        nocSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _nocSummary.nocSummaryDetail);
                        // let propertySummary = generateKeyValue(preparedFinalObject, propertySummaryDetails);

                        propertyLocationSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _propertySummary.propertyLocationSummaryDetail);
                        propertySummary = [];
                        propertySummaryDetails = [];

                        FireNOC.fireNOCDetails.buildings.map(function (data) {
                            var propertySummaryArray = [];
                            var subUsageType = data.usageType.replaceAll(".", "_");
                            var formatedSubUsageType = subUsageType.replaceAll("-", "_");
                            propertySummaryArray.push({
                                key: (0, _commons2.getLocaleLabels)("NOC_PROPERTY_TYPE_LABEL", "NOC_PROPERTY_TYPE_LABEL"),
                                value: FireNOC.fireNOCDetails.buildings.length > 1 ? (0, _commons2.getLocaleLabels)("MULTIPLE", "MULTIPLE") : (0, _commons2.getLocaleLabels)("SINGLE", "SINGLE")
                            });
                            propertySummaryArray.push({
                                key: (0, _commons2.getLocaleLabels)("NOC_NAME_OF_BUILDING_LABEL", "NOC_NAME_OF_BUILDING_LABEL"),
                                value: data.name || (0, _commons2.getLocaleLabels)("NA", "NA")
                            });
                            propertySummaryArray.push({
                                key: (0, _commons2.getLocaleLabels)("NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL", "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL"),
                                value: data.usageType ? (0, _commons2.getLocaleLabels)("FIRENOC_BUILDINGTYPE_" + data.usageType.split('.')[0], "FIRENOC_BUILDINGTYPE_" + data.usageType.split('.')[0]) : (0, _commons2.getLocaleLabels)("NA", "NA")
                            }), propertySummaryArray.push({
                                key: (0, _commons2.getLocaleLabels)("NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL", "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL"),
                                value: data.usageType ? (0, _commons2.getLocaleLabels)("FIRENOC_BUILDINGTYPE_" + formatedSubUsageType, "FIRENOC_BUILDINGTYPE_" + formatedSubUsageType) : (0, _commons2.getLocaleLabels)("NA", "NA")
                            });
                            var filterData = data.uoms.filter(function (uom) {
                                return uom.active;
                            });
                            filterData.map(function (filterDta) {
                                propertySummaryArray.push({
                                    key: (0, _commons2.getLocaleLabels)("NOC_PROPERTY_DETAILS_" + filterDta.code + "_LABEL", "NOC_PROPERTY_DETAILS_" + filterDta.code + "_LABEL"),
                                    value: filterDta.value || (0, _commons2.getLocaleLabels)("NA", "NA")
                                });
                            });
                            propertySummaryDetails.push({ items: propertySummaryArray });
                        });

                        applicantSummary = [];
                        applicantSummaryInfo = [];
                        ownershipType = (0, _formUtils.getFromObject)(FireNOC, "fireNOCDetails.applicantDetails.ownerShipType", "");

                        if (ownershipType.startsWith("INSTITUTION")) {
                            applicantSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _applicantSummary.institutionSummaryDetail);
                        } else if (ownershipType.includes("SINGLEOWNER")) {
                            applicantSummary = (0, _generatePDF.generateKeyValue)(preparedFinalObject, _applicantSummary.applicantSummaryDetails);
                        } else {
                            applicantSummaryInfo = (0, _generatePDF.getMultiItems)(preparedFinalObject, _applicantSummary.applicantSummaryDetails, 'FireNOCs[0].fireNOCDetails.applicantDetails.owners');
                            applicantSummary = (0, _generatePDF.getMultipleItemCard)(applicantSummaryInfo, 'NOC_OWNER');
                        }

                        if (FireNOC.fireNOCDetails.buildings.length > 1) {
                            propertySummary = (0, _generatePDF.getMultipleItemCard)(propertySummaryDetails, (0, _commons2.getLocaleLabels)('BUILDING', 'BUILDING'));
                        } else {
                            propertySummaryDetails = [];
                            FireNOC.fireNOCDetails.buildings.map(function (data) {
                                var propertySummaryArray = [];
                                var subUsageType = data.usageType.replaceAll(".", "_");
                                var formatedSubUsageType = subUsageType.replaceAll("-", "_");
                                propertySummaryArray.push({
                                    key: (0, _commons2.getLocaleLabels)("NOC_PROPERTY_TYPE_LABEL", "NOC_PROPERTY_TYPE_LABEL"),
                                    value: FireNOC.fireNOCDetails.buildings.length > 1 ? (0, _commons2.getLocaleLabels)("MULTIPLE", "MULTIPLE") : (0, _commons2.getLocaleLabels)("SINGLE", "SINGLE")
                                });
                                propertySummaryArray.push({
                                    key: (0, _commons2.getLocaleLabels)("NOC_NAME_OF_BUILDING_LABEL", "NOC_NAME_OF_BUILDING_LABEL"),
                                    value: data.name || (0, _commons2.getLocaleLabels)("NA", "NA")
                                });
                                propertySummaryArray.push({
                                    key: (0, _commons2.getLocaleLabels)("NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL", "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL"),
                                    value: data.usageType ? (0, _commons2.getLocaleLabels)("FIRENOC_BUILDINGTYPE_" + data.usageType.split('.')[0], "FIRENOC_BUILDINGTYPE_" + data.usageType.split('.')[0]) : (0, _commons2.getLocaleLabels)("NA", "NA")
                                }), propertySummaryArray.push({
                                    key: (0, _commons2.getLocaleLabels)("NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL", "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL"),
                                    value: data.usageType ? (0, _commons2.getLocaleLabels)("FIRENOC_BUILDINGTYPE_" + formatedSubUsageType, "FIRENOC_BUILDINGTYPE_" + formatedSubUsageType) : (0, _commons2.getLocaleLabels)("NA", "NA")
                                });
                                var filterData = data.uoms.filter(function (uom) {
                                    return uom.active;
                                });
                                filterData.map(function (filterDta) {
                                    propertySummaryArray.push({
                                        key: (0, _commons2.getLocaleLabels)("NOC_PROPERTY_DETAILS_" + filterDta.code + "_LABEL", "NOC_PROPERTY_DETAILS_" + filterDta.code + "_LABEL"),
                                        value: filterDta.value || (0, _commons2.getLocaleLabels)("NA", "NA")
                                    });
                                });
                                propertySummary = propertySummaryArray;
                            });
                        }
                        applicationDate = nullToNa(epochToDate((0, _formUtils.getFromObject)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicationDate", "NA")));
                        data = {};

                        data.city = nullToNa(getMessageFromLocalization("TENANT_TENANTS_" + (0, _commons.getTransformedLocale)((0, _formUtils.getFromObject)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.city", "NA"))));
                        data.door = nullToNa((0, _formUtils.getFromObject)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo", "NA"));
                        data.buildingName = nullToNa((0, _formUtils.getFromObject)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.buildingName", "NA"));
                        data.street = nullToNa((0, _formUtils.getFromObject)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.street", "NA"));
                        data.mohalla = nullToNa(getMessageFromLocalization("revenue.locality." + (0, _commons.getTransformedLocale)((0, _formUtils.getFromObject)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code", "NA"))));

                        data.address = createAddress(data.door, data.buildingName, data.street, data.mohalla, data.city);
                        data.propertyType = nullToNa((0, _formUtils.getFromObject)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.noOfBuildings", "NA"));
                        qrText = "Application: " + FireNOC.fireNOCDetails.applicationNumber + ", Date: " + applicationDate + ", Buildings: " + data.propertyType + ", Applicant: " + FireNOC.fireNOCDetails.applicantDetails.owners[0].name + ", Address: " + data.address;
                        _context2.next = 29;
                        return getQRCode(qrText);

                    case 29:
                        qrcode = _context2.sent;
                        pdfData = {
                            header: "NOC_APPLICATION", tenantId: FireNOC.tenantId, qrcode: qrcode,
                            applicationNoHeader: 'NOC_PDF_APPLICATION_NO', applicationNoValue: FireNOC.fireNOCDetails.applicationNumber,
                            additionalHeader: "NOC_PDF_APPLICATION_DATE", additionalHeaderValue: applicationDate,
                            cards: [{ header: "NOC_NOC_DETAILS_HEADER", items: nocSummary }, { header: "NOC_COMMON_PROPERTY_DETAILS", items: propertySummary, type: FireNOC.fireNOCDetails.buildings.length > 1 ? 'multiItem' : 'singleItem' }, { header: "NOC_COMMON_PROPERTY_LOCATION_SUMMARY", items: propertyLocationSummary }, { header: ownershipType.startsWith("INSTITUTION") ? 'NOC_INSTITUTION_DETAILS_HEADER' : "NOC_APPLICANT_DETAILS_HEADER", items: applicantSummary, type: applicantSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' }, { header: 'NOC_SUMMARY_DOCUMENTS_HEADER', items: documentCard }]
                        };

                        (0, _generatePDF.generatePDF)(UlbLogoForPdf, pdfData, fileName);

                    case 32:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function generateNOCAcknowledgement(_x2) {
        return _ref2.apply(this, arguments);
    };
}();