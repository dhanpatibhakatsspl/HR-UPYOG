"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _reviewTrade = require("./review-trade");

var _reviewOwner = require("./review-owner");

var _reviewDocuments = require("./review-documents");

var estimate = (0, _utils.getCommonGrayCard)({
  estimateSection: (0, _utils2.getFeesEstimateCard)({
    sourceJsonPath: "LicensesTemp[0].estimateCardData"
  })
});

var reviewConnectionDetails = (0, _reviewTrade.getReviewConnectionDetails)();

var reviewOwnerDetails = (0, _reviewOwner.getReviewOwner)();

var reviewDocumentDetails = (0, _reviewDocuments.getReviewDocuments)();

var connectionDetails = exports.connectionDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Please review your Application and Submit",
    labelKey: "TL_SUMMARY_HEADER"
  }),
  estimate: estimate,
  reviewConnectionDetails: reviewConnectionDetails,
  reviewOwnerDetails: reviewOwnerDetails,
  reviewDocumentDetails: reviewDocumentDetails
});