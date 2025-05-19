"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPTApplicationTypes = exports.getFromObject = exports.getFormattedEstimate = exports.getCommonTenant = exports.getPropertyInfoScreenUrl = exports.getPurpose = exports.propertySubmitAction = exports.routeToCommonPay = exports.formWizardConstants = exports.PROPERTY_FORM_PURPOSE = exports.getPropertyLink = exports.convertToOldPTObject = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _formWizardConstants;

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _api = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _formActionUtils = require("./formActionUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractFromString = function extractFromString(str, index) {
  if (!str) {
    return "";
  }
  var arrayOfValues = str.split(".");
  if (arrayOfValues && arrayOfValues.length == 0) {
    return arrayOfValues[0];
  }
  if (index > arrayOfValues.length) {
    return null;
  }
  if (index <= arrayOfValues.length) {
    return arrayOfValues[index];
  }
  return null;
};

var getUsageCategory = function getUsageCategory(usageCategory) {
  var categoryArray = usageCategory.split(".");
  var tempObj = {};
  tempObj["usageCategoryMajor"] = categoryArray && categoryArray.length > 0 && categoryArray[0];
  tempObj["usageCategoryMinor"] = categoryArray && categoryArray.length > 1 && categoryArray[1];
  tempObj["usageCategorySubMinor"] = categoryArray && categoryArray.length > 2 && categoryArray[2];
  tempObj["usageCategoryDetail"] = categoryArray && categoryArray.length > 3 && categoryArray[3];
  return tempObj;
};

var convertToOldPTObject = exports.convertToOldPTObject = function convertToOldPTObject(newObject) {
  var Properties = [{
    propertyId: "",
    tenantId: "",
    acknowldgementNumber: "",
    oldPropertyId: null,
    status: "",
    address: {},
    auditDetails: {},
    creationReason: null,
    occupancyDate: 0,
    propertyDetails: [{
      institution: null,
      tenantId: "",
      citizenInfo: {},
      source: null,
      status: "",
      usage: null,
      noOfFloors: 0,
      landArea: 0,
      buildUpArea: null,
      units: null,
      documents: null,
      additionalDetails: {
        inflammable: false,
        heightAbove36Feet: false
      },
      financialYear: "",
      propertyType: "",
      propertySubType: null,
      assessmentNumber: "",
      assessmentDate: 0,
      usageCategoryMajor: "",
      usageCategoryMinor: "",
      ownershipCategory: "",
      subOwnershipCategory: "",
      adhocExemption: null,
      adhocPenalty: null,
      adhocExemptionReason: null,
      adhocPenaltyReason: null,
      owners: [{
        persisterRefId: null,
        id: null,
        uuid: "",
        userName: "",
        password: null,
        salutation: null,
        name: "",
        gender: "",
        mobileNumber: "",
        emailId: null,
        altContactNumber: null,
        pan: null,
        aadhaarNumber: null,
        permanentAddress: null,
        permanentCity: null,
        permanentPinCode: null,
        correspondenceCity: null,
        correspondencePinCode: null,
        correspondenceAddress: null,
        active: true,
        dob: null,
        pwdExpiryDate: 0,
        locale: null,
        type: "",
        signature: null,
        accountLocked: false,
        roles: [],
        fatherOrHusbandName: "",
        bloodGroup: null,
        identificationMark: null,
        photo: null,
        createdBy: "",
        createdDate: 0,
        lastModifiedBy: "",
        lastModifiedDate: 0,
        otpReference: null,
        tenantId: "",
        isPrimaryOwner: null,
        ownerShipPercentage: null,
        ownerType: "",
        institutionId: null,
        documents: [],
        relationship: "",
        additionalDetails: null
      }],
      auditDetails: {},
      calculation: null,
      channel: null
    }],
    additionalDetails: null
  }];
  var newProperty = newObject.Properties[0];
  var property = {};
  var propertyDetails = {};
  property.propertyId = newProperty.propertyId;
  property.tenantId = newProperty.tenantId;
  property.acknowldgementNumber = newProperty.acknowldgementNumber;
  property.oldPropertyId = newProperty.oldPropertyId;
  property.status = newProperty.status;
  property.address = newProperty.address;
  property.auditDetails = newProperty.auditDetails;
  property.creationReason = newProperty.creationReason;
  property.occupancyDate = newProperty.units && newProperty.units.length && newProperty.units[0].occupancyDate;
  property.additionalDetails = newProperty.additionalDetails;
  propertyDetails.institution = newProperty.institution;
  propertyDetails.tenantId = newProperty.tenantId;
  propertyDetails.citizenInfo = newProperty.owners[0];
  propertyDetails.source = newProperty.source;
  propertyDetails.status = newProperty.status;
  propertyDetails.usage = null;
  propertyDetails.noOfFloors = newProperty.noOfFloors;
  propertyDetails.landArea = newProperty.landArea;
  propertyDetails.buildUpArea = newProperty.superBuiltUpArea;
  propertyDetails.units = newProperty.units && newProperty.units.map(function (unit) {
    unit.floorNo = unit.floorNo || unit.floorNo === 0 ? unit.floorNo.toString() : unit.floorNo;
    return (0, _extends3.default)({}, unit, getUsageCategory(unit.usageCategory));
  });
  propertyDetails.units = propertyDetails.units && Array.isArray(propertyDetails.units) && propertyDetails.units.filter(function (unit) {
    return unit.active;
  });
  propertyDetails.documents = newProperty.documents;
  propertyDetails.additionalDetails = newProperty.additionalDetails;
  propertyDetails.financialYear = null;
  propertyDetails.propertyType = extractFromString(newProperty.propertyType, 0);
  propertyDetails.propertySubType = extractFromString(newProperty.propertyType, 1);
  propertyDetails.assessmentNumber = 0;
  propertyDetails.assessmentDate = null;
  propertyDetails.usageCategoryMajor = extractFromString(newProperty.usageCategory, 0);
  propertyDetails.usageCategoryMinor = extractFromString(newProperty.usageCategory, 1);
  propertyDetails.ownershipCategory = extractFromString(newProperty.ownershipCategory, 0);
  propertyDetails.subOwnershipCategory = extractFromString(newProperty.ownershipCategory, 1);
  propertyDetails.adhocExemption = null;
  propertyDetails.adhocPenalty = null;
  propertyDetails.adhocExemptionReason = null;
  propertyDetails.adhocPenaltyReason = null;
  propertyDetails.owners = newProperty.owners;
  propertyDetails.owners = propertyDetails.owners.filter(function (owner) {
    return owner.status == 'ACTIVE';
  });
  propertyDetails.owners = propertyDetails.owners && Array.isArray(propertyDetails.owners) && propertyDetails.owners.sort(function (owner1, owner2) {
    return owner1.name.localeCompare(owner2.name);
  });
  propertyDetails.auditDetails = newProperty.auditDetails;
  propertyDetails.calculation = null;
  propertyDetails.channel = newProperty.channel;
  var floorArray = {};
  propertyDetails.units = propertyDetails.units && propertyDetails.units.map(function (unit) {
    floorArray[unit.floorNo] = unit.floorNo;
    // unit.usageCategory;
    // propertyDetails.propertyType = extractFromString(newProperty.propertyType, 0);
    // propertyDetails.propertySubType = extractFromString(newProperty.propertyType, 1);
    // unit.usageCategoryMajor = extractFromString(unit.usageCategory, 0)
    // unit.usageCategoryMinor = extractFromString(unit.usageCategory, 1)
    // unit.usageCategorySubMinor = extractFromString(unit.usageCategory, 2)
    // unit.usageCategoryDetail = extractFromString(unit.usageCategory, 3)
    // unit.constructionDetail = {
    //   builtUpArea: unit.unitArea,
    // };
    unit.unitArea = unit.constructionDetail.builtUpArea;
    return (0, _extends3.default)({}, unit);
  });
  (0, _localStorageUtils.localStorageSet)("previousFloorNo", newProperty.noOfFloors);
  property["propertyDetails"] = [propertyDetails];
  if (newProperty.propertyType.includes("SHAREDPROPERTY")) {
    newProperty.noOfFloors = Object.keys(floorArray).length;
    newProperty.landArea = newProperty.superBuiltUpArea;
  }

  Properties[0] = (0, _extends3.default)({}, newProperty, property);
  return Properties;
};

var getPropertyLink = exports.getPropertyLink = function getPropertyLink(propertyId, tenantId, purpose, financialYear, assessmentNumber, isCompletePayment) {
  if (financialYear == -1) {
    return "/property-tax/assessment-form?assessmentId=" + assessmentNumber + "&purpose=" + purpose + "&propertyId=" + propertyId + "&tenantId=" + tenantId;
  }
  if (isCompletePayment) {
    return "/property-tax/assessment-form?FY=" + financialYear + "&assessmentId=" + assessmentNumber + "&purpose=" + purpose + "&propertyId=" + propertyId + "&tenantId=" + tenantId + "&isCompletePayment=true";
  }
  return "/property-tax/assessment-form?FY=" + financialYear + "&assessmentId=" + assessmentNumber + "&purpose=" + purpose + "&propertyId=" + propertyId + "&tenantId=" + tenantId;
};

var PROPERTY_FORM_PURPOSE = exports.PROPERTY_FORM_PURPOSE = {
  REASSESS: 'reassess',
  ASSESS: 'assess',
  CREATE: 'create',
  UPDATE: 'update',
  SENDFOREDIT: 'sendforedit',
  DEFAULT: 'create'
};

var formWizardConstants = exports.formWizardConstants = (_formWizardConstants = {}, (0, _defineProperty3.default)(_formWizardConstants, PROPERTY_FORM_PURPOSE.ASSESS, {
  header: 'PT_ASSESS_PROPERTY',
  parentButton: 'PT_ASSESS',
  isSubHeader: true,
  isFinancialYear: true,
  buttonLabel: 'PT_ASSESS_PROPERTY_BUTTON',
  isEditButton: false,
  canEditOwner: false,
  isEstimateDetails: true
}), (0, _defineProperty3.default)(_formWizardConstants, PROPERTY_FORM_PURPOSE.REASSESS, {
  header: 'PT_REASSESS_PROPERTY',
  parentButton: 'PT_REASSESS',
  isSubHeader: true,
  isFinancialYear: true,
  buttonLabel: 'PT_REASSESS_PROPERTY_BUTTON',
  isEditButton: false,
  canEditOwner: false,
  isEstimateDetails: true
}), (0, _defineProperty3.default)(_formWizardConstants, PROPERTY_FORM_PURPOSE.UPDATE, {
  header: 'PT_UPDATE_PROPERTY',
  parentButton: 'PT_UPDATE',
  isSubHeader: true,
  isFinancialYear: false,
  buttonLabel: 'PT_UPDATE_PROPERTY_BUTTON',
  isEditButton: true,
  canEditOwner: false,
  isEstimateDetails: false
}), (0, _defineProperty3.default)(_formWizardConstants, PROPERTY_FORM_PURPOSE.SENDFOREDIT, {
  header: 'PT_CREATE_PROPERTY',
  parentButton: 'PT_UPDATE',
  isSubHeader: false,
  isFinancialYear: false,
  buttonLabel: 'PT_UPDATE_PROPERTY_BUTTON',
  isEditButton: true,
  canEditOwner: true,
  isEstimateDetails: false
}), (0, _defineProperty3.default)(_formWizardConstants, PROPERTY_FORM_PURPOSE.CREATE, {
  header: 'PT_CREATE_PROPERTY',
  parentButton: 'PT_CREATE',
  isSubHeader: false,
  isFinancialYear: false,
  buttonLabel: 'PT_CREATE_PROPERTY_BUTTON',
  isEditButton: true,
  canEditOwner: true,
  isEstimateDetails: false
}), _formWizardConstants);

var routeToCommonPay = exports.routeToCommonPay = function routeToCommonPay(propertyId, tenantId) {
  var businessService = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'PT';

  var routeLink = "/egov-common/pay?consumerCode=" + propertyId + "&tenantId=" + tenantId + "&businessService=" + businessService;
  (0, _formActionUtils.routeTo)(routeLink);
};

var propertySubmitAction = exports.propertySubmitAction = function propertySubmitAction(Properties, action, props, isModify, preparedFinalObject) {
  var purpose = getPurpose();
  switch (purpose) {
    case PROPERTY_FORM_PURPOSE.REASSESS:
      (0, _formActionUtils.assessProperty)("_update", props);
      break;
    case PROPERTY_FORM_PURPOSE.ASSESS:
      (0, _formActionUtils.assessProperty)("_create", props);
      break;
    case PROPERTY_FORM_PURPOSE.UPDATE:
      (0, _formActionUtils.createProperty)(Properties, '_update', props, isModify, preparedFinalObject);
      break;
    case PROPERTY_FORM_PURPOSE.CREATE:
      (0, _formActionUtils.createProperty)(Properties, '_create', props, isModify, preparedFinalObject);
      break;
    case PROPERTY_FORM_PURPOSE.SENDFOREDIT:
      (0, _formActionUtils.createProperty)(Properties, '_create', props);
      break;
    default:
      (0, _formActionUtils.createProperty)(Properties, '_create', props);
  }
};

var getPurpose = exports.getPurpose = function getPurpose() {
  var purpose = (0, _commons.getQueryArg)(window.location.href, "purpose") || PROPERTY_FORM_PURPOSE.DEFAULT;
  return purpose;
};

var getPropertyInfoScreenUrl = exports.getPropertyInfoScreenUrl = function getPropertyInfoScreenUrl(propertyId, tenantId) {
  var url = process.env.REACT_APP_NAME === "Citizen" ? "/property-tax/my-properties/property/" + propertyId + "/" + tenantId : "/property-tax/property/" + propertyId + "/" + tenantId;
  return url;
};

var getCommonTenant = exports.getCommonTenant = function getCommonTenant() {
  return _common2.default.tenantId;
};

/* Get Estimate with rebate and penalty */
var getFormattedEstimate = exports.getFormattedEstimate = function getFormattedEstimate() {
  var estimateResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
  var adhocPenaltyAmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var adhocExemptionAmt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var _estimateResponse$ = estimateResponse[0],
      taxHeadEstimates = _estimateResponse$.taxHeadEstimates,
      totalAmount = _estimateResponse$.totalAmount,
      initialAmount = _estimateResponse$.initialAmount,
      _estimateResponse$$is = _estimateResponse$.isAdhocAvailable,
      isAdhocAvailable = _estimateResponse$$is === undefined ? false : _estimateResponse$$is;

  totalAmount = initialAmount + adhocPenaltyAmt - adhocExemptionAmt;

  estimateResponse[0].totalAmount = totalAmount.toFixed(2);
  if (adhocPenaltyAmt > 0 || adhocExemptionAmt > 0) {
    if (!isAdhocAvailable) {
      taxHeadEstimates.splice(3, 0, {
        category: "TAX",
        estimateAmount: adhocExemptionAmt && adhocExemptionAmt > 0 ? "-" + adhocExemptionAmt.toFixed(2) : '0',
        taxHeadCode: "PT_ADHOC_REBATE"
      });
      taxHeadEstimates.splice(5, 0, {
        category: "TAX",
        estimateAmount: adhocPenaltyAmt.toFixed(2),
        taxHeadCode: "PT_ADHOC_PENALTY"
      });
      estimateResponse[0].isAdhocAvailable = true;
    } else {
      taxHeadEstimates.map(function (taxHead) {
        if (taxHead.taxHeadCode == "PT_ADHOC_REBATE") {
          taxHead.estimateAmount = adhocExemptionAmt && adhocExemptionAmt > 0 ? "-" + adhocExemptionAmt.toFixed(2) : '0';
        }
        if (taxHead.taxHeadCode == "PT_ADHOC_PENALTY") {
          taxHead.estimateAmount = adhocPenaltyAmt.toFixed(2);
        }
      });
    }
  }
  /* sort the tax heads based on amount */
  estimateResponse[0].taxHeadEstimates = taxHeadEstimates.sort(function (x, y) {
    return Number(y.estimateAmount) - Number(x.estimateAmount);
  });
  var clonnedEstimate = (0, _cloneDeep2.default)(estimateResponse[0]);
  return [(0, _extends3.default)({}, clonnedEstimate)];
};

var getFromObject = exports.getFromObject = function getFromObject(object, path, defaultValue) {
  var result = object == null ? null : (0, _get2.default)(object, path, defaultValue);
  return result === null ? defaultValue : result;
};

var getPTApplicationTypes = exports.getPTApplicationTypes = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(prepareFinalObject) {
    var requestBody, payload, ptApplication, ptWorkflow;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            requestBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{
                    name: "PTApplication"
                  }]
                }]
              }
            };
            _context.next = 4;
            return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

          case 4:
            payload = _context.sent;
            ptApplication = (0, _get2.default)(payload, 'MdmsRes.PropertyTax.PTApplication', [{
              "creationReason": "MUTATION",
              "businessService": "PT.MUTATION",
              "action": "OPEN",
              "editAction": "REOPEN"
            }, {
              "creationReason": "CREATE",
              "businessService": "PT.CREATE",
              "action": "OPEN",
              "editAction": "REOPEN"
            }, {
              "creationReason": "UPDATE",
              "businessService": "PT.UPDATE",
              "action": "OPEN",
              "editAction": "REOPEN"
            }, {
              "creationReason": "LEGACY_ENTRY",
              "businessService": "PT.LEGACY",
              "action": "OPEN",
              "editAction": "REOPEN"
            }]);
            ptWorkflow = {};


            ptApplication.map(function (application) {
              ptWorkflow[application.creationReason] = application;
            });
            prepareFinalObject("ptApplication", ptWorkflow);
            return _context.abrupt("return", payload);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);

            console.error(JSON.stringify(_context.t0));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function getPTApplicationTypes(_x5) {
    return _ref.apply(this, arguments);
  };
}();