"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHeaderDetails = exports.createReceiptDetails = exports.createReceiptUIInfo = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _pblogo = require("egov-ui-kit/assets/images/pblogo.png");

var _pblogo2 = _interopRequireDefault(_pblogo);

var _commons = require("egov-ui-kit/utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTaxInfo = function getTaxInfo(billAccountDetails, totalAmount, localizationLabels) {
  var headersFromAPI = billAccountDetails.map(function (item) {
    return item.taxHeadCode && item.taxHeadCode;
  });
  var headers = ["PT_TAX", "PT_FIRE_CESS", "PT_CANCER_CESS", "PT_TIME_PENALTY", "PT_TIME_REBATE", "PT_TIME_INTEREST", "PT_UNIT_USAGE_EXEMPTION", "PT_OWNER_EXEMPTION", "PT_ADHOC_PENALTY", "PT_ADHOC_REBATE", "PT_ADVANCE_CARRYFORWARD", "PT_DECIMAL_CEILING", "PT_DECIMAL_CEILING_CREDIT", "PT_DECIMAL_CEILING_CREDIT_DEBIT", "PT_DECIMAL_CEILING_DEBIT", "PT_ROUNDOFF"];
  var negativeHeaders = ["PT_ADHOC_REBATE", "PT_ADVANCE_CARRYFORWARD", "PT_DECIMAL_CEILING_CREDIT_DEBIT", "PT_DECIMAL_CEILING_DEBIT", "PT_OWNER_EXEMPTION", "PT_TIME_REBATE", "PT_UNIT_USAGE_EXEMPTION"];
  var transformedHeaders = headers.reduce(function (result, current) {
    if (headersFromAPI.indexOf(current) > -1) {
      result.push(current);
    }
    return result;
  }, []);
  var taxArray = transformedHeaders.reduce(function (result, current) {
    result[0].push({ text: (0, _commons.getTranslatedLabel)(current, localizationLabels) });
    // result[0].push({ text: getTranslatedLabel(current.accountDescription.split("-")[0], localizationLabels) });
    var taxHeadContent = billAccountDetails.filter(function (item) {
      return item.taxHeadCode && item.taxHeadCode === current;
    });
    taxHeadContent && taxHeadContent[0] && result[1].push({
      text: taxHeadContent[0] ? taxHeadContent[0].amount ? taxHeadContent[0].amount : taxHeadContent[0].debitAmount ? "-" + taxHeadContent[0].debitAmount : taxHeadContent[0].crAmountToBePaid ? taxHeadContent[0].crAmountToBePaid : "0" : "NA"
    });
    return result;
  }, [[], []]);
  taxArray[0].push({ text: "Total" });
  taxArray[1].push({ text: totalAmount });
  return taxArray;
};

var getHeaderDetails = function getHeaderDetails() {
  var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var cities = arguments[1];
  var localizationLabels = arguments[2];
  var isAcknowledgement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var propertyTenant = cities.filter(function (item) {
    return item.code === property.tenantId;
  });
  var ulbGrade = (0, _get2.default)(propertyTenant[0], "city.ulbGrade") ? (0, _commons.getUlbGradeLabel)((0, _get2.default)(propertyTenant[0], "city.ulbGrade")) : "MUNICIPAL CORPORATION";
  var cityKey = "TENANT_TENANTS_" + (0, _get2.default)(propertyTenant[0], "code").toUpperCase().replace(/[.]/g, "_");
  var subheader = isAcknowledgement ? "Property Tax Assess Acknowledgement" : "Property Tax Payment Receipt";
  return {
    // header: getReceiptHeaderLabel(name, ulbGrade),
    header: (0, _commons.getTranslatedLabel)(cityKey, localizationLabels).toUpperCase() + " " + (0, _commons.getTranslatedLabel)(ulbGrade, localizationLabels),
    subheader: subheader,
    logo: _pblogo2.default,
    contact: propertyTenant[0].contactNumber,
    website: propertyTenant[0].domainUrl
  };
};

var getReceiptHeaderLabel = function getReceiptHeaderLabel(name, ulbGrade) {
  if (ulbGrade) {
    if (ulbGrade === "NP") {
      return name.toUpperCase() + " NAGAR PANCHAYAT";
    } else if (ulbGrade === "Municipal Corporation") {
      return name.toUpperCase() + " MUNICIPAL CORPORATION";
    } else if (ulbGrade.includes("MC Class")) {
      return name.toUpperCase() + " MUNICIPAL COUNCIL";
    } else {
      return name.toUpperCase() + " MUNICIPAL CORPORATION";
    }
  } else {
    return name.toUpperCase() + " MUNICIPAL CORPORATION";
  }
};

var createReceiptDetails = function createReceiptDetails(property, propertyDetails, receiptDetails, localizationLabels, cities, totalAmountToPay, totalAmountPaid) {
  return {
    ReceiptNo: (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
    header: getHeaderDetails(property, cities, localizationLabels),
    taxNew: receiptDetails && getTaxInfo(receiptDetails.Bill[0].billDetails[0].billAccountDetails, receiptDetails.Bill[0].billDetails[0].totalAmount, localizationLabels),
    tax: {
      AmountPaid: "100",
      fireCess: "10",
      rebate: "10",
      total: "100"
    },
    receipts: {
      AmountPaid: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString(),
      transactionId: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      bankName: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.bank.name", "NA"),
      payMode: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.instrumentType.name", "Net Banking"),
      pendingAmt: receiptDetails && (totalAmountToPay - totalAmountPaid).toString(),
      paymentDate: receiptDetails && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      receiptNo: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      transactionNo: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.transactionNumber"),
      transactionDate: receiptDetails && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, "instrument.transactionDateInput")),
      bankNameBranch: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.bank.name") + ", " + (0, _get2.default)(receiptDetails, "instrument.branchName"),
      G8receiptNo: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].manualReceiptNumber"),
      G8receiptDate: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].manualReceiptDate") && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].manualReceiptDate"))
    },
    propertyDetails: [(0, _extends3.default)({}, propertyDetails)],
    address: property.address,
    owners: propertyDetails.owners,
    existingPropertyId: property.oldPropertyId,
    propertyId: property.propertyId
  };
};

var createReceiptUIInfo = function createReceiptUIInfo(property, receiptDetails, cities, totalAmountToPay, success, totalAmountPaid, latestPropertyDetails) {
  var amountToPay = receiptDetails && (0, _get2.default)(receiptDetails, success ? "Bill[0].billDetails[0].totalAmount" : "billDetails[0].totalAmount").toString();
  var amountDue = receiptDetails && (success ? totalAmountToPay - totalAmountPaid : amountToPay).toString();
  var _property$propertyDet = property.propertyDetails[0],
      ownerDetails = _property$propertyDet.owners,
      institution = _property$propertyDet.institution,
      ownershipCategory = _property$propertyDet.ownershipCategory;
  var financialYear = latestPropertyDetails.financialYear;

  var isInstitution = ownershipCategory === "INSTITUTIONALPRIVATE" || ownershipCategory === "INSTITUTIONALGOVERNMENT";
  var ownerInfo = isInstitution ? [{ key: "PT_INSTITUTION_NAME", value: institution.name }, { key: "PT_AUTHORISED_PERSON_NAME", value: ownerDetails[0].name }] : ownerDetails.map(function (item, index) {
    return {
      //key: `Owner${ownerDetails.length > 1 ? index + 1 : ""} name:`,
      key: "PT_OWNER_NAME_RECEIPT",
      dynamicArray: [ownerDetails.length > 1 ? index + 1 : ""],
      value: item.name
    };
  });
  return {
    propertyInfo: property && [].concat((0, _toConsumableArray3.default)(ownerInfo), [{
      key: "PT_PROPERTY_ADDRESS_EXISTING_PID",
      value: property.oldPropertyId
    }, {
      key: "PT_UNIQUE_ID",
      value: property.propertyId
    }, {
      key: "PT_PROPERTY_ADDRESS_SUB_HEADER",
      value: (0, _commons.getCommaSeperatedAddress)(property.address, cities)
    }]),
    receiptInfo: [{
      key: "PT_ASSESSMENT_NUMBER_RECEIPT",
      value: receiptDetails && (0, _get2.default)(receiptDetails, success ? "Bill[0].billDetails[0].consumerCode" : "billDetails[0].consumerCode").split(":")[1]
    }, {
      key: "PT_RECEIPT_NUMBER",
      value: receiptDetails && (0, _get2.default)(receiptDetails, success ? "Bill[0].billDetails[0].receiptNumber" : "billDetails[0].receiptNumber")
    }, {
      key: "PT_PAYMENT_TERM",
      value: financialYear
    }, {
      key: "PT_DATE_RECEIPT_LABEL",
      value: receiptDetails && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, success ? "Bill[0].billDetails[0].receiptDate" : "billDetails[0].billDate"))
    }, {
      key: "PT_PAYABLE_AMOUNT",
      value: receiptDetails && (0, _get2.default)(receiptDetails, success ? "Bill[0].billDetails[0].totalAmount" : "billDetails[0].totalAmount").toString()
    }, {
      key: "PT_AMOUNT_PAID_LABEL",
      value: receiptDetails && success ? (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString() : "0"
    }, {
      key: "PT_AMOUNT_DUE",
      value: amountDue
    }]
  };
};

exports.createReceiptUIInfo = createReceiptUIInfo;
exports.createReceiptDetails = createReceiptDetails;
exports.getHeaderDetails = getHeaderDetails;