"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summaryDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _scrutinySummary = require("./summaryResource/scrutinySummary");

var _applyDocSummary = require("./summaryResource/applyDocSummary");

var _estimateSummary = require("../egov-bpa/summaryResource/estimateSummary");

var summaryDetails = exports.summaryDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Please review your Application and Submit",
    labelKey: "BPA_SUMMARY_HEADER"
  }),
  estimateSummary: _estimateSummary.estimateSummary,
  scrutinySummary: _scrutinySummary.scrutinySummary,
  applyDocSummary: _applyDocSummary.applyDocSummary
});