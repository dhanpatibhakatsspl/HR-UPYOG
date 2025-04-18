"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    return item.accountDescription && item.accountDescription.split("-")[0];
  });
  var headers = ["PT_TAX", "PT_FIRE_CESS", "PT_TIME_REBATE", "PT_TIME_INTEREST", "PT_TIME_REBATE", "PT_UNIT_USAGE_EXEMPTION", "PT_OWNER_EXEMPTION"];
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
      return item.accountDescription && item.accountDescription.split("-")[0] === current;
    });
    taxHeadContent && taxHeadContent[0] && result[1].push({ text: taxHeadContent[0].crAmountToBePaid || "0" });
    return result;
  }, [[], []]);
  taxArray[0].push({ text: "Total" });
  taxArray[1].push({ text: totalAmount });
  return taxArray;
};

// const getBase64FromImageUrl = async (url) => {
//   var img = new Image();
//   var dataURL;
//   img.setAttribute("crossOrigin", "anonymous");

//   img.onload = await function() {
//     var canvas = document.createElement("canvas");
//     canvas.width = this.width;
//     canvas.height = this.height;

//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(this, 0, 0);

//     dataURL = canvas.toDataURL("image/png");

//     dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
//   };

//   return dataURL;
// };
// const url = `https://s3.ap-south-1.amazonaws.com/pb-egov-assets/${property.tenantId}/logo.png`;
var getHeaderDetails = function getHeaderDetails(property, cities) {
  var propertyTenant = cities.filter(function (item) {
    return item.code === property.tenantId;
  });
  return {
    header: propertyTenant[0].name + " MUNICIPAL CORPORATION",
    subheader: "Property Tax Payment Receipt (Citizen Copy)",
    logo: propertyTenant[0].imageId || _pblogo2.default,
    contact: propertyTenant[0].contactNumber,
    website: propertyTenant[0].domainUrl
  };
};

var createReceiptDetails = function createReceiptDetails(property, propertyDetails, receiptDetails, localizationLabels, cities, totalAmountToPay) {
  return {
    ReceiptNo: (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
    header: getHeaderDetails(property, cities),
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
      bankName: "AXIS",
      payMode: "Net Banking",
      pendingAmt: receiptDetails && (totalAmountToPay - (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].amountPaid")).toString(),
      paymentDate: receiptDetails && (0, _commons.getDateFromEpoch)((0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      receiptNo: receiptDetails && (0, _get2.default)(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      transactionNo: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.transactionNumber"),
      transactionDate: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.transactionDate"),
      bankNameBranch: receiptDetails && (0, _get2.default)(receiptDetails, "instrument.bank.id") + ", " + (0, _get2.default)(receiptDetails, "instrument.branchName")
    },
    propertyDetails: [(0, _extends3.default)({}, propertyDetails)],
    address: property.address,
    owners: propertyDetails.owners,
    existingPropertyId: property.oldPropertyId,
    propertyId: property.propertyId
  };
};

exports.default = createReceiptDetails;