"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradeReviewDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _reviewOrganization = require("./review-organization");

var _reviewOwner = require("./review-owner");

var _reviewLicense = require("./review-license");

var _reviewLocation = require("./review-location");

var _reviewDocuments = require("./review-documents");

var _declarationDetails = require("./declarationDetails");

var estimate = (0, _utils.getCommonGrayCard)({
  estimateSection: (0, _utils2.getFeesEstimateCard)({
    sourceJsonPath: "LicensesTemp[0].estimateCardData"
  })
});

// const reviewOrganizationDetails = getOrganizationDetails();

var reviewPermanentDetails = (0, _reviewLocation.getPermanentDetails)();
var reviewCommunicationDetails = (0, _reviewLocation.getCommunicactionDetails)();

var reviewOwnerDetails = (0, _reviewOwner.getReviewOwner)();
var reviewLicenseDetails = (0, _reviewLicense.getReviewLicenseDetails)();
var reviewDocumentDetails = (0, _reviewDocuments.getReviewDocuments)();

var tradeReviewDetails = exports.tradeReviewDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Application Summary",
    labelKey: "BPA_SUMMARY_HEADER"
  }),
  estimate: estimate,
  reviewLicenseDetails: reviewLicenseDetails,
  reviewOwnerDetails: reviewOwnerDetails,
  // reviewOrganizationDetails,
  reviewPermanentDetails: reviewPermanentDetails,
  reviewCommunicationDetails: reviewCommunicationDetails,
  reviewDocumentDetails: reviewDocumentDetails,
  declarationSummary: _declarationDetails.declarationSummary
});