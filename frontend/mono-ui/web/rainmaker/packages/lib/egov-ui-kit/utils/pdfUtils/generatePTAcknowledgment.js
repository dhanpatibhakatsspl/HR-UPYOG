"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generatePTAcknowledgment = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _commons = require("egov-ui-framework/ui-utils/commons.js");

var _formUtils = require("../PTCommon/FormWizardUtils/formUtils");

var _AssessmentInfo = require("../../common/propertyTax/Property/components/AssessmentInfo");

var _OwnerInfo = require("../../common/propertyTax/Property/components/OwnerInfo");

var _PropertyAddressInfo = require("../../common/propertyTax/Property/components/PropertyAddressInfo");

var _generatePDF = require("./generatePDF");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generatePTAcknowledgment = exports.generatePTAcknowledgment = function generatePTAcknowledgment(property, generalMDMSDataById, UlbLogoForPdf) {
    var fileName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "acknowledgement.pdf";


    property.subOwnershipCategory = (0, _formUtils.getFromObject)(property, 'propertyDetails[0].subOwnershipCategory', '');
    var unitCard = (0, _AssessmentInfo.getUnitInfo)((0, _formUtils.getFromObject)(property, "propertyDetails[0].units", []), property);
    var unitInfoCard = [];
    if (unitCard.length >= 1) {
        var unitItems = [];
        Object.values(unitCard).map(function (unit, index) {
            if (unit.length > 1) {
                var unitItem = { items: unit[0] };
                if ((0, _formUtils.getFromObject)(property, 'propertyDetails[0].propertySubType', '') !== "SHAREDPROPERTY") {
                    unitItem.header = (0, _commons.getLocaleLabels)("PROPERTYTAX_FLOOR_" + Object.keys(unitCard)[index], "PROPERTYTAX_FLOOR_" + Object.keys(unitCard)[index]);
                }
                var subItems = [];
                unit.map(function (subUnit, ind) {
                    if (subUnit.length > 4) {
                        subItems.push.apply(subItems, (0, _toConsumableArray3.default)(subUnit));
                    } else {
                        if (subUnit.length == 3) {
                            subUnit.unshift({ key: ' ', value: (0, _commons.getLocaleLabels)("PT_UNIT_" + ind, "PT_UNIT_" + ind) });
                        } else {
                            for (var i = subUnit.length; i < 4; i++) {
                                subUnit.push({ key: ' ', value: ' ' });
                            }
                        }
                        subItems.push.apply(subItems, (0, _toConsumableArray3.default)(subUnit));
                    }
                });
                unitItem.items = subItems;
                unitItems.push(unitItem);
            } else {
                var _unitItem = { items: unit[0] };
                if ((0, _formUtils.getFromObject)(property, 'propertyDetails[0].propertySubType', '') !== "SHAREDPROPERTY") {
                    _unitItem.header = (0, _commons.getLocaleLabels)("PROPERTYTAX_FLOOR_" + Object.keys(unitCard)[index], "PROPERTYTAX_FLOOR_" + Object.keys(unitCard)[index]);
                }
                unitItems.push(_unitItem);
            }
        });
        unitInfoCard = unitItems;
    }
    property.owners = property.owners.filter(function (owner) {
        return owner.status == "ACTIVE";
    });
    var ownerInfo = (0, _OwnerInfo.getOwnerInfo)(property, generalMDMSDataById);
    var addressCard = (0, _PropertyAddressInfo.getAddressItems)(property);
    var ownerCard = (0, _generatePDF.getMultipleItemCard)(ownerInfo, 'PT_OWNER');
    var assessmentCard = (0, _AssessmentInfo.getAssessmentInfo)((0, _formUtils.getFromObject)(property, 'propertyDetails[0]', {}), generalMDMSDataById, property);
    var documentCard = (0, _generatePDF.getDocumentsCard)(property.documentsUploaded);

    var pdfData = {
        header: "PT_ACKNOWLEDGEMENT", tenantId: property.tenantId,
        applicationNoHeader: 'PT_PROPERRTYID', applicationNoValue: property.propertyId,
        additionalHeader: "PT_APPLICATION_NO", additionalHeaderValue: property.acknowldgementNumber,
        cards: [{ header: "PT_PROPERTY_ADDRESS_SUB_HEADER", items: addressCard }, { header: "PT_ASSESMENT_INFO_SUB_HEADER", items: assessmentCard }, { items: unitInfoCard, type: "multiItem", hide: unitInfoCard.length === 0 }, { header: 'PT_OWNERSHIP_INFO_SUB_HEADER', items: ownerCard, type: ownerInfo.length > 1 ? 'multiItem' : 'singleItem' }, { header: 'PT_COMMON_DOCS', items: documentCard }]
    };
    (0, _generatePDF.generatePDF)(UlbLogoForPdf, pdfData, fileName);
};